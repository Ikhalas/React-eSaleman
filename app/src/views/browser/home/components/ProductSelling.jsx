import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Card, CardTitle, CardText, Row, Col, Input, Button } from "reactstrap";
import { FacebookShareButton, LineShareButton } from "react-share";
import NotificationAlert from "react-notification-alert";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { ReactComponent as LineSVG } from "../../../../assets/icon/line.svg";
import { ReactComponent as FacebookSVG } from "../../../../assets/icon/facebook.svg";
//import { ReactComponent as MessengerSVG } from "../../assets/icon/messenger.svg";

import "../../../../assets/css/facebook.css";
import "../../../../assets/css/line.css";

var copiedAlert = {
  place: "br",
  message: (
    <div style={{ fontSize: "18px", color: "gray" }}>copied to clipboard</div>
  ),
  type: "success",
  //icon : "fas fa-check",
  autoDismiss: 2,
};

class Product_Selling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productSelling: {},
      ready: false,
    };

    this._isMounted = false;
  }

  componentDidMount() {
    //console.log(this.props.match);
    this._isMounted = true;
    this._isMounted && this.getProduct();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getProduct() {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/sharing/share_selling/" +
          this.props.userid
      )
      .then((res) => {
        //console.log(res.data);
        this._isMounted &&
          this.setState({
            productSelling: res.data,
            ready: true,
          });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/errconnection");
      });
  }

  genProductCard() {
    const { productSelling } = this.state;

    return (
      productSelling &&
      productSelling.map((prod) => (
        <Card body className="mt-2" key={prod.id} style={{ cursor: "pointer" }}>
          <Row>
            <Col md="3">
              <div
                style={{
                  height: "210px",
                  backgroundColor: "#fff",
                  backgroundImage: "url(" + prod.product_thumbnail + ")",
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </Col>
            <Col md="9">
              {" "}
              <CardTitle>
                <h4>{prod.product_name}</h4>
              </CardTitle>
              <CardText>
                <span className="light-th" style={{ fontSize: "13px" }}>
                  {this.convertDate(prod.share_date)} : {prod.share_time} น.
                </span>
                <hr />
                <p className="light-th" style={{ fontSize: "15px" }}>
                  แชร์อีกครั้ง
                </p>
                <Row>
                  <Col md="1">
                    {" "}
                    <FacebookShareButton url={prod.share_url}>
                      <div
                        id="fb-share-button"
                        className="text-center"
                        style={{ width: "40px" }}
                      >
                        <FacebookSVG />
                      </div>
                    </FacebookShareButton>
                  </Col>
                  <Col md="1">
                    {" "}
                    <LineShareButton url={prod.share_url}>
                      <div id="ln-share-button" className="text-center">
                        <LineSVG />
                      </div>
                    </LineShareButton>
                  </Col>
                  <Col md="9" style={{ paddingRight: 1 }}>
                    {" "}
                    <Input className="light-th" defaultValue={prod.share_url} />
                  </Col>
                  <Col md="1" className="text-right" style={{ paddingLeft: 2 }}>
                    <CopyToClipboard
                      onCopy={() => {
                        this.setState({ copied: true });
                        this.refs.notify.notificationAlert(copiedAlert);
                      }}
                      text={prod.share_url}
                    >
                      <Button color="danger" block>
                        <i className="far fa-copy"></i>
                      </Button>
                    </CopyToClipboard>
                  </Col>
                </Row>
                &nbsp;&nbsp;
              </CardText>
            </Col>
          </Row>
        </Card>
      ))
    );
  }

  convertDate(date) {
    let month = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    //console.log(month[new Date(date.seconds * 1000).getMonth() + 1]);
    if (date) {
      return (
        <>
          {" "}
          {new Date(date).getDate() +
            " " +
            month[new Date(date).getMonth()] +
            " " +
            (new Date(date).getFullYear() + 543)}
        </>
      );
    } else {
      return <></>;
    }
  }

  render() {
    const { ready, productSelling } = this.state;
    return ready ? (
      <div>
        <NotificationAlert ref="notify" />
        <Row>
          <Col md="12">
            {productSelling.length ? (
              <>
                {this.genProductCard()}
                <br />
              </>
            ) : (
              <>
                <div
                  className="light-th text-danger"
                  style={{ textAlign: "center", fontSize: "20px" }}
                >
                  <br /> <br />
                  ยังไม่มีรายการ
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
    ) : (
      <></>
    );
  }
}

export default withRouter(Product_Selling);
