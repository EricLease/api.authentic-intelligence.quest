const debug = require("debug")(
  "api.authentic-intelligence.quest:server:db:blog:datasource"
);
const { Databases, query } = require("../context");

debug(`Using database: ${JSON.stringify(Databases.Blog)}`);

module.exports = {
  query: async (cmd, params) => await query(cmd, params, Databases.Blog, debug),
};
