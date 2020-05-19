import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import { Container } from "reactstrap";

import ProductList from "./ProductList";


export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedShop: null,
      shopOptions: "",
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getAllShop()
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
      .catch((err) => console.log(err));
  }

  handleShopChange = (selectedShop) => {
    this.setState({ selectedShop }, () => console.log(selectedShop));
  };

  render() {
    const { selectedShop, shopOptions } = this.state;
    return (
      <>
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
                options={shopOptions}
              />
            </Container>
            <hr />

            {selectedShop && <ProductList shop={selectedShop} />}
          </div>
        </div>
      </>
    );
  }
}
