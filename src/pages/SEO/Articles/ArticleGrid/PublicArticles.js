import React, { useEffect, useState } from "react";
import { Container, Row, Col, Pagination, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getBlogsList } from "../../../../redux/Actions/seoActions";
import CustomCard from "../../../../components/Custom/Cards/CustomCard";

const PublicArticles = () => {
  const dispatch = useDispatch();
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

    setLoader(true);
    dispatch(getBlogsList(params))
      .then((response) => {
        setArticlesRecord(response.payload?.data);
        setTotalRecords(response.payload?.recordsTotal);
        setLoader(false);
      })
      .catch((error) => {
        setArticlesRecord([]);
        setTotalRecords(0);
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchRecords(currentPage, pageLength);
  }, [currentPage, pageLength]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="bg-white py-5" style={{ minHeight: "100vh" }}>
      {!loader ? (
        <Container
          className="py-4"
          style={{
            background: "#f9f9f9",
          }}
        >
          <Row className="g-4">
            {articlesRecord && articlesRecord.length > 0 ? (
              articlesRecord.map((article, index) => (
                <Col key={index} xl={3} lg={3} md={4} sm={12}>
                  <CustomCard article={article} />
                </Col>
              ))
            ) : (
              <>
                <Col xl={12} lg={12} md={12} sm={12} className="text-center">
                  <h3>No Record Found</h3>
                </Col>
              </>
            )}
          </Row>
          {articlesRecord && articlesRecord.length > 0 && (
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
          )}
        </Container>
      ) : (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
    </Container>
  );
};

export default PublicArticles;
