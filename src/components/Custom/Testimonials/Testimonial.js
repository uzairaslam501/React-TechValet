import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./TestimonialSlider.css"; // Import your CSS file

// import required modules
import { Navigation } from "swiper/modules";

const TestimonialSlider = ({ testimonials }) => {
  return (
    <div className="testimonial-slider">
      <Swiper
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-slide">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="author-image"
                style={{
                  border: "3px solid #fff",
                  padding: "10px",
                }}
              />
              <h3 className="author-name">{testimonial.author}</h3>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
