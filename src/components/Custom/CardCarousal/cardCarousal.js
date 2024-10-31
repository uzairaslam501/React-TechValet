import { homeCarousalData } from "../../../utils/client/data/carousalData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousal.css";

// Import required modules
import { Autoplay, Navigation } from "swiper/modules";

function CustomCarousel() {
  return (
    <>
      <div className="swiper-container">
        <Swiper
          loop={true}
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {homeCarousalData.map((card) => (
            <SwiperSlide key={card.id}>
              <div
                className="carousel-card-item"
                style={{
                  backgroundImage: `url(${card.image})`,
                }}
              >
                <div className="card-info">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default CustomCarousel;
