const debug = require("debug")(
  "api.authentic-intelligence.quest:server:repos:scraper:pages"
);
const dbScraper = require("../../db/scraper/datasource");
const { asSelectList, processQueryResult } = require("../utils");

const getPages = async (httpRes) => {
  const qRes = await dbScraper.query(
    `SELECT ${asSelectList([
      "id",
      "url",
      "status_code",
      "session_id",
      "date_created",
    ])} 
    FROM pages 
    ORDER BY date_created DESC;`
  );

  processQueryResult(qRes, httpRes, debug);
};

const getPage = async (httpReq, httpRes) => {
  const pageId = httpReq?.query?.page_id;

  if (!pageId) {
    throw new Error("getPage: Invalid httpReq.query.page_id");
  }

  const qRes = await dbScraper.query(
    `SELECT ${asSelectList([
      "id",
      "url",
      "raw_html",
      "metadata",
      "headers",
      "status_code",
      "session_id",
      "date_created",
    ])}
    FROM pages 
    WHERE id=$1;`,
    [pageId]
  );

  processQueryResult(qRes, httpRes, debug);
};

module.exports = {
  getPages,
  getPage,
};
