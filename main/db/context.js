import debug from "debug";
import { Pool } from "pg";
import {
  DB_BASE_CONFIG,
  DB_ENABLED,
  DB_NAME_BLOG,
  DB_NAME_SCRAPER,
} from "../utils/config.js";

const contextDebug = debug(
  "api.authentic-intelligence.quest:server:db:context"
);

const Databases = Object.freeze({
  Blog: generateContext(DB_NAME_BLOG),
  Scraper: generateContext(DB_NAME_SCRAPER),
});

const query = async (cmd, params, context, callerDebug) => {
  const dbg = resolveDebug(callerDebug);

  dbg(`Executing query on ${context?.database}`);

  if (context.pool) {
    return new Promise((resolve, reject) => {
      context.pool?.query(cmd, params, (qErr, qRes) => {
        if (qErr) {
          reject(handleError(cmd, params, qErr, dbg));
        } else {
          resolve(handleSuccess(cmd, params, qRes, dbg));
        }
      });
    });
  }

  const dbgMsg = `Undefined pool detected for ${context?.database}.  Check that the context is enabled (context.js).`;

  dbg(dbgMsg);

  return new Promise((_, reject) => reject(dbgMsg));
};

function generateContext(database) {
  const context = {
    database: database,
  };

  if (!DB_ENABLED[database]) {
    return { ...context, pool: undefined };
  }

  const pool = new Pool({ ...DB_BASE_CONFIG, database: database });

  pool.on("connect", async (client) => {
    // All datetimestamps passed in or retrieved should be handled as UTC
    // Convert to local time at app layer for display purposes only.
    await client.query("SET DATESTYLE = iso, mdy");
  });

  pool.on("error", async (err, client) => {
    contextDebug(JSON.stringify(err));

    // Ensure the client is disconnected
    try {
      await client.end();
    } catch (ex) {
      contextDebug(`Failed to end connection: ${JSON.stringify(ex)}`);
    }

    // Ensure the client is destroyed, freeing up the slot in the pool
    try {
      client.release(true);
    } catch (ex) {
      contextDebug(`Failed to release connection: ${JSON.stringify(ex)}`);
    }
  });

  return { ...context, pool: pool };
}

function displayParamValues(params) {
  return `params: [${params?.join(", ")}\n\t]`;
}

function displayCommand(cmd, params) {
  return `\n\tcmd: ${cmd}\n\t${displayParamValues(params)}\n\t`;
}

function resolveDebug(callerDebug) {
  return callerDebug ?? contextDebug;
}

function handleError(cmd, params, qErr, callerDebug) {
  resolveDebug(callerDebug)(
    `*** Query error ***${displayCommand(cmd, params)}error: ${JSON.stringify(qErr)}`
  );
  return { error: qErr };
}

function handleSuccess(cmd, params, qRes, callerDebug) {
  resolveDebug(callerDebug)(
    `Query success${displayCommand(cmd, params)}rows: ${qRes.rows.map((r) => JSON.stringify(r)).join("\n\t")}`
  );
  return { results: qRes.rows };
}

export { Databases, query };
