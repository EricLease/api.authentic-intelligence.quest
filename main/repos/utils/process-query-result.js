import moduleDebug from "../../utils/module-debug.js";
import httpStatusCodes from "../../utils/http-status-codes.js";

const processQueryResultDebug = moduleDebug([
  "server",
  "repos",
  "utils",
  "process-query-result",
]);

export default (qRes, httpRes, callerDebug) => {
  if (qRes?.results) {
    httpRes.json(qRes);
    return;
  }

  (callerDebug ?? processQueryResultDebug)(`DB Error: ${qRes?.error}`);

  httpRes.status(httpStatusCodes.InternalServerError);
  httpRes.send("Something went wrong.");
};
