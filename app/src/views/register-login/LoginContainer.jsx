import React, { Component } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavbarText,
  Col,
  Row,
  CardBody,
} from "reactstrap";


import { fire,auth } from "../../assets/api/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Login from "./Login";
import Register from "./Register";


export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: true, //true = Login : false = Register
      isSignedIn: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }

   // Make sure we un-register Firebase observers when the component unmounts.
   componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  

  togglePage = () => {
    this.setState({
      page: !this.state.page,
    });
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    signInOptions: [
      fire.auth.FacebookAuthProvider.PROVIDER_ID,
      fire.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult : () => false,
    },
  };

  render() {
    const { page } = this.state;
    return (
      <div className="regular-th">
        <Container>
          <Navbar light expand="md" style={{ height: "100px" }}>
            <NavbarBrand href="/">
              <img
                src={require("../../assets/images/logo_2.png")}
                alt="logo"
                width="65%"
              />
            </NavbarBrand>
            <Nav className="mr-auto" navbar></Nav>
            <NavbarText>
              <h5>{page ? <>เข้าสู่ระบบ</> : <>สมัครใหม่</>}</h5>
            </NavbarText>
          </Navbar>
        </Container>

        <div
          style={{
            width: "100%",
            height: "650px",
            backgroundColor: "#d93731",
          }}
        >
          <Row>
            <Col md="6"></Col>
            <Col md="6">
              <div
                className="py-3"
                style={{
                  width: "500px",
                  marginTop: "40px",
                  backgroundColor: "#ffffff",
                  borderRadius: "30px",
                }}
              >
                <CardBody>
                  {page ? (
                    <Login togglePage={this.togglePage} />
                  ) : (
                    <Register togglePage={this.togglePage} />
                  )}

                  <Row>
                    <Col md="5">
                      <hr />
                    </Col>
                    <Col md="2" style={{ textAlign: "center", color: "gray" }}>
                      หรือ
                    </Col>
                    <Col md="5">
                      <hr />
                    </Col>
                  </Row>
                  <div style={{ width: "100%" }}>
                    <StyledFirebaseAuth
                      uiConfig={this.uiConfig}
                      firebaseAuth={auth}
                    />
                  </div>
                </CardBody>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
