import React, { Component } from "react";
import Header from "../../../components/mobile/Header";
import Taps from "../../../components/mobile/Taps";

export default class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <div style={{ marginTop: "60px" }}>Profile</div>
        <Taps path="profile" />
      </>
    );
  }
}