import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Card, CardTitle, CardText, Row, Col } from "reactstrap";

class Product_Selling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productSelling: {},
      ready: false,
    };

    this._isMounted = false;
  }

  componentDidMount() {
    console.log(this.props.match);
    this._isMounted = true;
    this._isMounted && this.getProduct();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getProduct() {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/sharing/share_selling/" +
          this.props.userid
      )
      .then((res) => {
        //console.log(res.data);
        this._isMounted &&
          this.setState({
            productSelling: res.data,
            ready: true,
          });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/errconnection");
      });
  }

  genProductCard() {
    const { productSelling } = this.state;

    return (
      productSelling &&
      productSelling.map((prod) => (
        <Card
          body
          className="mt-2"
          key={prod.id}
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.props.history.push(
              "/productdetail/" + prod.product_shop + "/" + prod.product_id
            );
          }}
        >
          <Row>
            <Col md="3">
              <div
                style={{
                  height: "200px",
                  backgroundColor: "#d9d9d9",
                  backgroundImage: "url(" + prod.product_thumbnail + ")",
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </Col>
            <Col md="9">
              {" "}
              <CardTitle>
                <h4>{prod.product_name}</h4>
              </CardTitle>
              <CardText>
                <span className="light-th" style={{ fontSize: "13px" }}>
                  {this.convertDate(prod.share_date)} : {prod.share_time} น.
                </span>
                <br />
                <br />
                <span className="light-th" style={{ fontSize: "15px" }}>
                  รายละเอียด :
                </span>
                <span> {prod.product_detail}</span>

                <br />
                <br />

                <span className="light-th" style={{ fontSize: "15px" }}>
                  สถานะ :
                </span>
                <span className="text-danger" style={{ fontSize: "20px" }}>
                  {" "}
                  กำลังขาย
                </span>
              </CardText>
            </Col>
          </Row>
        </Card>
      ))
    );
  }

  convertDate(date) {
    let month = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    //console.log(month[new Date(date.seconds * 1000).getMonth() + 1]);
    if (date) {
      return (
        <>
          {" "}
          {new Date(date).getDate() +
            " " +
            month[new Date(date).getMonth()] +
            " " +
            (new Date(date).getFullYear() + 543)}
        </>
      );
    } else {
      return <></>;
    }
  }

  render() {
    const { ready, productSelling } = this.state;
    return ready ? (
      <div>
        <Row>
          <Col md="12">
            {productSelling.length ? (
              <>{this.genProductCard()}</>
            ) : (
              <>
                <div
                  className="light-th text-danger"
                  style={{ textAlign: "center", fontSize: "20px" }}
                >
                  <br /> <br />
                  ยังไม่มีรายการ
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
    ) : (
      <></>
    );
  }
}

export default withRouter(Product_Selling);
