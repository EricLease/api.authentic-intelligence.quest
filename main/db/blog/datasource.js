import moduleDebug from "../../utils/module-debug.js";
import { Databases, query } from "../context.js";

const blogDebug = moduleDebug(["server", "db", "blog"]);

async function blogQuery(cmd, params) {
  return await query(cmd, params, Databases.Blog, blogDebug);
}

export { blogQuery as query };
