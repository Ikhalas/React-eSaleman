import React, { Component } from "react";
import {
  Container,
  NavbarText,
  InputGroup,
  Input,
  Navbar,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import Header from "../../../components/mobile/Header";
import Taps from "../../../components/mobile/Taps";

export default class Search extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="regular-th" style={{ marginTop: "55px" }}>
          <Navbar
            light
            expand="md"
            style={{ backgroundColor: "#d93731", padding: 0 }}
          >
            <Container>
              <NavbarText style={{ width: "600px" }}>
                <InputGroup>
                  <Input
                    placeholder="ค้นหาสินค้าที่คุณต้องการ"
                    style={{ fontSize: "13px" }}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText style={{ backgroundColor: "#fff" }}>
                      <i
                        className="fas fa-search"
                        style={{ color: "#d93731" }}
                      ></i>
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </NavbarText>
            </Container>
          </Navbar>

          <div style={{ textAlign: "center", opacity : '0.3' }}>
            <br /><br /><br /><br /><br /><br />
            <i className="fas fa-search" style={{ color: "#000", fontSize : '65px' }}></i>
            <p>ค้นหา...</p>
          </div>
        </div>

        <Taps path="search" />
      </>
    );
  }
}
