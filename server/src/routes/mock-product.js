const express = require("express");
const prod_router = express.Router();
const mysqlConnection = require("../database/database.js");

//Get a products by products_id
prod_router.get("/getbyid/:shopid/:id", (req, res) => {
  let sql = `SELECT * FROM mock_product WHERE product_shopID = ${req.params.shopid} AND product_id = ${req.params.id}`;

  mysqlConnection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log("fail to query (`mock_product` table): " + err);
      res.status(500); //Internal server error
      res.json(err);
      return;
    }
    res.status(200); //OK
    res.json(rows[0]);
  });
});

//Get a products by product_shop
prod_router.get("/shop/:id", (req, res) => {
  let sql = `SELECT * FROM mock_product WHERE product_shopID = ${req.params.id}`;
  //console.log(sql)

  mysqlConnection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log("fail to query (`mock_product` table): " + err);
      res.status(500); //Internal server error
      res.json(err);
      return;
    }
    res.status(200); //OK
    res.json(rows);
  });
});

module.exports = prod_router;
