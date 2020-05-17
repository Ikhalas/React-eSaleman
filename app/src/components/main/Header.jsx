import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavbarText,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

import logo from "../../assets/images/logo_1.png";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_icon: "far fa-list-alt",
      list_text: false,
      join_icon: "far fa-handshake",
      join_text: false,
      about_icon: "far fa-address-card",
      about_text: false,
      login_text: false,
      loginModal: false,
    };
  }

  componentDidMount() {
    //console.log('componentDidMount')
  }

  listOnMouseEnter = () => {
    this.setState({
      list_icon: "fas fa-list-alt",
      list_text: true,
    });
  };

  listOnMouseLeave = () => {
    this.setState({
      list_icon: "far fa-list-alt",
      list_text: false,
    });
  };

  joinOnMouseEnter = () => {
    this.setState({
      join_icon: "fas fa-handshake",
      join_text: true,
    });
  };

  joinOnMouseLeave = () => {
    this.setState({
      join_icon: "far fa-handshake",
      join_text: false,
    });
  };

  aboutOnMouseEnter = () => {
    this.setState({
      about_icon: "fas fa-address-card",
      about_text: true,
    });
  };

  aboutOnMouseLeave = () => {
    this.setState({
      about_icon: "far fa-address-card",
      about_text: false,
    });
  };

  loginOnMouseEnter = () => {
    this.setState({
      login_text: true,
    });
  };

  loginOnMouseLeave = () => {
    this.setState({
      login_text: false,
    });
  };

  toggleLoginModal = () => {
    this.setState({ loginModal: !this.state.loginModal });
  };

  render() {
    const {
      list_icon,
      list_text,
      join_icon,
      join_text,
      about_icon,
      about_text,
      login_text,
    } = this.state;
    return (
      <div className="regular-th">
        <Navbar
          light
          expand="md"
          style={{
            height: "30px",
            backgroundColor: "#f9f9f9",
            boxShadow: "1px 1px 3px #d9d9d9",
          }}
        >
          <Container>
            <Nav className="mr-auto" navbar></Nav>
            <NavbarText>
              <Link to="/" style={{ fontSize: "12px" }}>
                Register
              </Link>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link to="/" style={{ fontSize: "12px" }}>
                Login
              </Link>
            </NavbarText>
          </Container>
        </Navbar>

        <Navbar light expand="md" style={{ height: "100px" }}>
          <Container>
            <Nav className="mr-auto" navbar>
              <Link to="/">
                <img src={logo} alt="logo" width="65%" />
              </Link>
            </Nav>
            <NavbarText>
              <Nav className="mr-auto" navbar>
                <NavItem
                  className="pt-4"
                  style={{ textAlign: "center", width: "120px" }}
                >
                  <Link
                    to="/"
                    onMouseEnter={this.aboutOnMouseEnter}
                    onMouseLeave={this.aboutOnMouseLeave}
                  >
                    <i
                      className={about_icon}
                      style={{ fontSize: "40px", color: "#d93731" }}
                    />
                    <p
                      style={
                        about_text
                          ? {
                              fontSize: "13px",
                              color: "#d93731",
                              textDecoration: "underline",
                              textDecorationColor: "#d93731",
                            }
                          : { fontSize: "13px", color: "#000000" }
                      }
                    >
                      โปรไฟล์
                    </p>
                  </Link>
                </NavItem>

                <NavItem
                  className="pt-4"
                  style={{ textAlign: "center", width: "120px" }}
                >
                  <Link
                    to="/product"
                    onMouseEnter={this.listOnMouseEnter}
                    onMouseLeave={this.listOnMouseLeave}
                  >
                    <i
                      className={list_icon}
                      style={{ fontSize: "40px", color: "#d93731" }}
                    />
                    <p
                      style={
                        list_text
                          ? {
                              fontSize: "13px",
                              color: "#d93731",
                              textDecoration: "underline",
                              textDecorationColor: "#d93731",
                            }
                          : { fontSize: "13px", color: "#000000" }
                      }
                    >
                      รายการสินค้า
                    </p>
                  </Link>
                </NavItem>

                <NavItem
                  className="pt-4"
                  style={{ textAlign: "center", width: "120px" }}
                >
                  <Link
                    to="newshop"
                    onMouseEnter={this.joinOnMouseEnter}
                    onMouseLeave={this.joinOnMouseLeave}
                  >
                    <i
                      className={join_icon}
                      style={{ fontSize: "40px", color: "#d93731" }}
                    />
                    <p
                      style={
                        join_text
                          ? {
                              fontSize: "13px",
                              color: "#d93731",
                              textDecoration: "underline",
                              textDecorationColor: "#d93731",
                            }
                          : { fontSize: "13px", color: "#000000" }
                      }
                    >
                      ขายสินค้ากับ <br /> e-Salesman
                    </p>
                  </Link>
                </NavItem>

                <NavItem
                  className="pt-4"
                  style={{ textAlign: "center", width: "120px" }}
                >
                  <Link
                    onClick={this.toggleLoginModal}
                    onMouseEnter={this.loginOnMouseEnter}
                    onMouseLeave={this.loginOnMouseLeave}
                  >
                    <i
                      className="fas fa-sign-in-alt"
                      style={{ fontSize: "40px", color: "#d93731" }}
                    />
                    <p
                      style={
                        login_text
                          ? {
                              fontSize: "13px",
                              color: "#d93731",
                              textDecoration: "underline",
                              textDecorationColor: "#d93731",
                            }
                          : { fontSize: "13px", color: "#000000" }
                      }
                    >
                      เข้าสู่ระบบ
                    </p>
                  </Link>
                </NavItem>
              </Nav>
            </NavbarText>
          </Container>
        </Navbar>

        <Navbar
          light
          expand="md"
          style={{ height: "80px", backgroundColor: "#d93731" }}
        >
          <Container>
            <Nav className="mr-auto" navbar>
              <span style={{ color: "#fff", fontSize: "13px" }}>
                ยังมีสินค้าอีกกว่า 1256 รายการรอคุณอยู่
              </span>
            </Nav>
            <NavbarText style={{ width: "600px" }}>
              <InputGroup>
                <Input
                  placeholder="ค้นหาสินค้าที่คุณต้องการ"
                  style={{ fontSize: "13px" }}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText style={{ backgroundColor: "#fff" }}>
                    <i
                      className="fas fa-search"
                      style={{ color: "#d93731", cursor: "pointer" }}
                    ></i>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </NavbarText>
          </Container>
        </Navbar>

        <Modal
          isOpen={this.state.loginModal}
          toggle={this.toggleLoginModal}
         
          backdrop={true}
          keyboard={true}
        >
          <ModalHeader toggle={this.toggleLoginModal}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleLoginModal}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleLoginModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
