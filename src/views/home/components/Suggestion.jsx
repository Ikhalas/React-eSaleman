import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

const responsive_sugg = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 1, // optional, default to 1.
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

export default class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggProducts: [],
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getProduct();
  }

  getProduct() {
    axios.get(process.env.REACT_APP_API_URL + "/product/all").then((res) => {
      //console.log(res.data);
      this._isMounted &&
        this.setState({
          suggProducts: res.data,
        });
    });
  }

  genSuggProducts = () => {
    const { suggProducts } = this.state;

    return (
      suggProducts &&
      suggProducts.map((product) => {
        return (
          <Card key={product.product_id}>
            <div
              style={{
                width: "100%",
                height: "250px",
                backgroundImage: "url(" + product.product_image + ")",
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#fff",
              }}
            ></div>

            <CardBody>
              <CardTitle>{product.product_name}</CardTitle>
              <CardSubtitle style={{ color: "#d93731" }}>
                <b>
                  - {product.product_price} บาท / {product.product_unit}
                </b>
              </CardSubtitle>
            </CardBody>
          </Card>
        );
      })
    );
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <div style={{ backgroundColor: "#ffffff" }}>
          <Container>
            <br />
            <h5 className="text-center">สินค้าแนะนำ</h5>
          </Container>
          <hr />
          <Container
            className="themed-container"
            fluid={true}
            style={{ width: "70%" }}
          >
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive_sugg}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-50-px"
            >
              {this.genSuggProducts()}
            </Carousel>
          </Container>
          <hr />
        </div>
      </>
    );
  }
}
