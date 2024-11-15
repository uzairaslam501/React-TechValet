import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserForSkills } from "../../../../redux/Actions/customerActions";
import TopImageCarousal from "../../../../components/Custom/CarousalWithTopImage/topImageCarousal";
import { Container, Row, Col } from "react-bootstrap";

const RequestedUsers = ({ skills }) => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await dispatch(getUserForSkills(skills)).unwrap();
        if (response && response.length > 0) {
          console.log("Fetched Users:", response);
          setUsers(response);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    if (skills) {
      fetchUsers();
    }
  }, [skills, dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          {users.length > 0 ? (
            <TopImageCarousal label="Skilled Users" users={users} />
          ) : (
            <p>No users found</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RequestedUsers;
