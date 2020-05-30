import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../../assets/css/error.css";

export default class BadConnection extends Component {
  render() {
    return (
      <div className="main-container">
        <br />
        <br />
        <br />
        <br /><br />
        <br />
        <h1 className="err-code" style={{fontSize:'5em'}}>Connection error</h1>
        <p className="err-msg">Unable to connect with the server.</p>
        <br />
        <br />
        <br />
        <div className="light-th" style={{ textAlign: "center" }}>
          <Link className="err-button" to="/">
            ลองอีกครั้ง...
          </Link>
        </div>
      </div>
    );
  }
}
