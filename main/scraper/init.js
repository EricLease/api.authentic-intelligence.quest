import scrape from "./scrape.js";
import { readPages, readPage } from "../repos/scraper/pages.js";

export default (router) => {
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
};
