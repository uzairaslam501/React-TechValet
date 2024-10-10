import { useState, useEffect, useRef } from "react";
import { homeCarousalData } from "../../../utils/client/data/carousalData";
import "./carousal.css";

function CustomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const cardsVisible = 4;
  const totalCards = homeCarousalData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle Next Slide
  const handleNext = () => {
    if (currentIndex < totalCards - cardsVisible) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // Handle Previous Slide
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(totalCards - cardsVisible);
    }
  };

  return (
    <div className="carousel-container-custom">
      <button
        className="carousel-control-button carousel-control-button-prev"
        onClick={handlePrev}
      >
        &lt;
      </button>

      <div className="carousel-track-wrapper">
        <div
          className="carousel-track-content"
          ref={containerRef}
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsVisible)}%)`,
            width: `${(totalCards / cardsVisible) * 100}%`, // Dynamic width based on total cards
          }}
        >
          {homeCarousalData.map((card) => (
            <div className="carousel-card-item" key={card.id}>
              <img src={card.image} alt={card.title} />
              <div className="carousel-card-info">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="carousel-control-button carousel-control-button-next"
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
}

export default CustomCarousel;
