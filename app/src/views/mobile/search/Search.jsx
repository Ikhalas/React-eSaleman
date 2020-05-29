import React, { Component } from "react";
import Header from "../../../components/mobile/Header";
import Taps from "../../../components/mobile/Taps";

export default class Search extends Component {
  render() {
    return (
      <>
        <Header />
        <div style={{ marginTop: "60px" }}>Search</div>
        <Taps path="search" />
      </>
    );
  }
}
