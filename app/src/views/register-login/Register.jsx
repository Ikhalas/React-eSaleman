import React, { Component } from "react";
import { auth } from "../../assets/api/firebase";
import {
  Row,
  Col,
  Input,
  InputGroup,
  Button,
  Form,
} from "reactstrap";


import "../../assets/css/login-page.css";
import "../../assets/css/facebook-login.css";
import "../../assets/css/google-login.css";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
      wrongPassword: false,
    };
  }

  handleInputTextChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
    //console.log([e.target.name] + " ===> " + e.target.value);
  };

  handdleSubmit = (e) => {
    const { email, password, confirmpassword } = this.state;

    e.preventDefault();

    if (password !== confirmpassword) {
      this.setState({ wrongPassword: true });
    } else {
      try {
        auth.createUserWithEmailAndPassword(email, password);
      } catch (error) {
        console.log(error.code);
        console.log(error.message);
      }
    }
  };

  render() {
    const { wrongPassword, email, password, confirmpassword } = this.state;
    return (
      <>
        
                    <Row className="mt-1">
                      <Col md="5">
                        <h4>สมัครใหม่</h4>
                      </Col>
                      <Col
                        md="7"
                        style={{ fontSize: "12px" }}
                        className="text-right mt-2"
                      >
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
                    </Form>
                    <br />

                   
          
      </>
    );
  }
}
