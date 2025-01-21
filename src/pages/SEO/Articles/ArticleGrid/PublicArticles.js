import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";
import { truncateCharacters } from "../../../../utils/_helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBlogsList } from "../../../../redux/Actions/seoActions";
import HandleImages from "../../../../components/Custom/Avatars/HandleImages";

const PublicArticles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalRecord, setTotalRecords] = useState(0);
  const [articlesRecord, setArticlesRecord] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageLength, setPageLength] = useState(12);
  const [currentPage, setCurrentPage] = useState(0); // Start from 0

  const totalPages = Math.ceil(totalRecord / pageLength);

  const fetchRecords = async (
    pageNumber = 0,
    pageLength = 12,
    sortColumn = "",
    sortDirection = "",
    searchParam = ""
  ) => {
    const params = {
      pageNumber,
      pageLength,
      sortColumn,
      sortDirection,
      searchParam,
    };

    try {
      setLoader(true);
      dispatch(getBlogsList(params))
        .then((response) => {
          setArticlesRecord(response.payload?.data);
          setTotalRecords(response.payload?.recordsTotal);
        })
        .catch((error) => {
          setArticlesRecord([]);
          setTotalRecords(0);
        });
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchRecords(currentPage, pageLength);
  }, [currentPage, pageLength]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="bg-white py-5">
      <Container
        className="py-4"
        style={{
          background: "#f9f9f9",
        }}
      >
        <Row className="g-4">
          {articlesRecord.map((article, index) => (
            <Col key={index} xl={3} lg={3} md={4} sm={12}>
              <Card
                className="shadow-sm h-100 p-3"
                style={{
                  borderRadius: "20px",
                }}
              >
                <HandleImages
                  imagePath={article.image}
                  imageAlt={article.title}
                  className="top"
                  imageStyle={{
                    width: "100%",
                    height: "170px",
                    borderRadius: "15px",
                  }}
                  onClick={() =>
                    navigate(`/article/${article.slug}`, { state: article })
                  }
                />
                <Card.Body className="px-0">
                  <Card.Title
                    onClick={() =>
                      navigate(`/article/${article.slug}`, { state: article })
                    }
                    title={article.title}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {truncateCharacters(article.title, 27)}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {truncateCharacters(article.description, 50)}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="border-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <HandleImages
                        imagePath={article?.publisherImage}
                        imageAlt={article?.publishedBy}
                        imageStyle={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "5px",
                        }}
                      />
                      <div className="mx-2">
                        <h5 className="text-dark text-capitalize mb-1">
                          {article?.publishedBy}
                        </h5>
                        <p className="m-0 text-muted">
                          {article?.publishedDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <i className="bi bi-bookmark"></i>
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <Row>
          <Col className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index === currentPage}
                  onClick={() => handlePageChange(index)}
                >
                  {index + 1} {/* Display page as 1-based */}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default PublicArticles;
