import React, { Component } from "react";
import { auth } from "../../assets/api/firebase";

import {
  Row,
  Col,
  CardBody,
  Input,
  InputGroup,
  Button,
  Form,
} from "reactstrap";

import { ReactComponent as FacebookSVG } from "../../assets/icon/facebook.svg";
import { ReactComponent as GoogleSVG } from "../../assets/icon/google.svg";

import "../../assets/css/login-page.css";
import "../../assets/css/facebook-login.css";
import "../../assets/css/google-login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInputTextChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      message: ""
    });
  
  };

  handdleSubmit = (e) => {
    const { email, password } = this.state;

    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res + "Login Complete");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/user-not-found") {
          this.setState({
            message:
              "*ไม่มีรายการที่ตรงกับบัญชีผู้ใช้ที่กับที่ระบุ บัญชีผู้ใช้อาจถูกลบออกจากระบบแล้ว",
          });
        }
        if (error.code === "auth/invalid-email") {
          this.setState({ message: "*รูปแบบอีเมลไม่ถูกต้อง" });
        }
        if (error.code === "auth/wrong-password") {
          this.setState({ message: "*รหัสผ่านไม่ถูกต้อง" });
        }
      });
  };

  render() {
    const { email, password, message } = this.state;
    return (
      <>
        <div>
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
                    marginTop: "80px",
                    backgroundColor: "#ffffff",
                    borderRadius: "30px",
                  }}
                >
                  <CardBody>
                    <Row className="mt-1">
                      <Col md="5">
                        <h4>เข้าสู่ระบบ</h4>
                      </Col>
                      <Col
                        md="7"
                        style={{ fontSize: "12px" }}
                        className="text-right mt-2"
                      >
                        เพิ่งเคยเข้ามาใน e-Saleman ใช่หรือไม่{" "}
                        <a
                          style={{ cursor: "pointer" }}
                          className="text-danger"
                          onClick={this.props.togglePage}
                        >
                          สมัครใหม่
                        </a>
                      </Col>
                    </Row>

                    <hr />

                    <Form>
                      <InputGroup size="lg">
                        <Input
                          style={{ fontSize: "15px" }}
                          type="text"
                          placeholder="Email"
                          name="email"
                          onChange={this.handleInputTextChange}
                        />
                      </InputGroup>
                      <br />
                      <InputGroup size="lg">
                        <Input
                          style={{ fontSize: "15px" }}
                          type="password"
                          placeholder="รหัสผ่าน"
                          name="password"
                          onChange={this.handleInputTextChange}
                        />
                      </InputGroup>
                      {message ? (
                        <p className="light-th text-danger pt-1">{message}</p>
                      ) : (
                        <p className="pt-1">
                          <br />
                        </p>
                      )}
                    
                      <Button
                        className="mt-3 login-btn"
                        style={{ border: "none" }}
                        size="lg"
                        block
                        onClick={this.handdleSubmit.bind(this)}
                        disabled={!email || !password}
                      >
                        <span className="light-th" style={{ fontSize: "15px" }}>
                          เข้าสู่ระบบ
                        </span>
                      </Button>
                    </Form>
                    <br />

                    <Row>
                      <Col md="5">
                        <hr />
                      </Col>
                      <Col
                        md="2"
                        style={{ textAlign: "center", color: "gray" }}
                      >
                        หรือ
                      </Col>
                      <Col md="5">
                        <hr />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <div
                          id="fb-login-share-button"
                          className="text-center"
                          style={{ width: "100%" }}
                        >
                          <FacebookSVG />
                          <span> Log in with Facebook</span>
                        </div>
                      </Col>
                      <Col md="6">
                        <div
                          id="gg-login-share-button"
                          className="text-center"
                          style={{
                            border: "1px solid #d9d9d9",
                            boxShadow: "2px 2px 3px #d9d9d9",
                            width: "100%",
                          }}
                        >
                          <GoogleSVG />
                          &nbsp;
                          <span> Sign in with Google</span>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}
