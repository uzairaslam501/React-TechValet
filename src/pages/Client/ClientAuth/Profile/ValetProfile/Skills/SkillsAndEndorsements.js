import React, { useEffect, useState } from "react";
import { Form, Button, Card, Badge } from "react-bootstrap";
import { skillsOptions } from "../../../../../../utils/client/data/requestedData";
import { useDispatch } from "react-redux";
import CustomDropdown from "../../../../../../components/Custom/Dropdown/Dropdown";
import {
  getUserSkills,
  postAddUserSkill,
} from "../../../../../../redux/Actions/authActions";
import { deleteRecords } from "../../../../../../redux/Actions/globalActions";

const SkillsAndEndorsements = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState("");
  const [userSkills, setUserSkills] = useState([]);
  const [selectedUserSkills, setSelectedUserSkills] = useState([]);
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);

  // Filter out already selected skills from dropdown options
  const availableSkills = skillsOptions.filter(
    (skill) =>
      !userSkills.some((userSkill) => userSkill.skillName === skill.value)
  );

  const handleSkillChange = (val) => setSelectedUserSkills(val);

  const handleAddSkills = () => {
    if (selectedUserSkills.length === 0) {
      setAlertMessage("Please select at least one skill to update.");
    } else {
      setAlertMessage("");
      addUpdateUserSkills();
    }
  };

  const addUpdateUserSkills = () => {
    const userSkillsCommaSeparated = selectedUserSkills.join(",");
    dispatch(
      postAddUserSkill({
        userId: userRecord?.userEncId,
        skillsName: userSkillsCommaSeparated,
      })
    )
      .then(() => {
        setSelectedUserSkills([]);
        fetchUserSkills();
      })
      .catch((error) => console.log("PostAddUserSkill Error", error));
  };

  const fetchUserSkills = () => {
    dispatch(getUserSkills(userRecord?.userEncId))
      .then((response) => {
        if (response?.payload.length <= 1) {
          setDisplayDeleteButton(true);
        }
        setUserSkills(response.payload);
      })
      .catch((error) => console.log("Fetch User Skills Error", error));
  };

  const handleDeleteSkills = (skillId) => {
    const endpoint = skillId && `/User/Delete/${encodeURIComponent(skillId)}`;

    dispatch(deleteRecords(endpoint))
      .then(() => {
        setUserSkills((prev) =>
          prev.filter((skill) => skill.userSkillEncId !== skillId)
        );
        if (userSkills.length - 1 <= 1) {
          setDisplayDeleteButton(true);
        }
      })
      .catch((error) => console.log("Delete Skills Error", error));
  };

  useEffect(() => {
    fetchUserSkills();
  }, [userRecord?.userName]);

  return (
    <Card className="shadow-sm rounded bg-white mb-3">
      <Card.Header className="border-bottom p-3 d-flex justify-content-between align-items-center">
        <h6 className="m-0">Skills &amp; Endorsements</h6>
      </Card.Header>
      <Card.Body>
        <div className="p-3 border-bottom align-items-left">
          {/* Display selected skills */}
          {userSkills.length > 0 ? (
            <div className="d-flex flex-wrap">
              {userSkills.map((skill, index) => (
                <div key={index} className="me-2 mb-2">
                  {!displayDeleteButton ? (
                    <Badge bg="success ps-2 p-0" className="fw-normal">
                      {skill.skillName}
                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-2 p-1"
                        title="Delete"
                        onClick={() => handleDeleteSkills(skill.userSkillEncId)}
                      >
                        <i className="bi bi-x-circle"></i>
                      </Button>
                    </Badge>
                  ) : (
                    <Badge bg="success p-2" className="fw-normal">
                      {skill.skillName}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No skills selected yet.</p>
          )}
        </div>

        <div className="align-items-center osahan-post-header p-3 border-bottom people-list">
          <Form.Group>
            <Form.Label>Add your Skills</Form.Label>
            <CustomDropdown
              optionsList={availableSkills} // Use filtered available skills
              selectedOptions={selectedUserSkills}
              handleChange={handleSkillChange}
              isMultiSelect
              isSearchable
              fieldName="Skill"
            />
          </Form.Group>
          {alertMessage && <span className="text-danger">{alertMessage}</span>}
          <div className="text-right mt-3">
            <Button
              variant="outline-warning"
              size="sm"
              id="updateSkillsBtn"
              onClick={handleAddSkills}
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
