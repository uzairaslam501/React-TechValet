import React, { useEffect, useState } from "react";
import { Form, Button, Card, Badge } from "react-bootstrap";
import { skillsOptions } from "../../../../../../utils/client/data/requestedData";
import { useDispatch } from "react-redux";
import {
  getRecordById,
  postUpdate,
} from "../../../../../../redux/Actions/globalActions";

const SkillsAndEndorsements = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [userSkills, setUserSkills] = useState("");

  const handleSkillChange = (event) => {
    const selected = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedSkills(selected);
  };

  const updateSkills = () => {
    if (selectedSkills.length === 0) {
      setAlertMessage("Please select at least one skill to update.");
    } else {
      setAlertMessage("");
      const ssss = selectedSkills.join(",");
      updateSkillss();
      console.log("Updated Skills:", ssss);
    }
  };

  const updateSkillss = () => {
    try {
      const ssss = selectedSkills.join(",");
      dispatch(
        postUpdate(
          `User/PostAddUserSkill?SkillName=${ssss}&UserId=${userRecord?.id}`
        ).then((response) => {
          console.log("Update Skills", response?.payload);
        })
      );
    } catch (error) {
      console.log("PostAddUserSkill Error", error);
    } finally {
    }
  };

  const fetchUserSkills = () => {
    dispatch(
      getRecordById(`/User/GetUserSkillByUserId?UserId=${userRecord?.id}`)
    ).then((response) => {
      setUserSkills(response.payload);
      console.log("Skills", response.payload);
    });
  };

  useEffect(() => {
    fetchUserSkills();
  }, [userRecord?.userName]);

  return (
    <Card className="shadow-sm rounded bg-white mb-3">
      <Card.Header className="border-bottom p-3">
        <h6 className="m-0">Skills &amp; Endorsements</h6>
      </Card.Header>
      <Card.Body>
        <div
          className="p-3 border-bottom align-items-left"
          id="mySelectedTagSkill"
        >
          {/* Display selected skills */}
          {userSkills.length > 0 ? (
            <span>
              {userSkills.map((skill, index) => (
                <Badge bg="success" className="fw-normal" key={index}>
                  {skill.skillName}
                </Badge>
              ))}
            </span>
          ) : (
            <p>No skills selected yet.</p>
          )}
        </div>
        <div className="align-items-center osahan-post-header p-3 border-bottom people-list">
          <Form.Group>
            <Form.Label>Add/Update your Skills</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={selectedSkills}
              onChange={handleSkillChange}
              data-placeholder="Select your Skills"
            >
              {skillsOptions.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {alertMessage && <span className="text-danger">{alertMessage}</span>}
          <div className="text-right mt-3">
            <Button
              variant="outline-warning"
              size="sm"
              id="updateSkillsBtn"
              onClick={updateSkills}
            >
              Update Skills
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SkillsAndEndorsements;
