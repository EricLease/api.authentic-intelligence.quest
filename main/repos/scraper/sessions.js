import debug from "debug";
import { query } from "../../db/scraper/datasource.js";
import asCommaSeparatedList from "../../utils/as-comma-separated-list.js";
import asQueryParamSubstitutionList from "../as-query-param-substitution-list.js";

const sessionsDebug = debug(
  "api.authentic-intelligence.quest:server:repos:scraper:sessions"
);

const tableName = '"sessions"';

const createSession = async (description) => {
  const inFields = asCommaSeparatedList(["description"]);
  const outFields = asCommaSeparatedList(["id"]);

  const qRes = await query(
    `
    INSERT INTO ${tableName} (${inFields}) 
    VALUES ($1)
    RETURNING ${outFields};`,
    [description ?? ""]
  );

  sessionsDebug(`createSession result: ${JSON.stringify(qRes)}`);

  return qRes?.results?.length === 1 ? qRes.results[0].id : null;
};

const readSession = async (sessionId) => {
  if (!(+sessionId > 0)) {
    throw new Error(`readSession: Invalid sessionId (${sessionId})`);
  }

  const outFields = asCommaSeparatedList(["id", "description", "dateCreated"]);
  const params = [sessionId];

  const qRes = await query(
    `SELECT ${outFields}
    FROM ${tableName}
    WHERE id=${asQueryParamSubstitutionList(params)};`,
    params
  );

  if (qRes?.results?.length === 1) {
    return qRes.results[0];
  }

  sessionsDebug(`DB Error: ${qRes?.error}`);

  return null;
};

export { createSession, readSession };
