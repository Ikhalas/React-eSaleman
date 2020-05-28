import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import "../../assets/css/taps.css";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeTap: "active",
      productTap: "",
      profileTap: "",
      otherTap: "",
    };
  }

  handleActiveTap = (tap) => {
    if (tap === 1) {
      this.setState({
        homeTap: "active",
        productTap: "",
        profileTap: "",
        otherTap: "",
      });
    }
    if (tap === 2) {
      this.setState({
        homeTap: "",
        productTap: "active",
        profileTap: "",
        otherTap: "",
      });
    }
    if (tap === 3) {
      this.setState({
        homeTap: "",
        productTap: "",
        profileTap: "active",
        otherTap: "",
      });
    }
    if (tap === 4) {
      this.setState({
        homeTap: "",
        productTap: "",
        profileTap: "",
        otherTap: "active",
      });
    }
  };

  render() {
    const { homeTap, productTap, profileTap, otherTap } = this.state;
    return (
      <>
        <div className="navbar taps">
          <Link
            to="/"
            className={homeTap}
            onClick={() => this.handleActiveTap(1)}
          >
            {" "}
            <i className="fas fa-home" style={{ fontSize: "25px" }} />
         
          </Link>

          <Link
            to="/"
            className={productTap}
            onClick={() => this.handleActiveTap(2)}
          >
            {" "}
            <i className="fas fa-th" style={{ fontSize: "25px" }} />
           
          </Link>

          <Link
            to="/"
            className={profileTap}
            onClick={() => this.handleActiveTap(3)}
          >
            {" "}
            <i className="fas fa-user-alt" style={{ fontSize: "25px" }} />
          </Link>

          <Link
            to="/"
            className={otherTap}
            onClick={() => this.handleActiveTap(4)}
          >
            {" "}
            <i className="fas fa-align-justify" style={{ fontSize: "25px" }} />
          </Link>
        </div>
      </>
    );
  }
}
