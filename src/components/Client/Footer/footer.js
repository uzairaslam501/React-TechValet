import "./style.css";
import "../css/main.css";
import React from "react";
import logo from "../../../assets/images/welcome-logo.png";
import HandleImages from "../../Custom/Avatars/HandleImages";
import { Container, Row, Col, ListGroup, NavLink } from "react-bootstrap";
const Footer = () => {
  return (
    <Container fluid className="bg-white">
      <Container
        className="px-5"
        style={{
          background: "#000",
          borderRadius: "20px",
        }}
      >
        {/*Footer Top*/}
        <Row className="border-1 border-bottom border-light">
          {/*1st Column*/}
          <Col xl={4} lg={4} md={12} sm={12} xs={12} className="pb-5">
            <HandleImages
              imagePath={logo}
              imageStyle={{
                width: "150px",
              }}
            />
            <div className="pt-4">
              <p className="text-white fw-normal fs-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's
              </p>
            </div>
            <div className="footer-social-icons d-flex">
              <NavLink href="facebook.com" target="_blank">
                <i className="bi bi-facebook"></i>
              </NavLink>
              <NavLink href="instagram.com" target="_blank">
                <i className="bi bi-instagram"></i>
              </NavLink>
              <NavLink href="twitter.com" target="_blank">
                <i className="bi bi-twitter"></i>
              </NavLink>
            </div>
          </Col>

          {/*2nd Column*/}
          <Col xl={3} lg={3} md={4} sm={6} xs={6} className="py-5">
            <h4 className="text-white">Pages</h4>
            <ListGroup className="footer-pages-list">
              <ListGroup.Item>
                <NavLink href={"/"}>Home</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink href={"/about"}>About</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink href={"/contact"}>Contact</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink href={"/account"}>Profile</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink href={"/register/valet"}>Valet Registeration</NavLink>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/*3rd Column*/}
          <Col xl={3} lg={3} md={4} sm={6} xs={6} className="py-5">
            <h4 className="text-white">Company</h4>
            <ListGroup className="footer-pages-list">
              <ListGroup.Item>
                <NavLink href={"/skills"}>Skills</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink href={"/blogs"}>Blogs</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink href={"/privacy-policy"}>Privacy Policy</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink href={"/terms-and-conditions"}>
                  Terms And Conditon
                </NavLink>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/*4th Column*/}
          <Col xl={2} lg={2} md={4} sm={12} xs={12} className="py-5">
            <h4 className="text-white">Contact</h4>
            <ListGroup className="footer-pages-list">
              <ListGroup.Item>
                <NavLink href={"/login"}>Login</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink href={"/register/customer"}>Register</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink href={"/forgot-password"}>Forgot Password</NavLink>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        {/*Footer Bottom*/}
        <Row className="py-3">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <p className="text-white">
              Copyright © <span className="text-secondary">Tech Valet</span> -
              Powered and Built By
              <span className="mx-1 text-secondary">Tech Valet Team</span>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
