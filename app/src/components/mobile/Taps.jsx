import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../assets/css/taps.css";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeTap: "active",
      shopTap: "",
      searchTap: "",
      profileTap: "",
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.handleActiveTap();
  }

  handleActiveTap = () => {
    const { path } = this.props;
    if (path === "home") {
      this.setState({
        homeTap: "active",
        shopTap: "",
        searchTap: "",
        profileTap: "",
      });
    }
    if (path === "shop") {
      this.setState({
        homeTap: "",
        shopTap: "active",
        searchTap: "",
        profileTap: "",
      });
    }
    if (path === "search") {
      this.setState({
        homeTap: "",
        shopTap: "",
        searchTap: "active",
        profileTap: "",
      });
    }
    if (path === "profile") {
      this.setState({
        homeTap: "",
        shopTap: "",
        searchTap: "",
        profileTap: "active",
      });
    }
  };

  render() {
    const { homeTap, shopTap, searchTap, profileTap } = this.state;
    return (
      <>
        <div className="navbar taps regular-th">
          <Link
            to="/"
            className={homeTap}
            //onClick={() => this.handleActiveTap()}
          >
            {" "}
            <i className="fas fa-home" style={{ fontSize: "25px" }} />
            <br />
            หน้าหลัก
          </Link>

          <Link
            to="/shop"
            className={shopTap}
            //onClick={() => this.handleActiveTap(2)}
          >
            {" "}
            <i className="fas fa-th" style={{ fontSize: "25px" }} />
            <br />
            ร้านค้า
          </Link>

          <Link
            to="/search"
            className={searchTap}

            //onClick={() => this.handleActiveTap(4)}
          >
            {" "}
            <i className="fas fa-search" style={{ fontSize: "25px" }} />
            <br />
            ค้นหา
          </Link>

          <Link
            to="/profile"
            className={profileTap}
            //onClick={() => this.handleActiveTap(3)}
          >
            {" "}
            <i className="fas fa-user-alt" style={{ fontSize: "25px" }} />
            <br />
            ฉัน
          </Link>
        </div>
      </>
    );
  }
}
