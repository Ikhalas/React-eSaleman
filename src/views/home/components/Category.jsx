import React, { Component } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import { Container, Card, CardBody, CardTitle } from "reactstrap";

import "react-multi-carousel/lib/styles.css";

const responsive_cate = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 10,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getProduct();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getProduct() {
    axios.get(process.env.REACT_APP_API_URL + "/category").then((res) => {
      console.log(res.data);
      this._isMounted &&
        this.setState({
          category: res.data,
        });
    });
  }

  genSuggProducts = () => {
    const { category } = this.state;

    return (
      category &&
      category.map((cate) => {
        return (
          <Card
            key={cate.category_id}
            className="pt-2"
            style={{ textAlign: "center" }}
          >
            <CardBody>
              <span style={{ cursor: "pointer" }}>
                <i
                  style={{ fontSize: "30px", color: "#d93731" }}
                  className="fas fa-th-list"
                ></i>
                <CardTitle>{cate.category_name}</CardTitle>
              </span>
              
            </CardBody>
          </Card>
        );
      })
    );
  };

  render() {
    return (
      <>
        <Container>
          <div
            style={{
              backgroundColor: "#ffffff",
              height: "100%",
            }}
          >
            <h6 className="pt-3 pb-2 pl-3">หมวดหมู่</h6>

            <Carousel
              swipeable={false}
              draggable={false}
              responsive={responsive_cate}
              infinite={false}
              showDots={true}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-50-px"
            >
              {this.genSuggProducts()}

              <Card className="pt-2" style={{ textAlign: "center" }}>
                <CardBody>
                  <span style={{ cursor: "pointer" }}>
                    <i
                      style={{ fontSize: "30px", color: "#d93731" }}
                      className="fas fa-th-list"
                    ></i>
                    <CardTitle>None</CardTitle>
                  </span>
                </CardBody>
              </Card>
              <Card className="pt-2" style={{ textAlign: "center" }}>
                <CardBody>
                  <span style={{ cursor: "pointer" }}>
                    <i
                      style={{ fontSize: "30px", color: "#d93731" }}
                      className="fas fa-th-list"
                    ></i>
                    <CardTitle>None</CardTitle>
                  </span>
                </CardBody>
              </Card>
              <Card className="pt-2" style={{ textAlign: "center" }}>
                <CardBody>
                  <span style={{ cursor: "pointer" }}>
                    <i
                      style={{ fontSize: "30px", color: "#d93731" }}
                      className="fas fa-th-list"
                    ></i>
                    <CardTitle>None</CardTitle>
                  </span>
                </CardBody>
              </Card>
              <Card className="pt-2" style={{ textAlign: "center" }}>
                <CardBody>
                  <span style={{ cursor: "pointer" }}>
                    <i
                      style={{ fontSize: "30px", color: "#d93731" }}
                      className="fas fa-th-list"
                    ></i>
                    <CardTitle>None</CardTitle>
                  </span>
                </CardBody>
              </Card>
              <Card className="pt-2" style={{ textAlign: "center" }}>
                <CardBody>
                  <span style={{ cursor: "pointer" }}>
                    <i
                      style={{ fontSize: "30px", color: "#d93731" }}
                      className="fas fa-th-list"
                    ></i>
                    <CardTitle>None</CardTitle>
                  </span>
                </CardBody>
              </Card>
              <Card className="pt-2" style={{ textAlign: "center" }}>
                <CardBody>
                  <span style={{ cursor: "pointer" }}>
                    <i
                      style={{ fontSize: "30px", color: "#d93731" }}
                      className="fas fa-th-list"
                    ></i>
                    <CardTitle>None</CardTitle>
                  </span>
                </CardBody>
              </Card>
              <Card className="pt-2" style={{ textAlign: "center" }}>
                <CardBody>
                  <span style={{ cursor: "pointer" }}>
                    <i
                      style={{ fontSize: "30px", color: "#d93731" }}
                      className="fas fa-th-list"
                    ></i>
                    <CardTitle>None</CardTitle>
                  </span>
                </CardBody>
              </Card>
              <Card className="pt-2" style={{ textAlign: "center" }}>
                <CardBody>
                  <span style={{ cursor: "pointer" }}>
                    <i
                      style={{ fontSize: "30px", color: "#d93731" }}
                      className="fas fa-th-list"
                    ></i>
                    <CardTitle>None</CardTitle>
                  </span>
                </CardBody>
              </Card>
              <Card className="pt-2" style={{ textAlign: "center" }}>
                <CardBody>
                  <span style={{ cursor: "pointer" }}>
                    <i
                      style={{ fontSize: "30px", color: "#d93731" }}
                      className="fas fa-th-list"
                    ></i>
                    <CardTitle>None</CardTitle>
                  </span>
                </CardBody>
              </Card>
              <Card className="pt-2" style={{ textAlign: "center" }}>
                <CardBody>
                  <span style={{ cursor: "pointer" }}>
                    <i
                      style={{ fontSize: "30px", color: "#d93731" }}
                      className="fas fa-th-list"
                    ></i>
                    <CardTitle>None</CardTitle>
                  </span>
                </CardBody>
              </Card>
              <Card className="pt-2" style={{ textAlign: "center" }}>
                <CardBody>
                  <span style={{ cursor: "pointer" }}>
                    <i
                      style={{ fontSize: "30px", color: "#d93731" }}
                      className="fas fa-th-list"
                    ></i>
                    <CardTitle>None</CardTitle>
                  </span>
                </CardBody>
              </Card>
            </Carousel>
          </div>
        </Container>
      </>
    );
  }
}
