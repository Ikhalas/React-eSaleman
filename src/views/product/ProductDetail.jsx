import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import '../../assets/css/facebook.css'

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      category: {},
    };

    this._isMounted = false;
    this._productId = 0;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getIdFromMatch();
    this._isMounted && this.getProduct();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getIdFromMatch() {
    //console.log(this.props.match.params.id)
    if (this.props.match.params.id)
      this._productId = this.props.match.params.id;
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
        this._isMounted && this.getProductCate();
      });
  }

  getProductCate() {
    const { product } = this.state;
    console.log(product);
    axios
      .get(process.env.REACT_APP_API_URL + "/category/" + product.category_id)
      .then((res) => {
        console.log(res.data);
        this._isMounted &&
          this.setState({
            category: res.data,
          });
      });
  }

  render() {
    const { product, category } = this.state;

    return product ? (
      <div className="regular-th" style={{ backgroundColor: "#f5f5f5" }}>
        <br />
        <Container>
          <p className="light-th pl-4" style={{ fontSize: "14px" }}>
            <Link to="/" style={{ color: "black" }}>
              e-Salesman
            </Link>{" "}
            &nbsp;>&nbsp; {category.category_name} &nbsp;>&nbsp;{" "}
            {product.product_name}
          </p>
        </Container>

        <Container>
          <div style={{ backgroundColor: "#ffffff" }}>
            <Row>
              <Col md="6">
                <div
                  className="ml-4 mt-5"
                  style={{
                    width: "100%",
                    height: "400px",
                    backgroundColor: "#ffffff",
                    backgroundImage: "url(" + product.product_image + ")",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
              </Col>
              <Col md="6">
                <div className="mt-4">
                  <h4>{product.product_name}</h4>
                  <p className="light-th">| 0 {product.product_unit} ขายแล้ว</p>
                  <p style={{ fontSize: "40px", color: "#d93731" }}>
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
                  <div id="fb-share-button">&nbsp;&nbsp;
                    <svg
                      viewBox="0 0 12 12"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        className="svg-icon-path"
                        d="M9.1,0.1V2H8C7.6,2,7.3,2.1,7.1,2.3C7,2.4,6.9,2.7,6.9,3v1.4H9L8.8,6.5H6.9V12H4.7V6.5H2.9V4.4h1.8V2.8 c0-0.9,0.3-1.6,0.7-2.1C6,0.2,6.6,0,7.5,0C8.2,0,8.7,0,9.1,0.1z"
                      ></path>
                    </svg>
                    <span>Share</span>&nbsp;&nbsp;
                  </div>
                </div>
              </Col>
            </Row>
            <br />
          </div>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div id="1">eiei</div>
      </div>
    ) : (
      <>{/* skeleton from react-loading-skeleton */}</>
    );
  }
}
