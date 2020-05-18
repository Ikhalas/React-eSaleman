const express = require("express");
const product_router = express.Router();
const mysqlConnection = require("../database/database.js");

//Get a user by user_id
product_router.get("/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM `salesman_users` WHERE user_id = ?",
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


module.exports = product_router;
