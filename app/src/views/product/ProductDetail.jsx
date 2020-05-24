import React, { Component } from "react";
import { auth } from "../../assets/api/firebase";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Input } from "reactstrap";
import { FacebookShareButton, LineShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NotificationAlert from "react-notification-alert";

import Header from "../../components/Header";

import { ReactComponent as LineSVG } from "../../assets/icon/line.svg";
import { ReactComponent as FacebookSVG } from "../../assets/icon/facebook.svg";
//import { ReactComponent as MessengerSVG } from "../../assets/icon/messenger.svg";

import "../../assets/css/facebook.css";
import "../../assets/css/line.css";
//import "../../assets/css/messenger.css";

var copiedAlert = {
  place: "br",
  message: (
    <div>
      <div style={{ fontSize: "18px", color: "white" }}>
        copied to clipboard!
      </div>
    </div>
  ),
  type: "success",
  //icon : "fas fa-check",
  autoDismiss: 2,
};

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      product: {},
      isShare: false,
      showURL: false, //default is false
      product_share: [],
      reRender: false,
      ready_1: false,
      ready_2: false,
      copied: false,
    };

    this._isMounted = false;
    this._productId = 0;
    this._shopName = "";
    this._share_id =
      this.makeid(8) +
      new Date().getTime() +
      Math.floor(Math.random() * 1005101); //random value
    this._productURL = "";
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getValueFromProps();
    this._isMounted && this.getUser();
    this._isMounted && this.getProduct();
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log(this.state.reRender)
    if (this.state.reRender !== prevState.reRender) {
      console.log("componentDidUpdate");
      this._isMounted && this.getUser(); //check share status again
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getValueFromProps() {
    //console.log(this.props.match.params)
    if (this.props.match.params) {
      this._productId = this.props.match.params.id;
      this._shopName = this.props.match.params.shop;
    }
    //console.log(this._productId + this._shopName)
  }

  getProduct() {
    axios
      .get(process.env.REACT_APP_API_URL + "/product/" + this._productId)
      .then((res) => {
        //console.log(res.data);
        this._isMounted &&
          this.setState({
            product: res.data,
            ready_1: true,
          });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/errconnection");
      });
  }

  getUser() {
    auth.onAuthStateChanged((user) => {
      user
        ? this._isMounted &&
          this.setState({ currentUser: user }, () => {
            console.log("uid | " + this.state.currentUser.uid);
            this.gethareStatus();
          })
        : this._isMounted && this.setState({ currentUser: null });
    });
  }

  gethareStatus() {
    const { currentUser } = this.state;

    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/sharing/share_status/" +
          currentUser.uid
      )
      .then((res) => {
        //console.log(res.data);
        this._isMounted &&
          this.setState(
            {
              product_share: res.data,
              ready_2: true,
            },
            () => this.checkShareStatus()
          );
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/errconnection");
      });
  }

  checkShareStatus() {
    const { product_share } = this.state;
    console.log("do checkShareStatus");
    product_share &&
      product_share.forEach((share) => {
        console.log(this._productId + "===" + share.product_id);
        if (this._productId == share.product_id) {
          this.setState({ isShare: true, showURL: true }, () =>
            console.log("isShare Found")
          );
        }
      });
  }

  genURL() {
    const { product, currentUser } = this.state;
    this._productURL =
      product.product_URL +
      "/" +
      product.product_id +
      "/" +
      currentUser.uid +
      "/" +
      this._share_id;
    //console.log(this._productURL);
  }

  _shareFacebook() {
    const { isShare } = this.state;
    console.log("do _shareFacebook");

    if (!isShare) {
      this.postShareStatus();
    }
  }

  _shareLine() {
    const { isShare } = this.state;
    console.log("do _shareLine");

    if (!isShare) {
      this.postShareStatus();
    }
  }

  _shareURL() {
    const { isShare, showURL } = this.state;
    console.log("do _shareURL");
    this.setState({ showURL: !showURL });

    if (!isShare) {
      this.postShareStatus();
    }
  }

  postShareStatus() {
    const { currentUser, product } = this.state;

    console.log("do postShareStatus");

    let sharing = {
      user_id: currentUser.uid,
      share_id: this._share_id,
      share_date: new Date(),
      share_time: new Date(),
      share_status: "กำลังขาย",
      product_id: product.product_id,
      product_name: product.product_name,
      product_detail: product.product_detail,
      product_price: product.product_price,
      product_unit: product.product_unit,
      product_thumbnail: product.product_thumbnail,
      product_category: product.product_category,
      product_shop: product.product_shop,
      product_shopID: product.product_shopID,
      product_URL: product.product_URL,
    };
    //console.log(sharing)
    axios
      .post(process.env.REACT_APP_API_URL + "/sharing/new_share", sharing)
      .then((res) => {
        console.log("post success " + res.status);
        this.setState({ reRender: true });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  render() {
    const { product, showURL, isShare, ready_1, ready_2 } = this.state;
    this._isMounted && this.genURL();
    return ready_1 && ready_2 ? (
      <>
        <Header />
        <NotificationAlert ref="notify" />
        <div className="regular-th" style={{ backgroundColor: "#f5f5f5" }}>
          <br />
          <Container>
            <p className="light-th pl-4" style={{ fontSize: "14px" }}>
              <Link to="/" style={{ color: "black" }}>
                e-Salesman
              </Link>{" "}
              &nbsp;>&nbsp; {this._shopName} &nbsp;>&nbsp;{" "}
              {product.product_category} &nbsp;>&nbsp; {product.product_name}
            </p>
            <div
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "1px 1px 3px #d9d9d9",
              }}
            >
              <Row>
                <Col md="6">
                  <div
                    className="ml-4 mt-5"
                    style={{
                      width: "100%",
                      height: "400px",
                      backgroundColor: "#ffffff",
                      backgroundImage: "url(" + product.product_thumbnail + ")",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </Col>
                <Col md="6">
                  <div className="mt-4">
                    <h4>{product.product_name}</h4>
                    <p className="light-th">
                      | 0 {product.product_unit} ขายแล้ว
                    </p>
                    <p style={{ fontSize: "45px", color: "#d93731" }}>
                      {" "}
                      <b>฿{product.product_price}</b>
                    </p>
                    <br />
                    <Row>
                      <Col md="3">
                        <p className="light-th" style={{ fontSize: "13px" }}>
                          รายละเอียด
                        </p>
                      </Col>
                      <Col md="7">
                        <p style={{ fontSize: "15px" }}>
                          {product.product_detail}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <p className="light-th" style={{ fontSize: "13px" }}>
                          มีสินค้าทั้งหมด
                        </p>
                      </Col>
                      <Col md="7">
                        <p style={{ fontSize: "15px" }}>
                          {product.product_inventory} {product.product_unit}
                        </p>
                      </Col>
                    </Row>
                    <br />
                    {/* share status */}
                    <p style={{ fontSize: "13px" }}>
                      สถานะการแชร์ :
                      {isShare ? (
                        <span
                          style={{ fontSize: "15px" }}
                          className="text-danger"
                        >
                          {" "}
                          แชร์แล้ว
                        </span>
                      ) : (
                        <span style={{ fontSize: "15px" }}>
                          {" "}
                          ยังไม่มีการแชร์
                        </span>
                      )}
                    </p>
                    {/* facebook share button */}
                    <FacebookShareButton url={this._productURL}>
                      <div
                        id="fb-share-button"
                        className="text-center"
                        style={{ width: "205px" }}
                        onClick={() => this._shareFacebook()}
                      >
                        &nbsp;&nbsp;
                        <FacebookSVG />
                        <span> Share</span>&nbsp;&nbsp;
                      </div>
                    </FacebookShareButton>
                    &nbsp;&nbsp;&nbsp;
                    {/* messenger share button 

                    <div
                      id="ms-share-button"
                      className="text-center"
                      style={{ width: "135px" }}
                      onClick={() => this._shareMessenger()}
                    >
                      &nbsp;&nbsp;
                      <MessengerSVG />
                      <span> Message</span>&nbsp;&nbsp;
                    </div>
                    */}
                    {/* line share button */}
                    <LineShareButton url={this._productURL}>
                      <div
                        id="ln-share-button"
                        className="text-center"
                        style={{ width: "205px" }}
                        onClick={() => this._shareLine()}
                      >
                        &nbsp;&nbsp;
                        <LineSVG />
                        <span> LINE it!</span>&nbsp;&nbsp;
                      </div>
                    </LineShareButton>
                    {/* gen url button */}
                    <div style={{ width: "430px" }}>
                      <br />
                      {showURL ? (
                        <>
                          <Row>
                            <Col md="10" style={{ paddingRight: 0 }}>
                              <Input
                                className="light-th"
                                defaultValue={this._productURL}
                              />
                            </Col>
                            <Col
                              md="2"
                              className="text-right"
                              style={{ paddingLeft: 6 }}
                            >
                              <CopyToClipboard
                                onCopy={() => {
                                  this.setState({ copied: true });
                                  this.refs.notify.notificationAlert(
                                    copiedAlert
                                  );
                                }}
                                text={this._productURL}
                              >
                                <Button color="danger" block>
                                  <i className="far fa-copy"></i>
                                </Button>
                              </CopyToClipboard>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <>
                          {" "}
                          <Button
                            color="danger"
                            block
                            onClick={() => this._shareURL()}
                          >
                            ขอลิงค์สำหรับแชร์
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
              <br />
            </div>
          </Container>
          <br />
          <Container>
            <div
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "1px 1px 3px #d9d9d9",
              }}
            >
              <p className="pl-4 pt-3">คะแนนของสินค้า</p>
              <div className="px-4">
                <div
                  style={{
                    backgroundColor: "#fffbf8",
                    border: "2px solid #f9ede5",
                  }}
                >
                  <br />

                  <Row>
                    <Col md="3" style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "30px", color: "#d93731" }}>
                        0.0 เต็ม 5
                      </div>
                      <span style={{ fontSize: "25px", color: "#d93731" }}>
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                      </span>
                    </Col>
                    <Col md="9">
                      <p className="light-th" style={{ textAlign: "center" }}>
                        <br />
                        ยังไม่มีการรีวิว
                      </p>
                    </Col>
                  </Row>

                  <br />
                </div>

                <br />
                <hr />
                <p className="light-th" style={{ textAlign: "center" }}>
                  <br />
                  ยังไม่มีความคิดเห็น
                </p>
                <br />
                <br />
              </div>
            </div>
          </Container>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </>
    ) : (
      <>{/* skeleton from react-loading-skeleton */}</>
    );
  }
}

export default withRouter(ProductDetail)
