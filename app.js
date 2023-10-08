require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

// DB Connections
require("./models/db").connectDatabase();

// logger
const logger = require("morgan");
app.use(logger("tiny"));

// Routers
app.use("/", require("./routes/indexRouters"))


// Error handling
const ErorrHandler = require("./utils/ErrorHandler");
const { genetatedErrors } = require("./middleware/errors");
app.all("*", (req,res,next)=>{
  next(new ErorrHandler(`Requested URL Not Found ${req.url}`, 404))
})
app.use(genetatedErrors);

app.listen(
  process.env.PORT,
  console.log(`Server is running on port ${process.env.PORT}`)
);
