import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getValetsBySearch } from "../../../redux/Actions/customerActions";
import { useDispatch } from "react-redux";
import { Row, Col, Card, Container, Spinner } from "react-bootstrap";
import defaultImage from "../../../assets/images/no-user-image.jpg";
import "./filteredData.css";

const Search = () => {
  const { value } = useParams();
  const dispatch = useDispatch();
  const [searchedUserList, setSearchedUserList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (value) {
      searchValet();
    }
  }, [value]);

  const searchValet = async () => {
    setLoading(true);
    try {
      const response = await dispatch(getValetsBySearch(value));
      setSearchedUserList(response?.payload || []);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  return (
    <Container className="p-5">
      {loading ? (
        <Row className="text-center">
          <Col>
            <Spinner animation="grow" style={{ backgroundColor: "#000" }} />
          </Col>
        </Row>
      ) : (
        <Row className="justify-content">
          {searchedUserList && searchedUserList.length > 0 ? (
            searchedUserList.map((user) => (
              <Col md={3} key={user.encUserId} className="mb-3">
                <Card className="user-card">
                  <NavLink
                    to={`/preview-profile/${user.encUserId}`}
                    className="user-card__link"
                  >
                    <div className="user-card__image-wrapper">
                      <Card.Img
                        variant="top"
                        src={user.UserProfile || defaultImage}
                        className="user-card__image"
                        alt={`${user.firstName} ${user.lastName}`}
                        onError={(e) => {
                          e.target.onerror = null; // Prevents infinite loop if default image fails
                          e.target.src = defaultImage; // Set fallback image
                        }}
                      />
                    </div>
                  </NavLink>
                  <Card.Body className="user-card__details">
                    <div className="user-card__header">
                      <span className="user-card__name">
                        <NavLink
                          to={`/preview-profile/${user.encUserId}`}
                          className="user-card__name-link stretched-link"
                        >
                          {user.firstName} {user.lastName}
                        </NavLink>
                      </span>
                      <span className="seller-card ms-auto">
                        {user.status === 1 ? (
                          <div className="user-online-indicator is-online">
                            <i className="fa fa-circle"></i> online
                          </div>
                        ) : (
                          <div className="user-online-indicator is-offline">
                            <i className="fa fa-circle"></i> offline
                          </div>
                        )}
                      </span>
                    </div>
                    <div className="user-card__location">
                      <a
                        className="text-muted"
                        href={`../User/ViewUserProfile?Id=${user.encUserId}`}
                      >
                        {user.userName}
                      </a>
                    </div>
                    <div className="user-card__description">
                      {user.userDescription ? (
                        <p className="text-dark">{user.userDescription}</p>
                      ) : (
                        <p className="user-card__no-description">
                          No description available
                        </p>
                      )}
                    </div>
                    <div className="user-card__rating">
                      {user.averageStars !== "0" && (
                        <>
                          <span className="user-card__rating-star">
                            <svg
                              style={{ marginBottom: "2px" }}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1792 1792"
                              width="15"
                              height="15"
                            >
                              <path
                                fill="#FFD700"
                                d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                              ></path>
                            </svg>
                            <span>{user.averageStars}</span>
                          </span>
                        </>
                      )}
                    </div>
                    <div className="user-card__footer">
                      <div className="user-card__price">
                        Starting at: ${user.pricePerHours}
                      </div>
                      <button
                        className="user-card__favorite-btn"
                        aria-label="Add to favorites"
                      >
                        <i className="fa fa-heart"></i>
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div>No users found.</div>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Search;
