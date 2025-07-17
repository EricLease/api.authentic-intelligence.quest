var express = require("express");

var router = express.Router();

router.get("/api/hello", async (_, res) => {
  await sleep(1000);
  res.json({ message: "well hello there!" });
});

module.exports = router;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
