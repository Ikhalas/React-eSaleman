import React, { Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import { auth } from "../../../assets/api/firebase";

import Header from "../../../components/mobile/Header";
import Taps from "../../../components/mobile/Taps";
import SellingScreen from "./SellingScreen";
import SoldScreen from "./SoldScreen"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      currentUser: null,
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getUser();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getUser() {
    auth.onAuthStateChanged((user) => {
      user
        ? this._isMounted && this.setState({ currentUser: user })
        : this._isMounted && this.setState({ currentUser: null });
    });
  }

  toggleTabs = (tab) => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab, currentUser } = this.state;
    return currentUser ? (
      <>
        <Header />

        <div
          className="regular-th"
          style={{ marginTop: "60px" }}
        >
          <div style={{ backgroundColor: "#ffffff" }}>
            <Nav tabs>
              <NavItem style={{ width: "50%" }}>
                <NavLink
                  style={
                    activeTab === "1"
                      ? {
                          borderBottom: "4px solid #d93731",
                          cursor: "pointer",
                        }
                      : { cursor: "pointer" }
                  }
                  onClick={() => {
                    this.toggleTabs("1");
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      color: "#d93731",
                    }}
                  >
                    สินค้าที่กำลังขาย
                  </div>
                </NavLink>
              </NavItem>

              <NavItem style={{ width: "50%" }}>
                <NavLink
                  style={
                    activeTab === "2"
                      ? {
                          borderBottom: "4px solid #d93731",
                          cursor: "pointer",
                        }
                      : { cursor: "pointer" }
                  }
                  onClick={() => {
                    this.toggleTabs("2");
                  }}
                >
                  <div
                    style={{
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
                <SellingScreen userid={currentUser.uid} />
              </TabPane>

              <TabPane tabId="2">
                <SoldScreen userid={currentUser.uid} />
              </TabPane>
            </TabContent>
          </div>
        </div>

        <Taps path="home" />
      </>
    ) : null;
  }
}
