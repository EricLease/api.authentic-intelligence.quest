const _debug = require("debug")(
  "api.authentic-intelligence.quest:server:repos:utils"
);

const asSelectList = (fields) => fields.join(", ");

const processQueryResult = (qRes, httpRes, debug) => {
  if (qRes?.results) {
    httpRes.json(qRes);
    return;
  }

  const dbgMsg = `DB Error: ${qRes?.error}`;

  if (debug) {
    debug(dbgMsg);
  } else {
    _debug(dbgMsg);
  }

  httpRes.status(500);
};

module.exports = { asSelectList, processQueryResult };
