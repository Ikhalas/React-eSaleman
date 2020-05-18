import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import Home from "../views/home/Home";
import Product from "../views/product/Product";
import ProductDetail from "../views/product/ProductDetail";
import Addnewshop from "../views/newshop/Addnewshop"

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/app.css";

export default class Main extends Component {
  renderRouter() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/productdetail/:shop/:id" component={ProductDetail}/>
        <Route exact path="/newshop" component={Addnewshop}/>
      </Switch>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        {this.renderRouter()}
      </BrowserRouter>
    );
  }
}
