import React from "react";
import { Container, Row, Card, Col } from "react-bootstrap";

const PrivacyPolicy = () => {
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
              <Card.Title as="h1" className="text-center mb-4">
                Privacy Policy
              </Card.Title>
              <Card.Text>
                <strong>Last Updated:</strong> [Insert Date]
              </Card.Text>
              <Card.Text>
                Welcome to [Your App Name]! This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                use our platform. Please read this policy carefully. If you do
                not agree with the terms, please do not access or use the
                platform.
              </Card.Text>

              <Card.Title as="h2">1. Information We Collect</Card.Title>
              <Card.Text>
                We may collect the following types of information:
                <ul>
                  <li>
                    <strong>Personal Information:</strong> Name, email address,
                    phone number, payment information, and other details you
                    provide when registering or using our services.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you
                    interact with our platform, such as IP address, browser
                    type, pages visited, and time spent on the site.
                  </li>
                  <li>
                    <strong>Cookies and Tracking Technologies:</strong> We use
                    cookies and similar technologies to enhance your experience
                    and analyze platform usage.
                  </li>
                </ul>
              </Card.Text>

              <Card.Title as="h2">2. How We Use Your Information</Card.Title>
              <Card.Text>
                We use the information we collect for the following purposes:
                <ul>
                  <li>To provide, operate, and maintain our platform.</li>
                  <li>To improve, personalize, and expand our services.</li>
                  <li>To process transactions and send related information.</li>
                  <li>
                    To communicate with you, including responding to inquiries
                    and sending updates.
                  </li>
                  <li>To monitor and analyze usage trends and preferences.</li>
                </ul>
              </Card.Text>

              <Card.Title as="h2">3. Sharing Your Information</Card.Title>
              <Card.Text>
                We may share your information in the following situations:
                <ul>
                  <li>
                    With service providers who assist us in operating our
                    platform.
                  </li>
                  <li>
                    To comply with legal obligations or protect our rights.
                  </li>
                  <li>With your consent or at your direction.</li>
                </ul>
              </Card.Text>

              <Card.Title as="h2">4. Data Security</Card.Title>
              <Card.Text>
                We implement reasonable security measures to protect your
                information. However, no method of transmission over the
                internet or electronic storage is 100% secure.
              </Card.Text>

              <Card.Title as="h2">5. Your Rights</Card.Title>
              <Card.Text>
                Depending on your location, you may have the following rights
                regarding your data:
                <ul>
                  <li>Access, update, or delete your personal information.</li>
                  <li>Opt-out of certain data collection or processing.</li>
                  <li>Object to the processing of your data.</li>
                </ul>
              </Card.Text>

              <Card.Title as="h2">6. Third-Party Links</Card.Title>
              <Card.Text>
                Our platform may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                sites.
              </Card.Text>

              <Card.Title as="h2">7. Changes to This Privacy Policy</Card.Title>
              <Card.Text>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on this
                page.
              </Card.Text>

              <Card.Title as="h2">8. Contact Us</Card.Title>
              <Card.Text>
                If you have any questions about this Privacy Policy, please
                contact us at [Your Contact Information].
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
