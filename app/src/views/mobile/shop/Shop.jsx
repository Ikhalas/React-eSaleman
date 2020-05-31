import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import Header from "../../../components/mobile/Header";
import Taps from "../../../components/mobile/Taps";

import "../../../assets/css/shop.css";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopOptions: "",
      selectedShop: "",
      products: "",
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getAllShop();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getAllShop() {
    axios
      .get(process.env.REACT_APP_API_URL + "/shop")
      .then((res) => {
        this._isMounted && this.setState({ shopOptions: res.data });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/errconnection");
      });
  }

  getProduct(shop_id) {
    axios
      .get(process.env.REACT_APP_API_URL + "/product/shop/" + shop_id)
      .then((res) => {
        this._isMounted && this.setState({ products: res.data });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/errconnection");
      });
  }

  genShopList() {
    const { shopOptions } = this.state;
    return (
      shopOptions &&
      shopOptions.map((shop, key) => {
        return (
          <ListGroupItem
            tag="a"
            href="#"
            action
            key={key}
            onClick={() => {
              this.setState({ selectedShop: shop }, () =>
                this.getProduct(shop.shop_id)
              );
            }}
          >
            <span style={{ fontSize: "13px" }}>{shop.label}</span>
          </ListGroupItem>
        );
      })
    );
  }

  goToDetail = (product_id) => {
    const { selectedShop } = this.state;
    this.props.history.push(
      `/productdetail/${selectedShop.label}/${selectedShop.shop_id}/${product_id}`
    );
  };

  genProductList() {
    const { products } = this.state;
    return (
      products &&
      products.map((product, key) => {
        return (
          <Col
            xs="6"
            style={{ paddingLeft: "2px", paddingRight: "2px" }}
            key={key}
          >
            <Card
              style={{ cursor: "pointer" }}
              className="mb-1"
              onClick={() => this.goToDetail(product.product_id)}
            >
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  backgroundImage: "url(" + product.product_thumbnail + ")",
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "#fff",
                }}
              ></div>

              <CardBody style={{ padding: 0, textAlign: "center" }}>
                <CardTitle style={{ fontSize: "15px" }}>
                  {product.product_name}
                </CardTitle>
                <CardSubtitle
                  className="mb-1"
                  style={{ color: "#d93731", fontSize: "10px" }}
                >
                  <b>
                    {product.product_price} บาท/{product.product_unit}
                  </b>
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        );
      })
    );
  }

  render() {
    const { selectedShop, products } = this.state;
    return (
      <>
        <Header />

        <div className="regular-th" style={{ marginTop: "55px" }}>
          <Row style={{ paddingTop: 0 }}>
            <Col xs="4" className="side-nav">
              <h5 className="mt-2 ml-2">ร้านค้า</h5>
              <ListGroup>{this.genShopList()}</ListGroup>
            </Col>
            <Col xs="8" className="content-wrapper">
              {products && (
                <>
                  {" "}
                  <div
                    className="pt-3"
                    style={{
                      backgroundColor: "#d93731",
                      height: "60px",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    {" "}
                    <h5>{selectedShop.label}</h5>
                  </div>
                  <Row>
                    <>{this.genProductList()}</>
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </div>
        <Taps path="shop" />
      </>
    );
  }
}

export default withRouter(Shop);
