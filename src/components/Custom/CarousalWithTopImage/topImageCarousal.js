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
            <div className="user-card-top">
              <NavLink
                to={`/preview-profile/${encodeURIComponent(user.userEncId)}`}
                className="user-card-top__link"
              >
                <div className="user-card-top__image-wrapper">
                  <HandleImages
                    imagePath={user.profilePicture}
                    imageAlt={user.userName}
                    className="user-card-top__image"
                  />
                </div>
              </NavLink>

              <div className="user-card-top__details">
                <div className="user-card-top__header">
                  <h4 className="user-card-top__name">
                    <NavLink
                      to={`/preview-profile/${encodeURIComponent(
                        user.userEncId
                      )}`}
                      className="user-card-top__name-link"
                    >
                      {user.userName}
                    </NavLink>
                  </h4>
                  <span className="user-card-top__location">{user.city}</span>
                </div>

                <div className="user-card-top__description">
                  {user.description ? (
                    <p>{truncateCharacters(user.description, 20)}</p>
                  ) : (
                    <p className="user-card-top__no-description">
                      Description not available
                    </p>
                  )}
                </div>

                <div className="user-card-top__rating">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1792 1792"
                    width="15"
                    height="15"
                    className="user-card-top__rating-star"
                  >
                    <path
                      fill="currentColor"
                      d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                    />
                  </svg>
                  <span>
                    {user.userRating}/5 ({user.userRatingCount})
                  </span>
                </div>

                <div className="user-card-top__footer">
                  <div className="user-card-top__price">
                    Starting at : <strong>${user.pricePerHour}</strong>
                  </div>
                  <button className="user-card-top__favorite-btn">
                    <i className="fa fa-heart" aria-hidden="true"></i>
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
