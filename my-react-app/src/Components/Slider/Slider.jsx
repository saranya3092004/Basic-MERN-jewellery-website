import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";
import products from "../../Product";

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div className="slider-container" data-aos="fade-up">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="slide">
            <img src={product.image} alt={product.name} />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.price}</p>
              <button>{product.button}</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
