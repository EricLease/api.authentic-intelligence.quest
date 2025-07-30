import cors from "cors";
import { CORS_WHITELIST } from "./config.js";

const corsConfig = {
  origin: (origin, callback) => {
    if (CORS_WHITELIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "PATCH", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default cors(corsConfig);
