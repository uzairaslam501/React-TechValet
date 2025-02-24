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
          <strong className="text-primary">Note:</strong> Once a 1-Year or
          2-Year Package has been bought,{" "}
          <span className="text-primary">
            the option to buy a new package will be disabled until the previous
            packages have been utilized.
          </span>
        </p>

        <Row className="pt-5 d-flex justify-content-center">
          <Col md={5}>
            <Card className="shadow p-5">
              <div className="pb-3 display-4">
                <i className="bi bi-calendar3" aria-hidden="true"></i>
              </div>
              <h5 className="text-primary">1-Year Valet Package</h5>
              <ul className="text-start">
                <li>
                  Valid for <strong>1 year</strong> from the date of purchase.
                </li>
                <li>
                  Includes <strong>6 valet sessions</strong>, each lasting{" "}
                  <strong>1 hour</strong> (total <strong>6 hours</strong>).
                </li>
                <li>Can be used as payment when booking a valet.</li>
                <li>
                  Sessions can be scheduled at any time within the validity
                  period, subject to availability.
                </li>
                <li>
                  Ideal for users who require valet services occasionally
                  throughout the year.
                </li>
              </ul>
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
              <h5 className="text-primary">2-Year Valet Package</h5>
              <ul className="text-start">
                <li>
                  Valid for <strong>2 years</strong> from the date of purchase.
                </li>
                <li>
                  Includes <strong>12 valet sessions</strong>, each lasting{" "}
                  <strong>1 hour</strong> (total <strong>12 hours</strong>).
                </li>
                <li>Can be used as payment when booking a valet.</li>
                <li>
                  Provides extended flexibility for long-term valet service
                  needs.
                </li>
                <li>
                  A cost-effective choice for users who need regular valet
                  assistance over a longer period.
                </li>
              </ul>
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
