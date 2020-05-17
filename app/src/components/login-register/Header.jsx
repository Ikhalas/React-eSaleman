import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavbarText } from "reactstrap";

export default class Header extends Component {
  render() {
    return (
      <>
        <Navbar light expand="md" style={{height:'100px'}}>
          <NavbarBrand href="/">
            <img src="/" alt="e-Saleman Logo" />
          </NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <h2> {this.props.title}</h2>
            </NavItem>
          </Nav>
          <NavbarText>Some Text</NavbarText>
        </Navbar>
      </>
    );
  }
}
