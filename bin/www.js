#!/usr/bin/env node

import { createServer } from "http";
import moduleDebug from "../main/utils/module-debug.js";
import { app, port } from "../main/app.js";

const serverDebug = moduleDebug(["server"]);

const server = createServer(app);

server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `pipe ${port}` : `port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

  serverDebug("Listening on " + bind);
}
