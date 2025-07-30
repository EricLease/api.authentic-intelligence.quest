import debug from "debug";
import httpStatusCodes from "../utils/http-status-codes.js";

const _debug = debug("api.authentic-intelligence.quest:server:repos:utils");

export default (qRes, httpRes, callerDebug) => {
  if (qRes?.results) {
    httpRes.json(qRes);
    return;
  }

  (callerDebug ?? _debug)(`DB Error: ${qRes?.error}`);

  httpRes.status(httpStatusCodes.InternalServerError);
  httpRes.send("Something went wrong.");
};
