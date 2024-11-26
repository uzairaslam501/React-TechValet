import React, { useEffect, useState } from "react";
import { Form, Button, Card, Badge } from "react-bootstrap";
import { skillsOptions } from "../../../../../../utils/client/data/requestedData";
import { useDispatch } from "react-redux";
import {
  getRecordById,
  postUpdate,
} from "../../../../../../redux/Actions/globalActions";
import CustomDropdown from "../../../../../../components/Custom/Dropdown/Dropdown";

const SkillsAndEndorsements = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState("");
  const [userSkills, setUserSkills] = useState("");
  const [selectedUserSkills, setSelectedUserSkills] = useState([]);

  const handleSkillChange = (val) => {
    setSelectedUserSkills(val);
  };

  const handleUpdateSkills = () => {
    if (selectedUserSkills.length === 0) {
      setAlertMessage("Please select at least one skill to update.");
    } else {
      setAlertMessage("");
      console.log("Updated Skills:", selectedUserSkills.join(","));
      updateUserSkills();
    }
  };

  const updateUserSkills = () => {
    try {
      const userSkillsCommaSeperated = selectedUserSkills.join(",");
      dispatch(
        postUpdate(
          `/User/PostAddUserSkill?SkillName=${userSkillsCommaSeperated}&UserId=${userRecord?.id}`
        )
      ).then((response) => {
        console.log("Update Skills", response?.payload);
      });
    } catch (error) {
      console.log("PostAddUserSkill Error", error);
    }
  };

  const fetchUserSkills = () => {
    dispatch(
      getRecordById(`/User/GetUserSkillByUserId?UserId=${userRecord?.id}`)
    ).then((response) => {
      setUserSkills(response.payload);
      setSelectedUserSkills(response.payload.map((skill) => skill.skillName));
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
            {/* <Form.Control
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
            </Form.Control> */}
            <CustomDropdown
              optionsList={skillsOptions}
              selectedOptions={selectedUserSkills || []}
              handleChange={handleSkillChange}
              isMultiSelect={true}
              isSearchable={true}
              fieldName="Skill"
            />
          </Form.Group>
          {alertMessage && <span className="text-danger">{alertMessage}</span>}
          <div className="text-right mt-3">
            <Button
              variant="outline-warning"
              size="sm"
              id="updateSkillsBtn"
              onClick={handleUpdateSkills}
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
