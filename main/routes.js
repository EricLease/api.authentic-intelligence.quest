const express = require("express");
const { getPosts, getPost } = require("./repos/posts");

const router = express.Router();

router.get("/api/posts", async (_, res) => {
  await getPosts(res);
});

router.get("/api/post", async (req, res) => {
  await getPost(req, res);
});

module.exports = router;
