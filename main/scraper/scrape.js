import { PUPPETEER_ENABLED } from "../utils/config.js";
import moduleDebug from "../utils/module-debug.js";
import httpStatusCodes from "../utils/http-status-codes.js";

const scraperDebug = moduleDebug(["scraper"]);

const performScrape = async (crawlerFn, urls) => {
  if (!urls?.length) {
    return {
      status: httpStatusCodes.NoContent,
      message: "Empty URL",
    };
  }

  scraperDebug(`Scraping: ${JSON.stringify(urls)}`);

  if (!crawlerFn) {
    return {
      status: httpStatusCodes.UnprocessableContent,
      message: "Desired crawler not enabled",
    };
  }

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

const PuppeteerPath = "./crawlers/puppeteer.js";

const { default: Puppeteer } = PUPPETEER_ENABLED
  ? await import(PuppeteerPath)
  : await Promise.resolve({ default: null });

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
