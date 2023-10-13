require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

// CORS
app.use(require("cors")({ credentials: true, origin: true }));

// DB Connections
require("./models/db").connectDatabase();

// logger
const logger = require("morgan");
app.use(logger("tiny"));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session cookie

const session = require("express-session");
const cookieparse = require("cookie-parser");

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieparse());

// Routers
app.use("/", require("./routes/indexRouters"));

// Error handling
const ErorrHandler = require("./utils/ErrorHandler");
const { genetatedErrors } = require("./middleware/errors");
app.all("*", (req, res, next) => {
  next(new ErorrHandler(`Requested URL Not Found ${req.url}`, 404));
});
app.use(genetatedErrors);

app.listen(
  process.env.PORT,
  console.log(`Server is running on port ${process.env.PORT}`)
);
