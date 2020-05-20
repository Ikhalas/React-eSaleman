import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Input } from "reactstrap";

import { ReactComponent as LineSVG } from "../../assets/icon/line.svg";
import { ReactComponent as FacebookSVG } from "../../assets/icon/facebook.svg";
import { ReactComponent as MessengerSVG } from "../../assets/icon/messenger.svg";

import "../../assets/css/facebook.css";
import "../../assets/css/messenger.css";
import "../../assets/css/line.css";

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      category: {},
      showURL: false, //default is false
    };

    this._isMounted = false;
    this._productId = 0;
    this._shopName = "";
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getValueFromProps();
    this._isMounted && this.getProduct();
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
          });
      });
  }

  render() {
    const { product, showURL } = this.state;

    return product ? (
      <>
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
                    {/* facebook share button */}
                    <div
                      id="fb-share-button"
                      className="text-center"
                      style={{ width: "135px" }}
                    >
                      &nbsp;&nbsp;
                      <FacebookSVG />
                      <span> Share</span>&nbsp;&nbsp;
                    </div>
                    &nbsp;&nbsp;
                    {/* messenger share button */}
                    <div
                      id="ms-share-button"
                      className="text-center"
                      style={{ width: "135px" }}
                    >
                      &nbsp;&nbsp;
                      <MessengerSVG />
                      <span> Message</span>&nbsp;&nbsp;
                    </div>
                    &nbsp;&nbsp;
                    {/* line share button */}
                    <div
                      id="ln-share-button"
                      className="text-center"
                      style={{ width: "135px" }}
                    >
                      &nbsp;&nbsp;
                      <LineSVG />
                      <span> LINE it!</span>&nbsp;&nbsp;
                    </div>
                    {/* gen url button */}
                    <div style={{ width: "430px" }}>
                      <br />
                      {showURL ? (
                        <>
                          <Row>
                            <Col md="10" style={{ paddingRight: 0 }}>
                              <Input
                                className="light-th"
                                defaultValue="URL from eOnlineShop....."
                              />
                            </Col>
                            <Col
                              md="2"
                              className="text-right"
                              style={{ paddingLeft: 6 }}
                            >
                              <Button color="danger" block>
                                <i className="far fa-copy"></i>
                              </Button>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <>
                          {" "}
                          <Button
                            color="danger"
                            block
                            onClick={() => this.setState({ showURL: !showURL })}
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
