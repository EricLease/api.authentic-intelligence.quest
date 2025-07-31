import moduleDebug from "../../utils/module-debug.js";
import { query } from "../../db/scraper/datasource.js";
import asCommaSeparatedList from "../../utils/as-comma-delimitted-string.js";
import asQueryParamSubstitutionList from "../utils/as-query-param-substitution-list.js";
import processQueryResult from "../utils/process-query-result.js";

const pagesDebug = moduleDebug(["server", "repos", "scraper", "pages"]);

const tableName = "pages";

const createPage = async (sessionId, html, status, metadata, headers) => {
  const inFields = [
    "session_id",
    '"url"',
    "raw_html",
    "status_code",
    "metadata",
    "headers",
  ];
  const outFields = asCommaSeparatedList(["id"]);

  const qRes = await query(
    `INSERT INTO ${tableName} (${asCommaSeparatedList(inFields)})
     VALUES (${asQueryParamSubstitutionList(inFields)})
     RETURNING ${outFields};`,
    [sessionId, metadata.url, html, status, metadata, headers]
  );

  return qRes;
};

const readPages = async (httpRes) => {
  const outFields = asCommaSeparatedList([
    "id",
    "url",
    "status_code",
    "session_id",
    "date_created",
  ]);
  const orderByFields = asCommaSeparatedList(["date_created"]);

  const qRes = await query(
    `SELECT ${outFields} 
    FROM ${tableName} 
    ORDER BY ${orderByFields} DESC;`
  );

  processQueryResult(qRes, httpRes, pagesDebug);
};

const readPage = async (httpReq, httpRes) => {
  const pageId = httpReq?.query?.page_id;

  if (!pageId) {
    throw new Error("readPage: Invalid httpReq.query.page_id");
  }

  const outFields = asCommaSeparatedList([
    "id",
    "url",
    "raw_html",
    "metadata",
    "headers",
    "status_code",
    "session_id",
    "date_created",
  ]);
  const params = [pageId];

  const qRes = await query(
    `SELECT ${outFields}
    FROM ${tableName} 
    WHERE id=${asQueryParamSubstitutionList(params)};`,
    params
  );

  processQueryResult(qRes, httpRes, pagesDebug);
};

export { createPage, readPages, readPage };
