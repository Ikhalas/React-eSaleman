import React, { Component } from "react";
import { Container, Navbar, Nav, NavbarText } from "reactstrap";

export default class Header extends Component {
  render() {
    return (
      <>
        <Navbar
          light
          expand="md"
          style={{ height: "40px", backgroundColor: "#f9f9f9" }}
        >
          <Container>
            <Nav className="mr-auto" navbar></Nav>
            <NavbarText>
              <a href="/#">Register</a>
              &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="/#">Login</a>
            </NavbarText>
          </Container>
        </Navbar>

        <Navbar light expand="md" style={{ height: "120px" }}>
          <Container>
            <Nav className="mr-auto" navbar>
              <span style={{ fontSize: "50px" }}>Logo</span>
            </Nav>
            <NavbarText></NavbarText>
          </Container>
        </Navbar>

        <Navbar
          light
          expand="md"
          style={{ height: "80px", backgroundColor: "#d93731" }}
        >
          <Container>
            <Nav className="mr-auto" navbar></Nav>
            <NavbarText></NavbarText>
          </Container>
        </Navbar>
      </>
    );
  }
}
