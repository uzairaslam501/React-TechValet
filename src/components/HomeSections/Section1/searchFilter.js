import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getKeywords } from "../../../redux/Actions/customerActions";
import { capitalizeFirstLetter } from "../../../utils/_helpers";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SearchFilter = () => {
  const { userAuth } = useSelector((state) => state?.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [keywords, setKeywords] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // State for the search input

  useEffect(() => {
    if (userAuth?.token) {
      getKeyword();
    }
  }, [userAuth?.token]);

  const getKeyword = async () => {
    try {
      const response = await dispatch(getKeywords());
      setKeywords(response?.payload || []);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchKeyword) {
      navigate(`/search/${encodeURIComponent(searchKeyword)}`); // Navigate to the search page with the search keyword
    }
  };

  const clickKeword = (searchedValue) => {
    if (searchedValue) {
      navigate(`/search/${encodeURIComponent(searchedValue)}`); // Navigate to the search page with the search keyword
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="form-row">
          <Col lg={10} className="form-group">
            <input
              name="searchKeyword"
              type="text"
              placeholder="Find Services..."
              className="form-control border-0 form-control-lg shadow-sm"
              required
              value={searchKeyword} // Bind the input value
              onChange={(e) => setSearchKeyword(e.target.value)} // Update state on input change
            />
          </Col>
          <Col lg={2} className="form-group">
            <Button
              type="submit"
              className="btn-block btn-lg shadow-sm custom-button"
            >
              <i className="fa fa-search"></i>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="py-2">
        <Col lg={12}>
          {keywords.length > 0 &&
            keywords.map((keyword) => (
              <button
                key={keyword}
                onClick={() => clickKeword(keyword)}
                className="badge custom-section p-2"
              >
                <span style={{ fontWeight: 300 }}>
                  {capitalizeFirstLetter(keyword)}
                </span>
              </button>
            ))}
        </Col>
      </Row>
    </>
  );
};

export default SearchFilter;
