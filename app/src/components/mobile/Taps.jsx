import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { auth } from "../../assets/api/firebase";

import "../../assets/css/taps.css";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeTap: "active",
      shopTap: "",
      searchTap: "",
      profileTap: "",
      currentUser: null,
      userDetail: "",
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getUser();
    this._isMounted && this.handleActiveTap();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getUser() {
    auth.onAuthStateChanged((user) => {
      user
        ? this._isMounted &&
          this.setState({ currentUser: user }, () => {
            //console.log(this.state.currentUser.uid)
            this.getUserDetail();
          })
        : this._isMounted && this.setState({ currentUser: null });
    });
  }

  getUserDetail() {
    const { currentUser } = this.state;
    axios
      .get(process.env.REACT_APP_API_URL + "/user/" + currentUser.uid)
      .then((res) => {
        this._isMounted &&
          this.setState(
            {
              userDetail: res.data,
            },
            () => this.isFirstTimeLogin()
          );
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/errconnection");
      });
  }

  isFirstTimeLogin() {
    const { currentUser, userDetail } = this.state;

    if (currentUser.providerData[0].providerId !== "password" && !userDetail) {
      //console.log("log in with " + currentUser.providerData[0].providerId + " and this is my first time");
      axios
        .post(process.env.REACT_APP_API_URL + "/user/add_new_user", {
          user_id: currentUser.uid,
          user_email: currentUser.email,
          user_name: currentUser.displayName,
          user_photo: currentUser.photoURL,
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
      //console.log("end");
    }
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
