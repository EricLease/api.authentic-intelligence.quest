var express = require("express");
var router = express.Router();

router.get("/api/hello", (_, res) => {
  res.json("well hello there");
});

module.exports = router;
