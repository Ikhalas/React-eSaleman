import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../assets/css/footer.css";

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className="footer-distributed regular-th">
          <div className="footer-right">
            <a href="#">
              <i className="fab fa-facebook-f" />
            </a>
            &nbsp;
            <a href="#">
              <i className="fab fa-facebook-messenger" />
            </a>
            &nbsp;
            <a href="#">
              <i className="fab fa-line" />
            </a>
            &nbsp;
            <a href="#">
              <i className="fas fa-phone" />
            </a>
          </div>
          <div className="footer-left">
            <p className="footer-links">
              <Link className="link-1" to="/">
                โปรไฟล์
              </Link>{" "}
              &nbsp; &nbsp;
              <Link className="light-th" to="/product">
                รายการสินค้า
              </Link>{" "}
              &nbsp; &nbsp;
              <Link className="light-th" to="/newshop">
                ขายของกับ e-Salesman
              </Link>
            </p>
            <p>PSU CoE © 2020</p>
          </div>
        </footer>
      </>
    );
  }
}


