import React, { useEffect, useState } from "react";
import { Container, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getKeywords } from "../../../../../redux/Actions/customerActions";
import { capitalizeFirstLetter } from "../../../../../utils/_helpers";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { userAuth } = useSelector((state) => state?.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const getKeyword = async () => {
    try {
      const response = await dispatch(getKeywords());
      setKeywords(response?.payload || []);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword) {
      navigate(`/search/${encodeURIComponent(searchKeyword)}`);
    }
  };

  const clickKeword = (searchedValue) => {
    if (searchedValue) {
      navigate(`/search/${encodeURIComponent(searchedValue)}`);
    }
  };

  useEffect(() => {
    getKeyword();
  }, [userAuth]);

  return (
    <Container className="p-md-0">
      <Form onSubmit={handleSubmit} className="form-row">
        <Row>
          <Col lg={10} className="form-group pe-md-0">
            <input
              name="searchKeyword"
              style={{
                backgroundColor: "#f9f9f9",
                border: "1px solid #999",
                borderRadius: "0",
              }}
              type="text"
              placeholder="Find Services..."
              className="form-control form-control-lg shadow-sm"
              required
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </Col>
          <Col lg={2} className="form-group ps-md-0">
            <Button
              type="submit"
              className="btn-block btn-lg shadow-sm custom-button w-100"
              style={{
                borderRadius: "0",
                border: "1px solid #999",
              }}
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
    </Container>
  );
};

export default SearchBar;
