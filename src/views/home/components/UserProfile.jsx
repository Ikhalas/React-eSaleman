import React, { Component } from "react";
//import axios from "axios";
import { Container } from "reactstrap";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggProducts: [],
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  getCerrentUser () {

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <div style={{ backgroundColor: "#ffffff" }}>
          <Container fluid={true} style={{ width: "60%" }}>
            <br />
            <h5>โปรไฟล์</h5>
          </Container>
          <hr />
          <Container
            className="themed-container"
            fluid={true}
            style={{ width: "60%" }}
          >
            <div style={{border:'1px solid #d9d9d9', height:'200px'}}>
              {/* User Profile Here */}
            </div>

            
          </Container>
          <hr />
        </div>
      </>
    );
  }
}
