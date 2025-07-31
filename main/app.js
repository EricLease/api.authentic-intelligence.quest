import { join, dirname } from "path";
import { fileURLToPath } from "url";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import normalizedPort from "./utils/normalized-port.js";
import corsInit from "./utils/cors-init.js";
import indexRouter from "./routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = normalizedPort();
const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(corsInit);
app.use(express.static(join(__dirname, "public")));
app.use("/", indexRouter);
app.set("port", port);

export { app, port };
