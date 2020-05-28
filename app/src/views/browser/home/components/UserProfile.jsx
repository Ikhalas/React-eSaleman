import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

class UserProfile extends Component {
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
    this._isMounted && this.getUserDetail();
    this._isMounted && this.getSellingProduct();
    this._isMounted && this.getSoldProduct();
    //console.log(this.props.userid);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getUserDetail() {
    const { userid } = this.props;
    axios
      .get(process.env.REACT_APP_API_URL + "/user/" + userid)
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
    const { userid } = this.props;
    axios
      .get(process.env.REACT_APP_API_URL + "/sharing/share_selling/" + userid)
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
    const { userid } = this.props;
    axios
      .get(process.env.REACT_APP_API_URL + "/sharing/share_sold/" + userid)
      .then((res) => {
        //console.log(res.data);
        this._isMounted &&
          this.setState({
            productSold: res.data,
          });
      });
  }

  render() {
    const { userDetail, productSelling, productSold } = this.state;
    let userPhoto = "";
    userDetail.user_photo
      ? (userPhoto = userDetail.user_photo)
      : (userPhoto = require("../../../../assets/images/user.png"));
    return (
      <>
        <div style={{ backgroundColor: "#ffffff" }}>
          <Container fluid={true} style={{ width: "60%" }}>
            <br />
            <h5>โปรไฟล์</h5>
          </Container>
          <hr />
          <Container
            className="themed-container"
            fluid={true}
            style={{ width: "60%" }}
          >
            <div style={{ border: "1px solid #d9d9d9", height: "200px" }}>
              <Row>
                <Col md="4" style={{ textAlign: "center" }}>
                  <div style={{ paddingLeft: "50px", paddingTop: "10px" }}>
                    <div
                      style={{
                        backgroundColor: "#f9f9f9",
                        backgroundImage: `url(${userPhoto})`,
                        backgroundSize: "100%",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "50%",
                        width: "150px",
                        height: "150px",
                      }}
                    ></div>
                  </div>
                </Col>
                <Col md="6">
                  <div style={{ paddingTop: "20px" }}>
                    {userDetail.user_name ? (
                      <h1>{userDetail.user_name}</h1>
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
                    <span className="light-th" style={{ fontSize: "12px" }}>
                      Salesman ID : {userDetail.user_id}
                    </span>
                    <br />
                    <br />
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
                </Col>
                <Col md="2" className="text-right">
                  <button
                    className="button-like-a light-th pr-2 pt-1"
                    style={{ fontSize: "12px" }}
                  >
                    แก้ไขโปรไฟล์
                  </button>
                </Col>
              </Row>
            </div>
          </Container>
          <hr />
        </div>
      </>
    );
  }
}

export default withRouter(UserProfile);
