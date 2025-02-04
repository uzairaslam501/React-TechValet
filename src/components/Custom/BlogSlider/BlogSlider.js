import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./style.css";
import CustomCard from "../Cards/CustomCard";

const BlogSlider = ({ articles }) => {
  return (
    <Swiper
      loop={true}
      slidesPerView={"auto"}
      spaceBetween={10}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={true}
      pagination={false}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper customSwiper"
    >
      {articles.length > 0 ? (
        articles.map((article) => (
          <SwiperSlide key={article.id}>
            <CustomCard article={article} />
          </SwiperSlide>
        ))
      ) : (
        <p>No users found</p>
      )}
    </Swiper>
  );
};

export default BlogSlider;
