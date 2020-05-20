const express = require("express");
const axios = require("axios");
const product_router = express.Router();

//Get all products
product_router.get("/", (req, res) => {
  axios
    .get("http://localhost:3001/products")
    .then((response) => {
      res.status(200); //OK
      res.json(response.data);
    })
    .catch((error) => {
      console.log("fail to query: " + error);
      res.status(500).json(error); //Internal server error
    });
});

//Get a products by products_id
product_router.get("/:id", (req, res) => {
  axios
    .get("http://localhost:3001/products/?product_id=" + req.params.id)
    .then((response) => {
      res.status(200); //OK
      res.json(response.data[0]);
    })
    .catch((error) => {
      console.log("fail to query: " + error);
      res.status(500).json(error); //Internal server error
    });
});

//Get a products by product_shop
product_router.get("/shop/:id", (req, res) => {
  axios
    .get("http://localhost:3001/products/?product_shopID=" + req.params.id)
    .then((response) => {
      res.status(200); //OK
      res.json(response.data);
    })
    .catch((error) => {
      console.log("fail to query: " + error);
      res.status(500).json(error); //Internal server error
    });
});

module.exports = product_router;
