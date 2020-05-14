import React, { Component } from "react";
//import axios from "axios";
//import { Link } from "react-router-dom";
import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,

} from "reactstrap";

import ProductSelling from "./ProductSelling";
import ProductSold from "./ProductSold";

export default class UserProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleTabs = (tab) => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <>
        <Container style={{height:'1500px'}}>
          <div style={{ backgroundColor: "#ffffff" }}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  style={
                    activeTab === "1"
                      ? { borderBottom: "4px solid #d93731", cursor: "pointer" }
                      : { cursor: "pointer" }
                  }
                  onClick={() => {
                    this.toggleTabs("1");
                  }}
                >
                  <div
                    className="py-2"
                    style={{
                      width: "200px",
                      textAlign: "center",
                      color: "#d93731",
                    }}
                  >
                    สินค้าที่กำลังขาย
                  </div>
                </NavLink>
              </NavItem>
              &nbsp;&nbsp;
              <NavItem>
                <NavLink
                  style={
                    activeTab === "2"
                      ? { borderBottom: "4px solid #d93731", cursor: "pointer" }
                      : { cursor: "pointer" }
                  }
                  onClick={() => {
                    this.toggleTabs("2");
                  }}
                >
                  <div
                    className="py-2"
                    style={{
                      width: "200px",
                      textAlign: "center",
                      color: "#d93731",
                    }}
                  >
                    สินค้าที่ขายแล้ว
                  </div>
                </NavLink>
              </NavItem>
            </Nav>
          </div>

          <div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">

                <ProductSelling />

              </TabPane>

              <TabPane tabId="2">

                <ProductSold />

              </TabPane>
            </TabContent>
          </div>
        </Container>
      </>
    );
  }
}
