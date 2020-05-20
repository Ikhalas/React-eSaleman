import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
    };

    this._isMounted = false;
    //this._selectedShop = this.props.shop.shop_id;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getProduct();
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log(this.props.shop.shop_id + " | " + prevProps.shop.shop_id)
    if (this.props.shop.shop_id !== prevProps.shop.shop_id) {
      //console.log("componentDidUpdate")
      this._isMounted && this.getProduct();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getProduct() {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/product/shop/" +
          this.props.shop.shop_id
      )
      .then((res) => {
        //console.log(res.data);
        this._isMounted &&
          this.setState({
            products: res.data,
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  goToDetail = (product_id) => {
    this.props.history.push(
      "/productdetail/" + this.props.shop.label + "/" + product_id
    );
  };

  genProducts = () => {
    const { products } = this.state;
    return (
      products &&
      products.map((product) => {
        return (
          <Col md="3" key={product.product_id}>
            <Card
              style={{ cursor: "pointer" }}
              className="mb-3"
              onClick={() => this.goToDetail(product.product_id)}
            >
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  backgroundImage: "url(" + product.product_thumbnail + ")",
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "#fff",
                }}
              ></div>

              <CardBody>
                <CardTitle>{product.product_name}</CardTitle>
                <CardSubtitle style={{ color: "#d93731" }}>
                  <b>
                    - {product.product_price} บาท / {product.product_unit}
                  </b>
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        );
      })
    );
  };

  render() {
    return (
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <Container>
          <Row>{this.genProducts()}</Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(ProductList);
