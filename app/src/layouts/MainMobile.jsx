import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../views/mobile/home/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/app.css";

export default class MainMobile extends Component {
  renderRouter() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    );
  }

  render() {
    return (
      <BrowserRouter>
        {this.renderRouter()}
      </BrowserRouter>
    );
  }
}
