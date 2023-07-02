const mysql = require("mysql");

const conn = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "stock",
  password: "",
  port: 3306,
});
module.exports = conn;
