const mysql = require("mysql");
const express = require("express");
const app = express();
/*
const conn = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "stock",
  password: "",
  port: 3306,
});*/
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "../settings";
console.log(DB_HOST);
const config = require("../../config.json")[app.get("env")];
console.log(config);
const conn = mysql.createConnection({
  user: config["DB_USER"],
  host: config["DB_HOST"],
  database: config["DB_NAME"],
  password: config["DB_PASSWORD"],
  port: 3306,
});
module.exports = conn;
