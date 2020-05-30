import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../views/mobile/home/Home";
import Shop from "../views/mobile/shop/Shop";
import ProductDetail from "../views/mobile/shop/ProductDetail"
import Search from "../views/mobile/search/Search";
import Profile from "../views/mobile/profile/Profile";
import BadConnection from "../views/browser/error/BadConnection"
import NotFound from '../views/browser/error/NotFound'

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/app.css";

export default class MainMobile extends Component {
  renderRouter() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/productdetail/:shopname/:shopid/:id" component={ProductDetail}/>
        <Route exact path="/search" component={Search} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/errconnection" component={BadConnection}/>
        <Route component={NotFound} />
      </Switch>
    );
  }

  render() {
    return <BrowserRouter>{this.renderRouter()}</BrowserRouter>;
  }
}
