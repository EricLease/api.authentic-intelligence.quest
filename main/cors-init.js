var cors = require("cors");

var corsConfig = {
  origin: [
    "https://www.authenticintelligence.quest",
    "http://localhost:5173",
    "http://localhost:4173",
  ],
  methods: ["GET", "HEAD", "PATCH", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = cors(corsConfig);
