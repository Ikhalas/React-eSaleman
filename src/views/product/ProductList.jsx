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
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getProduct();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getProduct() {
    axios.get(process.env.REACT_APP_API_URL + "/product/all").then((res) => {
      console.log(res.data);
      this._isMounted &&
        this.setState({
          products: res.data,
        });
    });
  }

  goToDetail = (product_id) =>  {
    this.props.history.push("/productdetail/" + product_id);
  };

  genProducts = () => {
    const { products } = this.state;
    return (
      products &&
      products.map((product) => {
        return (
          <Col md="3">
            <Card
              className="mb-3"
              key={product.product_id}
              onClick={() => this.goToDetail(product.product_id)}
            >
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  backgroundImage: "url(" + product.product_image + ")",
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
      <div>
        <Container>
          <Row>{this.genProducts()}</Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(ProductList)
