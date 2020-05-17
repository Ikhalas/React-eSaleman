import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../assets/api/firebase";
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
} from "reactstrap";

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
        : this._isMounted && this.setState({ currentUser: null })
    });

    
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

  render() {
    
    const {
      list_icon,
      list_text,
      about_icon,
      about_text,
      login_text,
      currentUser
    } = this.state;
    
    return currentUser ? (
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
                {currentUser.email}
              </Link>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link to="/" style={{ fontSize: "12px" }}>
                User ID : {currentUser.uid}
              </Link>
            </NavbarText>
          </Container>
        </Navbar>

        <Navbar light expand="md" style={{ height: "100px" }}>
          <Container>
            <Nav className="mr-auto" navbar>
              <Link to="/">
                <img
                  src={require("../assets/images/logo_1.png")}
                  alt="logo"
                  width="65%"
                />
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
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => auth.signOut()}
                    onMouseEnter={this.loginOnMouseEnter}
                    onMouseLeave={this.loginOnMouseLeave}
                  >
                    <i
                      className="fas fa-sign-out-alt"
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
                      ออกจากระบบ
                    </p>
                  </a>
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
      </div>
    ) : (<></>)
  }
}
