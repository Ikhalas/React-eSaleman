import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../assets/css/footer.css";

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className="footer-distributed regular-th">
          <div className="footer-right">
            <Link to="/">
              <i className="fab fa-facebook-f" />
            </Link>
            &nbsp;
            <Link to="/">
              <i className="fab fa-facebook-messenger" />
            </Link>
            &nbsp;
            <Link to="/">
              <i className="fab fa-line" />
            </Link>
            &nbsp;
            <Link to="/">
              <i className="fas fa-phone" />
            </Link>
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
