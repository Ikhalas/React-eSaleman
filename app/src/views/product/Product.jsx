import React, { Component } from "react";

import Select from "react-select";
//import axios from "axios";
import { Container } from "reactstrap";

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
    this.setState({ selectedShop }, () => console.log(selectedShop));
  };


  render() {
    const { selectedShop } = this.state;
    return (
      <div
        className="regular-th"
        style={{ backgroundColor: "#f5f5f5", height: "1500px" }}
      >
        <div style={{ backgroundColor: "#ffffff" }}>
          <Container fluid={true} style={{ width: "60%" }}>
            <br />

            <h5>เลือกร้านที่คุณต้องการ.....</h5>

            <Select
              value={selectedShop}
              onChange={this.handleShopChange}
              options={options}
            />
          </Container>
          <hr />

          {selectedShop && <ProductList shop={selectedShop} />}
        </div>
      </div>
    );
  }
}
