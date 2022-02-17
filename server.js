require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verrifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

// connect to mongodb
connectDB();

// Custom middleware logger
app.use(logger);
app.use(credentials);
// cross origin resource sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware for coockie
app.use(cookieParser());

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

// VerifyJWT middleware
app.use(verrifyJWT);
app.use("/api/employees", require("./routes/employees"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB`);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
