import React, { Component } from "react";
import { Card, CardTitle, CardText, Row, Col } from "reactstrap";

export default class Product_Selling extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col md="12">
            <Card body className="mt-2">
              <Row>
                <Col md="3">
                  <div
                    style={{
                      height: "200px",
                      backgroundColor: "#d9d9d9",
                    }}
                  ></div>
                </Col>
                <Col md="9">
                  {" "}
                  <CardTitle>
                    <h4>ชื่อสินค้า</h4>
                  </CardTitle>
                  <CardText>
                    วัน : เวลา ที่วางขาย <br />
                    ข้อมูลสินค้าเบื่องต้นของสินค้า
                    ................................................ <br />
                  </CardText>
                </Col>
              </Row>
            </Card>

            <Card body className="mt-2">
              <Row>
                <Col md="3">
                  <div
                    style={{
                      height: "200px",
                      backgroundColor: "#d9d9d9",
                    }}
                  ></div>
                </Col>
                <Col md="9">
                  {" "}
                  <CardTitle>
                    <h4>ชื่อสินค้า</h4>
                  </CardTitle>
                  <CardText>
                    วัน : เวลา ที่วางขาย <br />
                    ข้อมูลสินค้าเบื่องต้นของสินค้า
                    ................................................ <br />
                  </CardText>
                </Col>
              </Row>
            </Card>

            <Card body className="mt-2">
              <Row>
                <Col md="3">
                  <div
                    style={{
                      height: "200px",
                      backgroundColor: "#d9d9d9",
                    }}
                  ></div>
                </Col>
                <Col md="9">
                  {" "}
                  <CardTitle>
                    <h4>ชื่อสินค้า</h4>
                  </CardTitle>
                  <CardText>
                    วัน : เวลา ที่วางขาย <br />
                    ข้อมูลสินค้าเบื่องต้นของสินค้า
                    ................................................ <br />
                  </CardText>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
