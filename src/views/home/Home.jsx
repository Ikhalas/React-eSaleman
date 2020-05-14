import React, { Component } from "react";

import UserProfile from './components/UserProfile'


import UserProduct from './components/UserProduct'


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
        <UserProfile />
        <br />
        <UserProduct />
      </div>
    );
  }
}
