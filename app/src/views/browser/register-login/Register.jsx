import React, { Component } from "react";
import axios from "axios";
import { auth } from "../../../assets/api/firebase";
import { Row, Col, Input, InputGroup, Button, Form } from "reactstrap";

import "../../../assets/css/login-page.css";


export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
      wrongPassword: false,
      disableBtn: false,
    };
  }

  handleInputTextChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      wrongPassword: true,
      disableBtn: false,
    });
    //console.log([e.target.name] + " ===> " + e.target.value);
  };

  handdleSubmit = (e) => {
    const { email, password, confirmpassword } = this.state;
    this.setState({ disableBtn: true });
    e.preventDefault();
    if (password !== confirmpassword) {
      this.setState({ wrongPassword: true });
    } else {
      try {
        auth.createUserWithEmailAndPassword(email, password).then(() => {
          auth.onAuthStateChanged((user) => {
            axios
              .post(process.env.REACT_APP_API_URL + "/user/add_new_user", {
                user_id: user.uid,
                user_email: user.email,
              })
              .then(function (response) {
                //console.log(response);
              })
              .catch((err) => {
                console.log(err);
                this.props.history.push("/errconnection");
              });
          });
        });
      } catch (error) {
        console.log(error.code);
        console.log(error.message);
      }
    }
  };

  render() {
    const {
      wrongPassword,
      email,
      password,
      confirmpassword,
      disableBtn,
    } = this.state;
    return (
      <>
        <Row className="mt-1">
          <Col md="5">
            <h4>สมัครใหม่</h4>
          </Col>
          <Col md="7" style={{ fontSize: "12px" }} className="text-right mt-2">
            หากมีบัญชีผู้ใช้แล้ว คุณสามารถ{" "}
            <button
              style={{ cursor: "pointer" }}
              className="text-danger button-like-a"
              onClick={this.props.togglePage}
            >
              เข้าสู่ระบบ
            </button>
          </Col>
        </Row>

        <hr />
        <Form>
          <InputGroup size="lg">
            <Input
              style={{ fontSize: "15px" }}
              type="email"
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
          <br />

          <InputGroup size="lg">
            <Input
              style={{ fontSize: "15px" }}
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
              name="confirmpassword"
              onChange={this.handleInputTextChange}
            />
          </InputGroup>
          {wrongPassword ? (
            <>
              <p className="light-th text-danger pt-1">
                &nbsp;&nbsp;*รหัสผ่านไม่ตรงกัน
              </p>
            </>
          ) : (
            <>
              <p className="pt-1">
                <br />
              </p>
            </>
          )}

          {!disableBtn ? (
            <>
              <Button
                type="submit"
                className="mt-3 login-btn"
                style={{ border: "none" }}
                size="lg"
                block
                onClick={this.handdleSubmit.bind(this)}
                disabled={!email || !password || !confirmpassword}
              >
                <span className="light-th" style={{ fontSize: "15px" }}>
                  สมัครใหม่
                </span>
              </Button>
            </>
          ) : (
            <>
              <Button
                type="submit"
                className="mt-3 login-btn"
                style={{ border: "none" }}
                size="lg"
                block
                disabled
              >
                <span className="light-th" style={{ fontSize: "15px" }}>
                  สมัครใหม่
                </span>
              </Button>
            </>
          )}
        </Form>
        <br />
      </>
    );
  }
}
