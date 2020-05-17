import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  InputGroup,
  Button,
} from "reactstrap";

import Header from "../components/login-register/Header";
import Footer from "../components/login-register/Footer";

export default class Login extends Component {
  render() {
    return (
      <>
        <div>
          <Container>
            <Header title="เข้าสู่ระบบ" />
          </Container>
          <div
            style={{
              width: "100%",
              height: "600px",
              backgroundColor: "orange",
            }}
          >
            <Row>
              <Col md="6"></Col>
              <Col md="6">
                <Card
                  style={{
                    height: "460px",
                    width: "500px",
                    marginTop: "80px",
                    position: "fixed",
                  }}
                >
                  <CardBody>
                    <Row className="mt-1">
                      <Col md="5">
                        <h5>เข้าสู่ระบบ</h5>
                      </Col>
                      <Col
                        md="7"
                        style={{ fontSize: "12px" }}
                        className="text-right"
                      >
                        เพิ่งเคยเข้ามาใน e-Saleman ใช่หรือไม่{" "}
                        <a href="/">สมัครใหม่</a>
                      </Col>
                    </Row>
                    <br />

                    <InputGroup size="lg">
                      <Input
                        style={{ fontSize: "15px" }}
                        type="text"
                        placeholder="Email"
                      />
                    </InputGroup>
                    <br />
                    <InputGroup size="lg">
                      <Input
                        style={{ fontSize: "15px" }}
                        type="password"
                        placeholder="รหัสผ่าน"
                      />
                    </InputGroup>
                    <br />
                    <Button className="mt-3" color="primary" size="lg" block>
                      เข้าสู่ระบบ
                    </Button>
                    <br />
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
                        <Button
                          className="mt-3"
                          color="primary"
                          size="lg"
                          block
                        >
                          Facebook
                        </Button>
                      </Col>
                      <Col md="6">
                        <Button
                          className="mt-3"
                          color="primary"
                          size="lg"
                          block
                        >
                          Google
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
