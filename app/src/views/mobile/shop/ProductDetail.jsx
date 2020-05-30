import React, { Component } from "react";
import { auth } from "../../../assets/api/firebase";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Row, Col, Button, Input } from "reactstrap";
import { FacebookShareButton, LineShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NotificationAlert from "react-notification-alert";

import { ReactComponent as LineSVG } from "../../../assets/icon/line.svg";
import { ReactComponent as FacebookSVG } from "../../../assets/icon/facebook.svg";

import "../../../assets/css/facebook.css";
import "../../../assets/css/line.css";

var copiedAlert = {
  place: "bc",
  message: (
    <div style={{ fontSize: "15px", color: "gray" }}>copied to clipboard</div>
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
      showURL: false, //default is false
      product_share: [],
      reRender: false,
      ready: false,
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
      this._isMounted && this.getUser(); //check share status again
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getValueFromProps() {
    if (this.props.match.params) {
      this._productId = this.props.match.params.id;
      this._shopName = this.props.match.params.shopname;
      this._shopId = this.props.match.params.shopid;
    }
  }

  getProduct() {
    //console.log(`${process.env.REACT_APP_API_URL}/product/${this._shopName}/${this._productId}`)
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/product/getbyid/${this._shopId}/${this._productId}`
      )
      .then((res) => {
        //console.log(res.data);
        this._isMounted &&
          this.setState({
            product: res.data,
            ready: true,
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
        ? this._isMounted && this.setState({ currentUser: user })
        : this._isMounted && this.setState({ currentUser: null });
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

  _socialMediaShare() {
    this.postShareStatus();
  }

  _shareURL() {
    this.setState({ showURL: true });
    this.postShareStatus();
  }

  postShareStatus() {
    const { currentUser, product } = this.state;
    //console.log("do postShareStatus");
    let sharing = {
      user_id: currentUser.uid,
      share_id: this._share_id,
      share_date: new Date(),
      share_time: new Date(),
      share_status: "กำลังขาย",
      share_url: this._productURL,
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
        //console.log("post success " + res.status);
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
    const { product, showURL, ready } = this.state;
    this._isMounted && this.genURL();
    return ready ? (
      <div className="regular-th">
        <NotificationAlert ref="notify" />
        <div style={{ height: "40px" }}>
          <i
            className="ml-2 mt-2 fas fa-arrow-circle-left"
            style={{ fontSize: "30px", color: "rgb(0, 0, 0, 0.5)" }}
            onClick={() => this.props.history.goBack()}
          />
        </div>
        <div
          //className="ml-4 mt-5"
          style={{
            width: "100%",
            height: "350px",
            backgroundColor: "#ffffff",
            backgroundImage: "url(" + product.product_thumbnail + ")",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <hr />

        <div className="mx-3">
          <h4>{product.product_name}</h4>

          <p style={{ fontSize: "30px", color: "#d93731" }}>
            {" "}
            <b>฿{product.product_price}</b>
          </p>
          <span style={{ fontSize: "15px", color: "#d93731" }}>
            <i className="far fa-star mr-1" />
            <i className="far fa-star mr-1" />
            <i className="far fa-star mr-1" />
            <i className="far fa-star mr-1" />
            <i className="far fa-star" />
          </span>
          <span className="light-th ml-2" style={{ fontSize: "13px" }}>
            {" "}
            |&nbsp; 0 {product.product_unit} ขายแล้ว
          </span>
        </div>

        <div
          className="mt-3"
          style={{ backgroundColor: "#eff0f5", height: "8px" }}
        />

        <div className="mx-3">
          <p className="light-th mt-3" style={{ fontSize: "13px" }}>
            รายละเอียด
          </p>
          <p style={{ fontSize: "15px" }}>{product.product_detail}</p>
        </div>

        <div
          className="mt-3"
          style={{ backgroundColor: "#eff0f5", height: "8px" }}
        />

        <div className="mx-3 mt-3">
          <Row style={{paddingBottom : 10}}>
            <Col xs="6" style={{ textAlign: "start" }}>
              {" "}
              <FacebookShareButton url={this._productURL}>
                <div
                  id="fb-share-button"
                  className="text-center"
                  style={{ width: "160px" }}
                  onClick={() => this._socialMediaShare()}
                >
                  <FacebookSVG />
                  <span> Share</span>
                </div>
              </FacebookShareButton>
            </Col>
            <Col xs="6" style={{ textAlign: "end" }}>
              {" "}
              <LineShareButton url={this._productURL}>
                <div
                  id="ln-share-button"
                  className="text-center"
                  style={{ width: "160px" }}
                  onClick={() => this._socialMediaShare()}
                >
                  <LineSVG />
                  <span> LINE it!</span>
                </div>
              </LineShareButton>
            </Col>
          </Row>

        
              <div>
              
                {showURL ? (
                  <>
                    <Row>
                      <Col xs="10" style={{ paddingRight: 2 }}>
                        <Input
                          className="light-th"
                          defaultValue={this._productURL}
                        />
                      </Col>
                      <Col
                        xs="2"
                        style={{ paddingLeft: 2 }}
                      >
                        <CopyToClipboard
                          onCopy={() => {
                            this.setState({ copied: true });
                            this.refs.notify.notificationAlert(copiedAlert);
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
        <br />
      </div>
    ) : (
      <></>
    );
  }
}

export default withRouter(ProductDetail);
