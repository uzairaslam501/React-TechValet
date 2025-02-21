import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { requestGetUserPackages } from "../../../../redux/Actions/customerActions";
import PaymentDialogue from "./Payments/PaymentDialogue";

const PackageSelection = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [totalRemainings, setTotalRemainings] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleShowModal = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedPackage(null);
    setShowModal(false);
  };

  const fetchPackages = () => {
    try {
      dispatch(requestGetUserPackages()).then((response) => {
        setTotalRemainings(response.payload);
      });
    } catch (error) {
      console.log("error:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [dispatch]);

  return (
    <>
      <Container className="text-center py-5">
        <h1 className="fw-bold">Hi Customer,</h1>
        <h3 className="fw-semi-bold">Choose a Package</h3>
        <p className="lead text-dark">
          <strong>Note:</strong> Once a 1-Year or 2-Year Package has been
          bought, the option to buy a new package will be disabled until the
          previous packages have been utilized.
        </p>

        <Row className="pt-5 d-flex justify-content-center">
          <Col md={5}>
            <Card className="shadow p-5">
              <div className="pb-3 display-4">
                <i className="bi bi-calendar3" aria-hidden="true"></i>
              </div>
              <h5 className="fw-bold">One Year Package</h5>
              <p className="text-muted">
                6 sessions available anytime within a year
              </p>
              <h6 style={{ fontSize: "30px" }} className="fw-bold">
                $100
              </h6>
              <Button
                variant="primary-secondary"
                size="lg"
                className="my-3"
                onClick={() => handleShowModal("one-year")}
                disabled={totalRemainings > 0}
              >
                Buy Package
              </Button>
            </Card>
          </Col>

          <Col
            md={2}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="separator__line"></div>
            <strong className="mx-2">Or</strong>
            <div className="separator__line"></div>
          </Col>

          <Col md={5}>
            <Card className="shadow p-5">
              <div className="pb-3 display-4">
                <i className="bi bi-calendar3" aria-hidden="true"></i>
              </div>
              <h5 className="fw-bold">Two Year Package</h5>
              <p className="text-muted">
                12 sessions available anytime within 2 years
              </p>
              <h6 style={{ fontSize: "30px" }} className="fw-bold">
                $200
              </h6>
              <Button
                variant="primary-secondary"
                size="lg"
                className="my-3"
                onClick={() => handleShowModal("two-year")}
                disabled={totalRemainings > 0}
              >
                Buy Package
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>

      <PaymentDialogue
        selectedPackage={selectedPackage}
        showModal={showModal}
        handleClose={handleClose}
        setIsDisabled={setIsDisabled}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default PackageSelection;
