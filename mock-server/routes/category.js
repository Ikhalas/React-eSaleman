const express = require("express");
const cate_router = express.Router();
const mysqlConnection = require("../database/database.js");

//Get all category
cate_router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM categories;", (err, rows, fields) => {
    if (err) {
      console.log("fail to query: " + err);
      res.sendStatus(500); //Internal server error
      return;
    }
    res.json(rows);
  });
});

//Get a category by product id
cate_router.get("/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * from categories WHERE category_id = ?",
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

module.exports = cate_router;
