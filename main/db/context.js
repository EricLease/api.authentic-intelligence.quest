const _debug = require("debug")(
  "api.authentic-intelligence.quest:server:db:context"
);
const { Pool } = require("pg");

// !!! Remember to set up the corresponding environment variables in prod: !!!
const basePoolConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: +process.env.PGPORT,
};
_debug(
  `process.env.PGDATABASE_BLOG_ENABLED = ${!!process.env.PGDATABASE_BLOG_ENABLED}`
);
_debug(
  `process.env.PGDATABASE_SCRAPER_ENABLED = ${!!process.env.PGDATABASE_SCRAPER_ENABLED}`
);
// Use contextEnabled to quickly turn DB access on/off:
const contextEnabled = {
  [process.env.PGDATABASE_BLOG]: !!process.env.PGDATABASE_BLOG_ENABLED,
  [process.env.PGDATABASE_SCRAPER]: !!process.env.PGDATABASE_SCRAPER_ENABLED,
};

const Databases = Object.freeze({
  Blog: generateContext(process.env.PGDATABASE_BLOG),
  Scraper: generateContext(process.env.PGDATABASE_SCRAPER),
});

const query = async (cmd, params, context, debug) => {
  (debug ?? _debug)(`Executing query on ${context?.database}`);

  if (context.pool) {
    return new Promise((resolve, reject) => {
      context.pool?.query(cmd, params, (qErr, qRes) => {
        if (qErr) {
          reject(handleError(cmd, params, qErr, debug));
        } else {
          resolve(handleSuccess(cmd, params, qRes, debug));
        }
      });
    });
  }

  const dbgMsg = `Undefined pool detected for ${context?.database}.  Check that the context is enabled (context.js).`;

  (debug ?? _debug)(dbgMsg);

  return new Promise((_, reject) => reject(dbgMsg));
};

function generateContext(database) {
  const context = {
    database: database,
  };

  if (!contextEnabled[database]) {
    return { ...context, pool: undefined };
  }

  const pool = new Pool({ ...basePoolConfig, database: database });

  pool.on("connect", async (client) => {
    // All datetimestamps passed in or retrieved should be handled as UTC
    // Convert to local time at app layer for display purposes only.
    await client.query("SET DATESTYLE = iso, mdy");
  });

  pool.on("error", async (err, client) => {
    _debug(JSON.stringify(err));

    // Ensure the client is disconnected
    try {
      await client.end();
    } catch (ex) {
      _debug(`Failed to end connection: ${JSON.stringify(ex)}`);
    }

    // Ensure the client is destroyed, freeing up the slot in the pool
    try {
      client.release(true);
    } catch (ex) {
      _debug(`Failed to release connection: ${JSON.stringify(ex)}`);
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

function handleError(cmd, params, qErr, debug) {
  (debug ?? _debug)(
    `*** Query error ***${displayCommand(cmd, params)}error: ${JSON.stringify(qErr)}`
  );
  return { error: qErr };
}

function handleSuccess(cmd, params, qRes, debug) {
  (debug ?? _debug)(
    `Query success${displayCommand(cmd, params)}rows: ${qRes.rows.map((r) => JSON.stringify(r)).join("\n\t")}`
  );
  return { results: qRes.rows };
}

module.exports = {
  Databases,
  query,
};
