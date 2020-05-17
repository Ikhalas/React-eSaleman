const express = require("express");
const bodyParser = require("body-parser");
const order_router = express.Router();
const mysqlConnection = require("../database/database.js");

order_router.use(bodyParser.json());
order_router.use(bodyParser.urlencoded({ extended: true }));

//Get all product
order_router.post("/post_order", (req, res) => {
  //console.log(req.body)
  let orders = {
    order_year: new Date(req.body.orderDate).getFullYear(),
    order_numb: 0,
    order_date: new Date(req.body.orderDate),
    order_time: new Date(req.body.orderDate),
    order_price: req.body.totalPrice,
    customer_id: 0,
    employee_position_id: 0,
  };

  let sql = " INSERT INTO orders SET ? ";
  mysqlConnection.query(sql, orders, (error, results, fields) => {
    if (error) {
      console.log("fail to created (orders table): " + error);
      throw error;
    }

    if (results) {
      req.body.orders.forEach((order) => {
        let order_list = {
          quantity: order.quantity,
          price: order.product.product_price,
          total_price: order.product.product_price * order.quantity,
          order_id: results.insertId,
          product_id: Number(order.product.product_id),
        };
        //console.log(order_list);
        let sql = " INSERT INTO order_list SET ? ";
        mysqlConnection.query(sql, order_list, (error, results, fields) => {
          if (error) {
            console.log("fail to created (order_list table): " + error);
            throw error;
          }
        });
      });
      res.sendStatus(201); //Created
      console.log('created')
    }
  });
});

module.exports = order_router;
