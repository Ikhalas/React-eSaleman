const express = require("express");
const product_router = express.Router();
const mysqlConnection = require("../database/database.js");

//Get all product
product_router.get("/all", (req, res) => {
  mysqlConnection.query(
    "SELECT products.product_id , product_name, product_detail, product_unit, product_price, product_inventory, category_id, product_image FROM products join product_thumbnail on products.product_id = product_thumbnail.product_id;",
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

//Get a product by id
product_router.get("/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT products.product_id , product_name, product_detail, product_unit, product_price, product_inventory, category_id, product_image FROM products join product_thumbnail on products.product_id = product_thumbnail.product_id WHERE products.product_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (err) {
        console.log("fail to query: " + err);
        res.sendStatus(500); //Internal server error
        return;
      }
      res.json(rows[0]);
    }
  );
});

//Get a product by category 
product_router.get("/category/:cate_id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM products WHERE category_id = ?", // missing product_thumbnail
    [req.params.cate_id],
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

module.exports = product_router;
