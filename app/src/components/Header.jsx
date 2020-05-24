import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
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

class Header extends Component {
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
      userDetail: "",
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

  isFirstTimeLogin() {
    const { currentUser, userDetail } = this.state;

    if (currentUser.providerData[0].providerId !== "password" && !userDetail) {
      console.log(
        "log in with " +
          currentUser.providerData[0].providerId +
          " and this is my first time"
      );

      axios
        .post(process.env.REACT_APP_API_URL + "/user/add_new_user", {
          user_id: currentUser.uid,
          user_email: currentUser.email,
          user_name: currentUser.displayName,
          user_photo: currentUser.photoURL,
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
      //console.log("end");
    }
  }

  getUser() {
    auth.onAuthStateChanged((user) => {
      user
        ? this._isMounted &&
          this.setState({ currentUser: user }, () => {
            //console.log(this.state.currentUser.uid)
            this.getUserDetail();
          })
        : this._isMounted && this.setState({ currentUser: null });
    });
  }

  getUserDetail() {
    const { currentUser } = this.state;
    axios
      .get(process.env.REACT_APP_API_URL + "/user/" + currentUser.uid)
      .then((res) => {
        this._isMounted &&
          this.setState(
            {
              userDetail: res.data,
            },
            () => this.isFirstTimeLogin()
          );
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/errconnection");
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
      userDetail,
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
            <Nav className="mr-auto" navbar>
              <Link
                to="/newshop"
                style={{ fontSize: "13px" }}
                className="text-danger"
              >
                ขายของกับ e-Salesman
              </Link>
            </Nav>
            <NavbarText>
              {userDetail.user_name && userDetail.user_photo ? (
                <>
                  <Link to="/" className="pr-5" style={{ fontSize: "15px" }}>
                    <img
                      src={
                        userDetail.user_photo
                          ? userDetail.user_photo
                          : require("../assets/images/user.png")
                      }
                      width="20px"
                      style={{ borderRadius: "50%" }}
                      alt="avatar"
                    />
                    &nbsp;&nbsp;
                    {userDetail.user_name}
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="pr-5" style={{ fontSize: "12px" }}>
                    ยังไม่ได้ตั้งชื่อ{" "}
                    <span className="text-danger">แก้ไขโปรไฟล์</span>
                  </Link>
                </>
              )}
            </NavbarText>
          </Container>
        </Navbar>

        <Navbar light expand="md" style={{ height: "100px" }}>
          <Container>
            <Nav className="mr-auto" navbar>
              <Link to="/">
                <img
                  src={require("../assets/images/logo_2.png")}
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
                  <button
                    className="button-like-a"
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
                  </button>
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
    );
  }
}

export default withRouter(Header);
