var cors = require("cors");

const whitelist = process.env.CLIENT_WHITELIST.split(" ");

const corsConfig = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
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

module.exports = cors(corsConfig);
