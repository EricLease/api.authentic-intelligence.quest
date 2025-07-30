import debug from "debug";
import httpStatusCodes from "../utils/http-status-codes.js";
import Puppeteer from "./crawlers/puppeteer.js";

const scraperDebug = debug("api.authentic-intelligence.quest:scraper");

const performScrape = async (crawlerFn, urls) => {
  if (!urls?.length) {
    return {
      status: httpStatusCodes.NoContent,
      message: "Empty URL",
    };
  }

  scraperDebug(`Scraping: ${JSON.stringify(urls)}`);

  const crawler = new crawlerFn(urls);

  await crawler.run();

  const sessionId = await crawler.id();
  const logMsg = `[Session ${sessionId}] ${crawler.type} scraped: ${JSON.stringify(urls)}`;

  scraperDebug(logMsg);

  return {
    status: httpStatusCodes.OK,
    message: logMsg,
  };
};

const puppeteerScrape = async (urls) => await performScrape(Puppeteer, urls);

const Scrapers = Object.freeze({
  puppeteer: puppeteerScrape,
});

export default async (scraperType, urls) => {
  const type = scraperType?.toLowerCase();

  if (type && typeof Scrapers[type] === "function") {
    return await Scrapers[type](urls);
  }

  const logMsg = `Invalid scraper type: ${scraperType}`;

  scraperDebug(logMsg);

  return {
    status: httpStatusCodes.BadRequest,
    message: logMsg,
  };
};
