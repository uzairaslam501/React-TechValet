import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { requestGetUserPackages } from "../../../../redux/Actions/customerActions";
import Dialogue from "../../../../components/Custom/Modal/modal";

const PackageSelection = () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state?.authentication);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [totalRemainings, setTotalRemainings] = useState();

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
        console.log("requestGetUserPackages", response);
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

  const handleCloseModal = () => setShowModal(false);

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
            <Card className="bg-white rounded shadow-sm p-5">
              <div className="pb-3 display-4">
                <i className="bi bi-calendar3" aria-hidden="true"></i>
              </div>
              <h5 className="fw-bold">One Year Package</h5>
              <p className="text-muted">
                6 sessions available anytime within a year
              </p>
              <h6 style={{ fontSize: "30px" }}>$100</h6>
              <Button
                variant="primary-secondary"
                size="lg"
                block
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
            <Card className="bg-white rounded shadow-sm p-5">
              <div className="pb-3 display-4">
                <i className="bi bi-calendar3" aria-hidden="true"></i>
              </div>
              <h5 className="fw-bold">Two Year Package</h5>
              <p className="text-muted">
                12 sessions available anytime within 2 years
              </p>
              <h6 style={{ fontSize: "30px" }}>$200</h6>
              <Button
                variant="primary-secondary"
                size="lg"
                block
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

      <Dialogue
        show={showModal}
        onHide={handleClose}
        headerClass=""
        modalBodyClass="p-0"
        title={
          selectedPackage === "one-year"
            ? "One Year Package"
            : "Two Year Package"
        }
        size="md"
        bodyContent={
          <>
            <Form
              id="stripe-Form"
              action="/User/StripeCheckoutForPackage"
              method="post"
            >
              <Form.Control type="hidden" name="ClientId" value={userAuth.id} />
              <Form.Control
                type="hidden"
                className="stripePackageInput"
                name="SelectedPackage"
                id="selectedPackageInput"
                value={selectedPackage}
              />
              <script
                src="https://checkout.stripe.com/v2/checkout.js"
                className="stripe-button"
                style={{ marginLeft: "20px" }}
                data-key="pk_test_51LdJU1JGItIO6che36z9ZVzXobOZwgqCGtjhNU1Xh5jj8rYrwrkjwl4ZvvpZvtEwygS5c51cl4abkLAliD9HZe0400fAG3WJm9"
                data-label="Pay With Stripe"
                data-description="Buy Package"
                data-amount=""
              ></script>
            </Form>
          </>
        }
        backdrop="static"
        showFooter={false}
      />
    </>
  );
};

export default PackageSelection;
