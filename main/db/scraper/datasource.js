import moduleDebug from "../../utils/module-debug.js";
import { Databases, query } from "../context.js";

const scraperDebug = moduleDebug(["server", "db", "scraper"]);

async function scraperQuery(cmd, params) {
  return await query(cmd, params, Databases.Scraper, scraperDebug);
}

export { scraperQuery as query };
