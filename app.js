import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import indexRouter from "./routes/index.js";

import {store} from "./controllers/CategoryController.js";

const env = dotenv.config().parsed;
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.post("/categories", store);

mongoose.set("strictQuery", false);
mongoose.connect(`${env.MONGODB_URI}${env.MONGODB_HOST}:${env.MONGODB_PORT}`, {
  dbName: env.MONGODB_DB_NAME,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("connected to mongodb");
});

app.listen(env.APP_PORT, () => {
  console.log("Server is running in port: " + env.APP_PORT);
});
