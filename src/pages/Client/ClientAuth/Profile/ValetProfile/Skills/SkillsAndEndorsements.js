import React, { useEffect, useState } from "react";
import { Form, Button, Card, Badge, Col, Row } from "react-bootstrap";
import { skillsOptions } from "../../../../../../utils/client/data/requestedData";
import { useDispatch } from "react-redux";
import CustomDropdown from "../../../../../../components/Custom/Dropdown/Dropdown";
import {
  getUserSkills,
  postAddUserSkill,
} from "../../../../../../redux/Actions/authActions";
import { deleteRecords } from "../../../../../../redux/Actions/globalActions";
import DeleteComponent from "../../../../../../components/Custom/DeleteDialoge/DeleteDialoge";

const SkillsAndEndorsements = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [userSkills, setUserSkills] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [skillsUpdated, setSkillsUpdated] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
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
        setSkillsUpdated(true);
      })
      .catch((error) => console.log("PostAddUserSkill Error", error));
  };

  const fetchUserSkills = () => {
    dispatch(getUserSkills(userRecord?.userEncId))
      .then((response) => {
        if (response?.payload.length <= 1) {
          setDisplayDeleteButton(true);
        } else {
          setDisplayDeleteButton(false);
        }
        setUserSkills(response.payload);
      })
      .catch((error) => console.log("Fetch User Skills Error", error));
  };

  // Handle deleting a skills
  const handleDeleteSkills = (skillId) => {
    setRecordToDelete(skillId);
    setShowDialog(true);
  };

  const confirmDelete = (skillId) => {
    const endpoint = skillId && `/User/Delete/${encodeURIComponent(skillId)}`;

    dispatch(deleteRecords(endpoint))
      .then((response) => {
        if (response?.payload) {
          setUserSkills((prev) =>
            prev.filter((skill) => skill.userSkillEncId !== skillId)
          );
          if (userSkills.length - 1 <= 1) {
            setDisplayDeleteButton(true);
          }
        }
        setShowDialog(false);
      })
      .catch((error) => console.log("Delete Skills Error", error));
  };

  useEffect(() => {
    fetchUserSkills();
    setSkillsUpdated(false);
  }, [skillsUpdated]);

  return (
    <>
      <Card className="shadow rounded mb-3">
        <Card.Header className="p-3">
          <h6 className="m-0">Skills &amp; Endorsements</h6>
        </Card.Header>
        <Card.Body>
          <div
            className="py-3 border-bottom"
            style={{ maxHeight: "75px", overflowY: "scroll" }}
          >
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
                          onClick={() =>
                            handleDeleteSkills(skill.userSkillEncId)
                          }
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

          <Row className="py-2">
            <Form.Label>Add your Skills</Form.Label>
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-2">
              <Form.Group>
                <CustomDropdown
                  optionsList={availableSkills} // Use filtered available skills
                  selectedOptions={selectedUserSkills}
                  handleChange={handleSkillChange}
                  isMultiSelect
                  isSearchable
                  fieldName="Skill"
                />
              </Form.Group>
              {alertMessage && (
                <span className="text-danger">{alertMessage}</span>
              )}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <Button
                variant="primary"
                id="updateSkillsBtn"
                className="w-100"
                onClick={handleAddSkills}
              >
                Add Skills
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <DeleteComponent
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onDelete={confirmDelete}
        item={recordToDelete}
      />
    </>
  );
};

export default SkillsAndEndorsements;
