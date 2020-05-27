import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import Header from "../components/Header";
import Footer from "../components/Footer"
import Home from "../views/home/Home";
import Product from "../views/product/Product";
import ProductDetail from "../views/product/ProductDetail";
import Addnewshop from "../views/newshop/Addnewshop"
import BadConnection from "../views/error/BadConnection"
import NotFound from '../views/error/NotFound'

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/app.css";

export default class Main extends Component {
  renderRouter() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/productdetail/:shopname/:shopid/:id" component={ProductDetail}/>
        <Route exact path="/newshop" component={Addnewshop}/>
        <Route exact path="/errconnection" component={BadConnection}/>
        <Route component={NotFound} />
      </Switch>
    );
  }

  render() {
    return (
      <BrowserRouter>
        {this.renderRouter()}
        <Footer />
      </BrowserRouter>
    );
  }
}
