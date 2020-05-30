import React, { Component } from "react";
import { auth } from "../../../assets/api/firebase";
import axios from "axios";
import { Button } from "reactstrap";

import Header from "../../../components/mobile/Header";
import Taps from "../../../components/mobile/Taps";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      userDetail: "",
      productSelling: "",
      productSold: "",
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getUser();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getUser() {
    auth.onAuthStateChanged((user) => {
      user
        ? this._isMounted &&
          this.setState({ currentUser: user }, () => {
            this._isMounted && this.getUserDetail();
            this._isMounted && this.getSellingProduct();
            this._isMounted && this.getSoldProduct();
          })
        : this._isMounted && this.setState({ currentUser: null });
    });
  }

  getUserDetail() {
    const { currentUser } = this.state;
    axios
      .get(process.env.REACT_APP_API_URL + "/user/" + currentUser.uid)
      .then((res) => {
        //console.log(res.data)
        this._isMounted &&
          this.setState({
            userDetail: res.data,
          });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/errconnection");
      });
  }

  getSellingProduct() {
    const { currentUser } = this.state;
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/sharing/share_selling/" +
          currentUser.uid
      )
      .then((res) => {
        //console.log(res.data);
        this._isMounted &&
          this.setState({
            productSelling: res.data,
          });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/errconnection");
      });
  }

  getSoldProduct() {
    const { currentUser } = this.state;
    axios
      .get(
        process.env.REACT_APP_API_URL + "/sharing/share_sold/" + currentUser.uid
      )
      .then((res) => {
        //console.log(res.data);
        this._isMounted &&
          this.setState({
            productSold: res.data,
          });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/errconnection");
      });
  }

  render() {
    const { userDetail, productSelling, productSold } = this.state;
    let userPhoto = "";
    userDetail.user_photo
      ? (userPhoto = userDetail.user_photo)
      : (userPhoto = require("../../../assets/images/user.png"));
    return (
      <>
        <Header />
        <div className="regular-th" style={{ marginTop: "60px" }}>
          <div className="pt-2">
            <div
              style={{
                display: "table",
                margin: "0 auto",
                backgroundColor: "#f9f9f9",
                backgroundImage: `url(${userPhoto})`,
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                borderRadius: "50%",
                width: "200px",
                height: "200px",
              }}
            />
          </div>
          <hr />

          <div className="px-3">
            {userDetail.user_name ? (
              <h4>{userDetail.user_name}</h4>
            ) : (
              <>
                <div>
                  <span style={{ fontSize: "18px" }}>
                    ให้เราทำความรู้จักคุณ....
                  </span>
                  <button
                    className="button-like-a text-danger light-th"
                    style={{ fontSize: "12px" }}
                  >
                    แก้ไขโปรไฟล์
                  </button>
                </div>
              </>
            )}
            <p className="light-th" style={{ fontSize: "12px" }}>
              Salesman ID : {userDetail.user_id}
            </p>

            <div style={{ border: "1px solid #d9d9d9" }}>
              <div className="py-3" style={{ textAlign: "center" }}>
                <span style={{ fontSize: "14px" }}>
                  <button className="button-like-a">
                    กำลังขาย {productSelling.length} รายการ
                  </button>
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ fontSize: "14px" }}>
                  <button className="button-like-a">
                    ขายสำเร็จ {productSold.length} รายการ
                  </button>
                </span>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="px-3">
            <Button onClick={() => auth.signOut()} color="danger" block>
              ออกจากระบบ
            </Button>
          </div>
        </div>
        <Taps path="profile" />
      </>
    );
  }
}
