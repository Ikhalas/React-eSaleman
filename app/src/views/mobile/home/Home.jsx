import React, { Component } from "react";
import Header from "../../../components/mobile/Header";
import Taps from "../../../components/mobile/Taps";

export default class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div style={{ marginTop: "60px" }}>Home</div>
        <Taps path="home" />
      </>
    );
  }
}
