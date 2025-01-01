import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getKeywords } from "../../../../../redux/Actions/customerActions";
import { capitalizeFirstLetter } from "../../../../../utils/_helpers";
import { useNavigate } from "react-router-dom";

const Keywords = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState([]);
  const { userAuth } = useSelector((state) => state?.authentication);

  const getKeyword = async () => {
    try {
      const response = await dispatch(getKeywords());
      setKeywords(response?.payload || []);
    } catch (error) {
      console.error("Error fetching keywords:", error);
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
    <Row className="py-2">
      <Col lg={12}>
        {keywords.length > 0 &&
          keywords.map((keyword) => (
            <button
              key={keyword}
              onClick={() => clickKeword(keyword)}
              className="badge custom-section py-2 px-4"
            >
              <span style={{ fontWeight: 300 }}>
                {capitalizeFirstLetter(keyword)}
              </span>
            </button>
          ))}
      </Col>
    </Row>
  );
};

export default Keywords;
