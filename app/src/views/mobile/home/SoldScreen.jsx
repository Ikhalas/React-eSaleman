import React, { Component } from "react";
import axios from "axios";
import { Card, CardText, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";

export default class SellingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productSelling: {},
      ready: false,
    };

    this._isMounted = false;
  }

  componentDidMount() {
    //console.log(this.props.match);
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
          "/sharing/share_sold/" +
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

  genProductCard() {
    const { productSelling } = this.state;

    return (
      productSelling &&
      productSelling.map((prod) => (
        <Card body className="mb-2" key={prod.id} style={{ padding: 10 }}>
          <Row>
            <Col xs="4" style={{ paddingLeft: 5, paddingRight: 5 }}>
              <div
                style={{
                  height: "100px",
                  backgroundColor: "#d9d9d9",
                  backgroundImage: "url(" + prod.product_thumbnail + ")",
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </Col>
            <Col xs="8" style={{ paddingRight: 0 }}>
              {" "}
              <CardText>
                <p style={{ marginBottom: 0 }}>{prod.product_name}</p>
                <p
                  className="light-th "
                  style={{ fontSize: "10px", marginTop: 0 }}
                >
                  {this.convertDate(prod.share_date)} : {prod.share_time} น.
                </p>
              </CardText>
            </Col>
          </Row>
        </Card>
      ))
    );
  }

  render() {
    const { ready, productSelling } = this.state;
    return ready ? (
      <div>
        <NotificationAlert ref="notify" />
        <Row>
          <Col xs="12">
            {productSelling.length ? (
              <>
                {this.genProductCard()}
                <br />
              </>
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
    ) : null;
  }
}
