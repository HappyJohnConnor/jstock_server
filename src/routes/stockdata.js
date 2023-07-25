const express = require("express");
const app = express();
const router = express.Router();

const pool = require("../db/pool");
const config = require("../../config.json")[app.get("env")];

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-type, Accept"
  );
  next();
});

//pool.connect();

// http/localhost/stockdata?stock_idx=hoge&from=***&to=***
router.get("/", (req, res, next) => {
  const query_data = req.query;
  const query_str = `
    SELECT * FROM ${query_data.stock_idx} 
    WHERE time BETWEEN "${query_data.from}" AND "${query_data.to}" 
    ORDER BY time DESC`;
  pool.getConnection((err, conn) => {
    conn.query(query_str, (err, result) => {
      if (err) {
        console.log(query_str);
        console.log(query_data);
        console.log(err);
        res.status(500).send({ message: err.message });
      }
      res.status(200).json(result);
      conn.release();
    });
  });
});

router.get("/all", async (req, res, next) => {
  const stockData = {};
  try {
    const tables = await getData("show tables");
    for (const table of tables) {
      const tablename = table["Tables_in_" + config["DB_NAME"]];
      const tableData = await getData(
        `select * from ${tablename} order by time desc limit 20`
      );
      stockData[tablename] = tableData;
    }
    res.status(200).json(stockData);
  } catch (e) {
    res.status(500).send({ messgae: e.message });
    console.log(e);
  }
});

function getData(str_query) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      conn.query(str_query, (err, result) => {
        conn.release();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
}
module.exports = router;
