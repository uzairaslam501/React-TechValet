import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, CardHeader, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getBlogsCount } from "../../../redux/Actions/seoActions";

const SeoDashboard = () => {
  const dispatch = useDispatch();
  const [isCount, setIsCount] = useState([]);
  const fetchCount = useCallback(() => {
    dispatch(getBlogsCount()).then((response) => {
      console.log(response?.payload);
      setIsCount(response?.payload || []);
    });
  });

  useEffect(() => {
    fetchCount();
  }, [dispatch]);

  return (
    <>
      <section className="vh-100 bg-white">
        <Container>
          <Row className="d-flex align-items-center justify-content-center text-center">
            <h3
              className="col-12 fw-bold mb-3"
              style={{ textDecoration: "underline" }}
            >
              Dashboard
            </h3>
            <Col xl={{ span: 4 }}>
              <Card
                className="card-shadow py-4 mb-3"
                style={{
                  background:
                    "linear-gradient( -135deg, #FCD609 10%, #FCD609 20%, #9b9b9b 20%, #9b9b9b 22%, #FFE 20%, #000 24%, #000 30%, #000 4000%)",
                  border: "1px solid #000",
                  borderBottom: "8px solid #000",
                  borderRadius: "20px",
                  height: "180px",
                }}
              >
                <Card.Text className="pt-4 h5 text-white">
                  Total Blogs
                </Card.Text>
                <Card.Body>
                  <Card.Text className="text-white h4">
                    {isCount && isCount.blogCount}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={{ span: 4, offset: 1 }}>
              <Card
                className="card-shadow py-4 mb-3"
                style={{
                  background:
                    "linear-gradient( -135deg, #FCD609 10%, #FCD609 20%, #9b9b9b 20%, #9b9b9b 22%, #FFE 20%, #000 24%, #000 30%, #000 4000%)",
                  border: "1px solid #000",
                  borderBottom: "8px solid #000",
                  borderRadius: "20px",
                  height: "180px",
                }}
              >
                <Card.Text className="pt-4 h5 text-white">
                  Total Skills
                </Card.Text>
                <Card.Body>
                  <Card.Text className="text-white h4">
                    {isCount && isCount.skillCount}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SeoDashboard;
