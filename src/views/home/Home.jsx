import React, { Component } from "react";

import Suggestion from './components/Suggestion'
import Promotion from './components/Promotion'
import Category from './components/Category'
import ProductList from './components/ProductList'


export default class Home extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div
        className="regular-th"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <Suggestion />
        <Promotion />
        <br />
        <Category />
        <br />
        <ProductList />
      </div>
    );
  }
}
