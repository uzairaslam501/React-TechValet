import React from "react";
import HandleImages from "../Avatars/HandleImages"; // Ensure this handles default images

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <div className="text-center py-4">No reviews available.</div>;
  }

  return (
    <div className="review-list bg-light rounded p-3">
      <ul className="list-unstyled">
        {reviews && reviews.rating.length > 0 ? (
          reviews.rating.map((review, index) => (
            <li
              className="d-flex mb-4 p-3 bg-white rounded shadow-sm align-items-center"
              key={index}
            >
              <div className="me-3">
                <HandleImages
                  imagePath={review.customer.profilePic}
                  imageAlt={`${review.customer.name}'s profile`}
                  imageStyle={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                  className="rounded-circle"
                />
              </div>
              <div className="flex-grow-1">
                <h5 className="mb-1 text-primary">
                  {review.customer.name}
                  <span className="ms-3 text-warning">
                    {Array.from({ length: review.stars }).map(
                      (_, starIndex) => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1792 1792"
                          width="15"
                          height="15"
                          key={starIndex}
                        >
                          <path
                            fill="currentColor"
                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                          ></path>
                        </svg>
                      )
                    )}
                  </span>
                </h5>
                <p className="text-muted small mb-2">{review.publishDate}</p>
                <p className="mb-0">{review.reviews}</p>
              </div>
            </li>
          ))
        ) : (
          <span>No Reviews</span>
        )}
      </ul>
    </div>
  );
};

export default ReviewList;
