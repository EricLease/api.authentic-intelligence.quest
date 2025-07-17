var cors = require("cors");

var corsConfig = {
  origin: [
    "https://AuthenticIntelligence.quest",
    "http://localhost:5173",
    "http://localhost:4173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
};

module.exports = cors(corsConfig);
