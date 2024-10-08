import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./TestimonialSlider.css"; // Import your CSS file

const TestimonialSlider = ({ testimonials }) => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex(
      (prevIndex) => (prevIndex + 1) % testimonials.length
    );
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const intervalId = setInterval(handleNextTestimonial, 5000); // Adjust the interval as needed
    return () => clearInterval(intervalId);
  }, [testimonials]);

  return (
    <Carousel
      activeIndex={currentTestimonialIndex}
      onSelect={setCurrentTestimonialIndex}
    >
      {testimonials.map((testimonial, index) => (
        <Carousel.Item key={index}>
          <img
            className="testimonial-image" // Apply the custom class for styling
            src={testimonial.image}
            alt={testimonial.author}
          />
          <Carousel.Caption className="testimonial-caption">
            <h3
              className="text-white text-bold"
              style={{ textDecoration: "underline" }}
            >
              <i>{testimonial.author}</i>
            </h3>
            <p>{testimonial.quote}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TestimonialSlider;
