const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// cross origin resource sharing
const whitelist = [
  "https://www.google.com",
  "http://127.0.0.1:3000",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowedby CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world.");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// add listener for the log event
// myEmitter.on("log", (msg) => logEvents(msg));
// myEmitter.emit("log", "Log event emitted.");
