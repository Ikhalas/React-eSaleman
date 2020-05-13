import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom" 
import { Container } from "reactstrap";

import "../../../assets/css/base.css";
import "../../../assets/css/photo-grid.css";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
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

  getProduct() { //
    axios.get(process.env.REACT_APP_API_URL + "/product/all").then((res) => {
      //console.log(res.data);
      this._isMounted &&
        this.setState({
          products: res.data,
        });
    });
  }

  genProductCard() {
    const { products } = this.state;
    return (
      products &&
      products.map((product) => {
        return (
          <>
            <Link>
            <div
              className="card-product"
              style={{
                backgroundImage: "url(" + product.product_image + ")",
              }}
            ></div>
            
          </Link>
          </>
        );
      })
    );
  }

  render() {
    return (
      <>
        <Container>
          <div
          className="mb-2"
            style={{ height: "50px", backgroundColor: "#ffffff" }}
          >
            <h6 className="pt-3 pb-2 pl-3">สินค้าแนะนำวันนี้</h6>
          </div>
          
          <div className="photo-grid">{this.genProductCard()}</div>
        </Container>
      </>
    );
  }
}
