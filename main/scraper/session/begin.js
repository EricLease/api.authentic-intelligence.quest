import debug from "debug";
import { createSession, readSession } from "../../repos/scraper/sessions.js";

const sessionDebug = debug(
  "api.authentic-intelligence.quest:server:scraper:session"
);

// let purged = false;

// async function purge() {
//   if (purged) {
//     return;
//   }

//   await purgeDefaultStorages();

//   purged = true;
// }

export default async (crawlerFactory, sessionId) => {
  //await purge();

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
