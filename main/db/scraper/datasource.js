const debug = require("debug")(
  "api.authentic-intelligence.quest:server:db:scraper:datasource"
);
const { Databases, query } = require("../context");

debug(`Using database: ${JSON.stringify(Databases.Scraper)}`);

module.exports = {
  query: async (cmd, params) =>
    await query(cmd, params, Databases.Scraper, debug),
};
