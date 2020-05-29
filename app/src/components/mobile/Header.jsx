import React, { Component } from "react";

import '../../assets/css/m-header.css'

export default class Header extends Component {
  render() {
    return (
      <div className="navbar nav-header" style={{zIndex:'1000'}}>
         <img
            src={require("../../assets/images/logo_2.png")}
            alt="logo"
            width="20%"
            />
       
      </div>
    );
  }
}
