import debug from "debug";
import { Databases, query } from "../context.js";

const blogDebug = debug("api.authentic-intelligence.quest:server:db:blog");

async function blogQuery(cmd, params) {
  return await query(cmd, params, Databases.Blog, blogDebug);
}

export { blogQuery as query };
