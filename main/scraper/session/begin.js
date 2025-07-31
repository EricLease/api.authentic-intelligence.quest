import moduleDebug from "../../utils/module-debug.js";
import { createSession, readSession } from "../../repos/scraper/sessions.js";

const sessionDebug = moduleDebug(["server", "scraper", "session"]);

export default async (crawlerFactory, sessionId) => {
  let create = true;

  if (sessionId) {
    const session = await readSession(sessionId);

    if (session) {
      create = false;
    } else {
      sessionDebug(`Invalid session id: ${sessionId}`);
    }
  }

  if (create) {
    sessionId = await createSession();

    if (!sessionId) {
      throw new Error(`Invalid session id: ${sessionId}`);
    }
  }

  const crawler = crawlerFactory(sessionId);

  return {
    sessionId: sessionId,
    crawler: crawler,
  };
};
