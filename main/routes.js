const express = require("express");
const { getPosts, getPost } = require("./repos/blog/posts");
const { getPages, getPage } = require("./repos/scraper/pages");

const router = express.Router();

// Blog ---------------------------------------------------
router.get("/api/posts", async (_, res) => {
  await getPosts(res);
});

router.get("/api/post", async (req, res) => {
  await getPost(req, res);
});

// Scraper ------------------------------------------------
router.get("/api/pages", async (_, res) => {
  await getPages(res);
});

router.get("/api/page", async (req, res) => {
  await getPage(req, res);
});

module.exports = router;
