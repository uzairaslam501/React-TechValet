import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getKeywords } from "../../../redux/Actions/customerActions";
import { capitalizeFirstLetter } from "../../../utils/_helpers";

const SearchFilter = () => {
  const { userAuth } = useSelector((state) => state?.authentication);
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    getKeyword();
  }, [userAuth?.token]);

  const getKeyword = async () => {
    const response = await dispatch(getKeywords());
    setKeywords(response?.payload || []); // Ensure fallback to an empty array if response is undefined
  };
  return (
    <>
      <Form>
        <Row class="form-row">
          <Col lg={10} class="form-group">
            <input
              name="searchKeyword"
              type="text"
              placeholder="Find Services..."
              class="form-control border-0 form-control-lg shadow-sm"
              required
            />
          </Col>
          <Col lg={2} class="form-group">
            <Button
              type="submit"
              className="btn-block btn-lg shadow-sm custom-button"
            >
              <i class="fa fa-search"></i>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="py-2">
        <Col lg={12}>
          {keywords.length > 0 &&
            keywords.map((keyword, index) => (
              <button key={index} className="badge custom-section p-2">
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
