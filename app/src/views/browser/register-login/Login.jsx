import React, { Component } from "react";
import { auth } from "../../../assets/api/firebase";

import {
  Row,
  Col,
  Input,
  InputGroup,
  Button,
  Form,
} from "reactstrap";

import "../../../assets/css/login-page.css";

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
        //console.log(res + "Login Complete");
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
        <Row className="mt-1">
          <Col md="5">
            <h4>เข้าสู่ระบบ</h4>
          </Col>
          <Col md="7" style={{ fontSize: "12px" }} className="text-right mt-2">
            เพิ่งเคยเข้ามาใน e-Saleman ใช่หรือไม่{" "}
            <button
              style={{ cursor: "pointer" }}
              className="text-danger button-like-a"
              onClick={this.props.togglePage}
            >
              สมัครใหม่
            </button>
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
      </>
    );
  }
}
