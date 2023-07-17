const mysql = require("mysql");
const express = require("express");
const app = express();
const config = require("../../config.json")[app.get("env")];
console.log(config);

const db_config = {
  user: config["DB_USER"],
  host: config["DB_HOST"],
  database: config["DB_NAME"],
  password: config["DB_PASSWORD"],
  port: 3306,
};
const pool = mysql.createPool(db_config);

module.exports = pool;
