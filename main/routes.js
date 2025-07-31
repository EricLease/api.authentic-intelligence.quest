import { Router } from "express";
import moduleDebug from "./utils/module-debug.js";
import { SCRAPER_ENABLED } from "./utils/config.js";
import { readPosts, readPost } from "./repos/blog/posts.js";

const routesDebug = moduleDebug(["routes"]);

const ScraperInitPath = "./scraper/init.js";

const router = Router();

// Blog ---------------------------------------------------
router.get("/api/posts", async (_, res) => {
  await readPosts(res);
});

router.get("/api/post", async (req, res) => {
  await readPost(req, res);
});

if (!SCRAPER_ENABLED) {
  routesDebug("NOT LOADING Scraper init module!");
} else {
  const { default: scraperInit } = await import(ScraperInitPath);

  routesDebug("Scraper init loaded, now executing...");
  scraperInit(router);
  routesDebug("Scraper init executed!");
}

export default router;
