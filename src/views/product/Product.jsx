import React, { Component } from "react";

import Select from "react-select";
//import axios from "axios";
import { Container, Row, Col } from "reactstrap";

import ProductList from "./ProductList";

/* ---------- data mock ---------- */
const options = [
  { value: "ของฝาก.com", label: "ของฝาก.com" },
  { value: "ของกลาง.com", label: "ของกลาง.com" },
  { value: "ของโจร.com", label: "ของโจร.com" },
];
/* ------------------------------- */

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedShop: null,
      showList: false,
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleShopChange = (selectedShop) => {
    this.setState({ selectedShop }, ()=> console.log(selectedShop));
  };

  handleSearch = () => {
    const { selectedShop } = this.state;
    if (selectedShop) {
      this.setState({ showList: true });
    }
    else {
        console.log("pleace select shop")
    }
  };

  render() {
    const { selectedShop, showList } = this.state;
    return (
      
      <div
        className="regular-th"
        style={{ backgroundColor: "#f5f5f5", height: "1500px" }}
      >
        <div style={{ backgroundColor: "#ffffff" }}>
          <Container fluid={true} style={{ width: "60%" }}>
            <br />

            <h5>เลือกร้านที่คุณต้องการ.....</h5>

            <Row>
              <Col md="10">
              
                <Select
                  value={selectedShop}
                  onChange={this.handleShopChange}
                  options={options}
                />
              
              </Col>
              <Col md="2">
                <button
                  style={{ borderColor: "#f5f5f5" }}
                  onClick={this.handleSearch}
                >
                  <span style={{ fontSize: "21px" }}>
                    {" "}
                    <i
                      className="fas fa-search"
                      style={{ color: "#d93731" }}
                    ></i>{" "}
                    <span style={{ fontSize: "20px" }}>ค้นหา</span>
                  </span>
                </button>
              </Col>
            </Row>
          </Container>
          <hr />
          <br />
          {showList && <ProductList shop={selectedShop} />}
          
        </div>
      </div>
      
    );
  }
}
