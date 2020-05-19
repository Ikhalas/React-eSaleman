const express = require("express");
const bodyParser = require("body-parser");
const product_router = express.Router();
const mysqlConnection = require("../database/database.js");

product_router.use(bodyParser.json());
product_router.use(bodyParser.urlencoded({ extended: true }));

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

//insert new user data
product_router.post("/add_new_user", (req, res) => {
  let newUser = {
    user_id: req.body.user_id,
    user_email: req.body.user_email,
    user_name: req.body.user_name,
    user_photo: req.body.user_photo,
  };

  let sql = " INSERT INTO `salesman_users` SET ? ";
  mysqlConnection.query(sql, newUser, (error, results, fields) => {
    if (error) {
      console.log("fail to created (user table): " + error);
      throw error;
    }
    res.sendStatus(201); //Created
    console.log("created");
  });
});

module.exports = product_router;
