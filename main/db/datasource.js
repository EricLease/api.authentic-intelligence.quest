const debug = require("debug")(
  "api.authentic-intelligence.quest:server:datasource"
);
const { Pool } = require("pg");

// !!! Remember to set up the corresponding environment variables in prod: !!!
const poolConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: +process.env.PGPORT,
};
const pool = new Pool(poolConfig);

const query = async (cmd, params) => {
  debug(`Executing query on pool: \n${JSON.stringify(poolConfig)}`);

  return new Promise(function (resolve, reject) {
    pool.query(cmd, params, (qErr, qRes) => {
      if (qErr) {
        reject(handleError(cmd, params, qErr));
      } else {
        resolve(handleSuccess(cmd, params, qRes));
      }
    });
  });
};

function displayParamValues(params) {
  return `params: [${params?.join(", ")}\n\t]`;
}

function displayCommand(cmd, params) {
  return `\n\tcmd: ${cmd}\n\t${displayParamValues(params)}\n\t`;
}

function handleError(cmd, params, qErr) {
  debug(`*** Query error ***${displayCommand(cmd, params)}error: ${qErr}`);
  return { error: qErr };
}

function handleSuccess(cmd, params, qRes) {
  debug(
    `Query success${displayCommand(cmd, params)}rows: ${qRes.rows.map((r) => JSON.stringify(r)).join("\n\t")}`
  );
  return { results: qRes.rows };
}

module.exports = { pool, query };
