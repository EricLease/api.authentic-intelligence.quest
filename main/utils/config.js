import toBoolean from "./to-boolean.js";

// App/Server:
const APP_PORT = process.env.PORT;
const APP_FALLBACK_PORT = "8334";

// CORS:
const CORS_WHITELIST = process.env.CORS_WHITELIST.split(" ");

// Scraper:
const SCRAPER_ENABLED = toBoolean(process.env.SCRAPER_ENABLED);
const PUPPETEER_ENABLED = toBoolean(process.env.PUPPETEER_ENABLED);

// Postgres:
// !!! Remember to set up the corresponding environment variables in prod: !!!
const DB_BASE_CONFIG = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: +process.env.PGPORT,
};
const DB_NAME_BLOG = process.env.PGDATABASE_BLOG;
const DB_NAME_SCRAPER = process.env.PGDATABASE_SCRAPER;

// Use DB_ENABLED to quickly turn DB access on/off:
const DB_ENABLED = {
  [DB_NAME_BLOG]: toBoolean(process.env.PGDATABASE_BLOG_ENABLED),
  [DB_NAME_SCRAPER]: toBoolean(process.env.PGDATABASE_SCRAPER_ENABLED),
};

export {
  APP_PORT,
  APP_FALLBACK_PORT,
  CORS_WHITELIST,
  SCRAPER_ENABLED,
  PUPPETEER_ENABLED,
  DB_BASE_CONFIG,
  DB_NAME_BLOG,
  DB_NAME_SCRAPER,
  DB_ENABLED,
};
