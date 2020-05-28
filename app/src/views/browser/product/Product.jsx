import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Header from "../../../components/Header";
import { Container } from "reactstrap";
import ProductList from "./ProductList";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedShop: null,
      shopOptions: "",
    };

    this._isMounted = false;
  }

  componentDidMount() {
    //console.log(this.props.match);
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
        this._isMounted && this.setState({ shopOptions: res.data }, ()=> this.setState({selectedShop : this.state.shopOptions[0]}));
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/errconnection");
      });
  }

  handleShopChange = (selectedShop) => {
    this.setState({ selectedShop });
  };

  render() {
    const { selectedShop, shopOptions } = this.state;
    return (
      <>
        <Header />
        <div
          className="regular-th"
          style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
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
            
            {selectedShop && <ProductList shop={selectedShop} />}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Product)
