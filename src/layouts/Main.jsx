import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "../components/main/Header";
import Home from "../views/Home";

import "../assets/css/app.css";

export default class Main extends Component {
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
        <Header />
        {this.renderRouter()}
      </BrowserRouter>
    );
  }
}
