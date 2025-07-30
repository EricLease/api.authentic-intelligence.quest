import debug from "debug";
import { PuppeteerCrawler } from "crawlee";
import beginSession from "../session/begin.js";
import { createPage } from "../../repos/scraper/pages.js";

const puppeteerDebug = debug(
  "api.authentic-intelligence.quest:server:scraper:crawler:puppeteer"
);

const puppeteerFactory = (sessionId) =>
  new PuppeteerCrawler({
    launchContext: {
      launchOptions: {
        executablePath: "/usr/bin/google-chrome",
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    },
    async requestHandler({ page, response }) {
      const html = await page.content();
      const status = response?.status() ?? null;
      const metadata = {
        title: await page.title(),
        url: page.url(),
        links: await page.$$eval("a", (as) => as.map((a) => a.href)),
      };
      const headers = response?.headers() ?? {};

      puppeteerDebug(
        `metadata: ${JSON.stringify(metadata)}\nheaders: ${JSON.stringify(headers)}`
      );

      await createPage(sessionId, html, status, metadata, headers);
    },
  });

export default function (urls, sessionId) {
  let session = null;

  const id = async () => {
    await init();
    return session.sessionId;
  };

  const run = async () => {
    await init();
    await session.crawler.run(
      urls.map((url) => {
        return { url: url, uniqueKey: session.id };
      })
    );
  };

  async function init() {
    if (session) {
      return;
    }

    session = await beginSession(puppeteerFactory, sessionId);

    if (!session) {
      throw new Error("Failed to establish Puppeteer Session");
    }
  }

  return {
    type: "Puppeteer",
    id: id,
    run: run,
  };
}
