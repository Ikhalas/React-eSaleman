import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../../assets/css/error.css";

export default class NotFound extends Component {
  render() {
    return (
      <div className="main-container">
        <br />
        <br />
        <h1 className="err-code">404</h1>
        <p className="err-msg">Oops! Something is wrong.</p>
        <br />
        <br /> 
        <br />
        <div className="light-th" style={{ textAlign: "center" }}>
          <Link className="err-button" to="/">
            กลับสู่หน้าหลัก...
          </Link>
        </div>
      </div>
    );
  }
}
