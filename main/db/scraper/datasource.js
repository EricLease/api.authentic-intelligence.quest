import debug from "debug";
import { Databases, query } from "../context.js";

const scraperDebug = debug(
  "api.authentic-intelligence.quest:server:db:scraper"
);

async function scraperQuery(cmd, params) {
  return await query(cmd, params, Databases.Scraper, scraperDebug);
}

export { scraperQuery as query };
