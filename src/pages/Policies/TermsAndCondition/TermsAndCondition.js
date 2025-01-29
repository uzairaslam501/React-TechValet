import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const TermsAndConditions = () => {
  return (
    <Container fluid>
      <Row className="bg-white py-5">
        <Col
          xl={{ span: 10, offset: 1 }}
          lg={{ span: 10, offset: 1 }}
          md={{ span: 10, offset: 1 }}
          sm={12}
          xs={12}
        >
          <Card className="border-0">
            <Card.Body>
              <h2 className="text-center">Tech Valet's Terms of Service</h2>
              <p className="text-muted text-center">Last update: July 2024</p>
              <p>
                The following terms of service (these "Terms of Service"),
                govern your access to and use of the Tech Valet website and
                mobile application, including any content, functionality, and
                services offered on or through www.TechValet.com or the Tech
                Valet mobile application (the "Site").
              </p>

              <h4>1. Representations and Warranties</h4>
              <p>
                This Site is offered and available to users who are at least 18
                years of age and of legal age to form a binding contract. If you
                are under 18 and at least 13 years of age, you are only
                permitted to use the Site through an account owned by a parent
                or legal guardian.
              </p>

              <h4>2. Key Terms</h4>
              <ul>
                <li>
                  <strong>Buyers</strong>: Users who purchase services on Tech
                  Valet.
                </li>
                <li>
                  <strong>Custom Offers</strong>: Exclusive proposals that a
                  Seller can create in response to specific requirements.
                </li>
                <li>
                  <strong>Gig® Extras</strong>: Additional services offered on
                  top of the Seller’s Gig for an extra fee.
                </li>
                <li>
                  <strong>Orders</strong>: The formal agreements between a Buyer
                  and Seller.
                </li>
              </ul>

              <h4>3. Overview (Main Terms, in a Nutshell)</h4>
              <ul>
                <li>Only registered users may buy and sell on Tech Valet.</li>
                <li>
                  Sellers determine their pricing, at their sole discretion.
                </li>
                <li>
                  Services on Tech Valet may be offered at a base starting price
                  of $5.
                </li>
              </ul>

              <p className="mt-4">
                By using the Site, you accept and agree to abide by these Terms
                of Service. If you have any questions, please contact our
                Customer Support team.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsAndConditions;
