const express = require("express");
const bodyParser = require("body-parser");
const sharing_router = express.Router();
const mysqlConnection = require("../database/database.js");

sharing_router.use(bodyParser.json());
sharing_router.use(bodyParser.urlencoded({ extended: true }));

//Get all sharing
sharing_router.get("/share_status/:id", (req, res) => {
  console.log(req.params.id)
  mysqlConnection.query(
    "SELECT product_id FROM `salesman_sharing` WHERE user_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (err) {
        console.log("fail to query (`salesman_sharing` table): " + err);
        res.status(500); //Internal server error
        res.json(err);
        return;
      }
      res.status(200); //OK
      res.json(rows);
    }
  );
});

//Post share facebook
sharing_router.post("/new_share", (req, res) => {
  let sharing = {
    user_id: req.body.user_id,
    share_date: req.body.share_date,
    share_time: req.body.share_time,
    share_status: req.body.share_status,
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    product_detail: req.body.product_detail,
    product_price: req.body.product_price,
    product_unit: req.body.product_unit,
    product_thumbnail: req.body.product_thumbnail,
    product_category: req.body.product_category,
    product_shop: req.body.product_shop,
    product_shopID: req.body.product_shopID,
    product_URL: req.body.product_URL,
  };

  let sql = " INSERT INTO `salesman_sharing` SET ? ";
  mysqlConnection.query(sql, sharing, (err, results, fields) => {
    if (err) {
      console.log("fail to created (`salesman_sharing` table): " + err);
      res.status(500); //Internal server error
      res.json(err);
      return;
    }
    res.status(201); //Created
  });
});

module.exports = sharing_router;
