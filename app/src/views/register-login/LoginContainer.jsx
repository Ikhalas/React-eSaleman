import React, { Component } from "react";
import { Container, Navbar, NavbarBrand, Nav, NavbarText } from "reactstrap";

import Login from "./Login";
import Register from "./Register";

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: true, //true = Login : false = Register
    };
  }

  togglePage = () => {
    this.setState({
      page: !this.state.page,
    });
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

        {page ? <Login togglePage={this.togglePage} /> : <Register togglePage={this.togglePage} />}
      </div>
    );
  }
}
