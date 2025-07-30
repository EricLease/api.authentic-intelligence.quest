import { Router } from "express";
import { readPosts, readPost } from "./repos/blog/posts.js";
import { readPages, readPage } from "./repos/scraper/pages.js";
import scrape from "./scraper/scrape.js";

const router = Router();

// Blog ---------------------------------------------------
router.get("/api/posts", async (_, res) => {
  await readPosts(res);
});

router.get("/api/post", async (req, res) => {
  await readPost(req, res);
});

// Scraper CRUD -------------------------------------------
router.get("/api/pages", async (_, res) => {
  await readPages(res);
});

router.get("/api/page", async (req, res) => await readPage(req, res));

// Scraper BLL --------------------------------------------
router.post("/api/page/:scraperType", async (req, res) => {
  const { status, message } = await scrape(req.params.scraperType, [
    req.body.url,
  ]);

  res.status(status);
  res.send(message);
});

export default router;
