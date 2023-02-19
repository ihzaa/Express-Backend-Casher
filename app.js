import express from "express";
import logger from "morgan";
import dotenv from "dotenv";

import indexRouter from "./routes/index.js";

const env = dotenv.config().parsed;
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.listen(env.APP_PORT, () => {
  console.log("Server is running in port: " + env.APP_PORT);
});
