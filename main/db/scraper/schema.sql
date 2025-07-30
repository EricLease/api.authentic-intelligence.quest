/*
-- Initial dev setup
CREATE DATABASE scraper;
-- postgres=# \c scraper
--CREATE USER scraperadmin WITH PASSWORD 'authenticintelligencescraperadmin';
--GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO scraperadmin;
--GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO scraperadmin;
-- Using a single acct to access both DBs on prod server, so setup similarly:
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO blogadmin;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO blogadmin;
*/

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "description" TEXT,
  date_created TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE pages (
  id SERIAL PRIMARY KEY,
  "url" TEXT NOT NULL,
  raw_html TEXT,
  metadata JSONB,
  headers JSONB,
  status_code INTEGER,
  session_id UUID REFERENCES "sessions"(id),
  date_created TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  page_id INTEGER REFERENCES pages(id),
  "type" TEXT,
  "url" TEXT,
  date_created TIMESTAMPTZ DEFAULT now()
);

-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO blogadmin
