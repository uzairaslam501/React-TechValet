import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserForSkills } from "../../../../redux/Actions/customerActions";
import TopImageCarousal from "../../../../components/Custom/CarousalWithTopImage/topImageCarousal";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const RequestedUsers = ({ skills }) => {
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await dispatch(getUserForSkills(skills)).unwrap();
        if (response && response.length > 0) {
          setUsers(response);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setUserLoading(false);
      }
    };

    if (skills) {
      fetchUsers();
    }
  }, [skills, dispatch]);

  return (
    <Container className="mb-5">
      <Row>
        <Col>
          {userLoading ? (
            <>
              <div className="text-center">
                <Spinner animation="grow" />
              </div>
            </>
          ) : users.length > 0 ? (
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
