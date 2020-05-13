import React, { Component } from "react";
import { Container } from "reactstrap";

export default class Promotion extends Component {
  render() {
    return (
      <div>
        <Container>
          <div
            style={{
              backgroundColor: "#d93731",
              height: "100px",
              lineHeight: "100px",
              textAlign: "center",
            }}
          >
            <p style={{ color: "white", fontSize: "30px" }}>Promotion</p>
          </div>
        </Container>
      </div>
    );
  }
}
