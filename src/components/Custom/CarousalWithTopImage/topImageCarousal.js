import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./topImageCarousal.css";
import { truncateCharacters } from "../../../utils/_helpers";
import HandleImages from "../Avatars/HandleImages";
import { NavLink } from "react-router-dom";

const TopImageCarousal = ({ label, users = [] }) => {
  return (
    <Swiper
      loop={true}
      slidesPerView={1}
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
      className="mySwiper customswipper "
    >
      {users.length > 0 ? (
        users.map((user) => (
          <SwiperSlide key={user.userEncId}>
            <div className="user-card">
              <NavLink
                to={`/preview-profile/${encodeURIComponent(user.userEncId)}`}
                className="user-card__link"
              >
                <div className="user-card__image-wrapper">
                  <HandleImages
                    imagePath={user.profilePicture}
                    imageAlt={user.userName}
                    className="user-card__image"
                  />
                </div>
              </NavLink>

              <div className="user-card__details">
                <div className="user-card__header">
                  <h4 className="user-card__name">
                    <NavLink
                      to={`/preview-profile/${encodeURIComponent(
                        user.userEncId
                      )}`}
                      className="user-card__name-link"
                    >
                      {user.userName}
                    </NavLink>
                  </h4>
                  <span className="user-card__location">
                    <i className="bi bi-map-marker-alt"></i> {user.city}
                  </span>
                </div>

                <div className="user-card__description">
                  {user.description ? (
                    <p>{truncateCharacters(user.description, 30)}</p>
                  ) : (
                    <p className="user-card__no-description">
                      No description available
                    </p>
                  )}
                </div>

                <div className="user-card__rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi bi-${
                          i < user.userRating ? "star-fill" : "star"
                        }`}
                      ></i>
                    ))}
                  </div>
                  <span>
                    {user.userRating}/5 ({user.userRatingCount} reviews)
                  </span>
                </div>

                <div className="user-card__footer">
                  <div className="user-card__price">
                    Starting at: <strong>${user.pricePerHour}</strong>
                  </div>
                  <button className="user-card__favorite-btn">
                    <i className="fa fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <p>No users found</p> // Handle the case when no users are available
      )}
    </Swiper>
  );
};

export default TopImageCarousal;
