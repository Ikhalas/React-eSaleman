const express = require("express");
const shop_router = express.Router();
const mysqlConnection = require("../database/database.js");


//Get all shop
shop_router.get("/", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM `salesman_shop`",
    (err, rows, fields) => {
      if (err) {
        console.log("fail to query: " + err);
        res.sendStatus(500); //Internal server error
        return;
      }
      res.json(rows);
    }
  );
});



module.exports = shop_router;
