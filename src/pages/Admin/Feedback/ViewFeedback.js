import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/Custom/Datatable/table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { getFeedbackRecords } from "../../../redux/Actions/adminActions";

const ViewFeedback = () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.authentication);

  const [records, setRecords] = useState([]);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);

  const buttons = [];

  const headers = [
    { id: "0", label: "Name", column: "name" },
    { id: "0", label: "Email", column: "email" },
    { id: "0", label: "Subject", column: "subject" },
    { id: "0", label: "Message", column: "message" },
  ];

  const fetchFeedbackRecords = async (
    pageNumber = 0,
    pageLength = 5,
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
      dispatch(getFeedbackRecords(params))
        .then((response) => {
          const data = response.payload?.data;

          setRecords(data);
          console.log(data);
          setTotalRecords(response.payload?.recordsTotal);
        })
        .catch((error) => {
          setRecords([]);
          setTotalRecords(0);
        });
    } catch (error) {
      console.error("Error fetching feedback records:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchFeedbackRecords(0, pageLength);
  }, [pageLength]);

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xl={10} lg={12} md={10}>
            <Card className="card o-hidden border-0 shadow-lg my-3">
              <CardBody className="p-0">
                <Row>
                  <Col lg={12}>
                    <div className="p-3">
                      <div className="text-center">
                        <h1 className="h3 text-gray-900 m-4 text-bold">
                          Contact Us FeedBacks
                        </h1>
                      </div>
                      <CustomTable
                        headers={headers}
                        records={records ?? []}
                        totalRecords={totalRecord}
                        pageLength={pageLength}
                        buttons={buttons}
                        onPageChange={fetchFeedbackRecords}
                        onPageLengthChange={setPageLength}
                        loader={loader}
                        searchFunctionality={true}
                        pageLengthFunctionality={true}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ViewFeedback;
