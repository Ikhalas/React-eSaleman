import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Addnewshop extends Component {
  render() {
    return (
      <div
        className="light-th text-danger"
        style={{ minHeight: "100vh", textAlign: "center", fontSize: "40px" }}
      >
        <br /> <br />
        อยู่ระหว่างการพัฒนา...
        <br /> <br />
       
        <Link to="/" style={{fontSize: "20px"}}>กลับสู่หน้าหลัก</Link>
       
      </div>
    );
  }
}
