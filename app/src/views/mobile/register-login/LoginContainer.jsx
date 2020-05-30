import React, { Component } from "react";
import {Row , Col} from "reactstrap"
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Header from "../../../components/mobile/Header";

export default class LoginContainer extends Component {
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  render() {
    return (
      <div className="regular-th">
        <Header />
        <div style={{ marginTop: "60px" }}>
          <div className="pt-5" style={{ textAlign: "center" }}>
            <img width="100%" src={require("../../../assets/images/logo_2.png")} />
          </div>
        </div>{" "}
        <br /><br /><br />
        <Row className="pt-5">
          <Col xs="4">
            <hr />
          </Col>
          <Col xs="4" style={{ textAlign: "center", color: "gray" }}>
            เข้าสู่ระบบ
          </Col>
          <Col xs="4">
            <hr />
          </Col>
        </Row>
        <div className="pt-3" style={{ width: "100%" }}>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    );
  }
}
