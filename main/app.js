var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var corsInit = require("./cors-init");
var indexRouter = require("./routes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(corsInit);
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

module.exports = app;
