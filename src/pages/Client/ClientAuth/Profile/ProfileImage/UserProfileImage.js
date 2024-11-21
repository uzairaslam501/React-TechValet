import React, { useState } from "react";
import {
  Form,
  Button,
  Image,
  Tooltip,
  OverlayTrigger,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../redux/Reducers/authSlice";
import "./profileImage.css";

const UserProfileImage = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(
    userRecord?.ProfilePicture ||
      "https://usman78056-001-site7.gtempurl.com/profiles/download-(1)_638646395157341553.png"
  );
  const [status, setStatus] = useState(userRecord?.Status === "1");
  const [availability, setAvailability] = useState(
    userRecord?.Availability === "1"
  );
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    document.getElementById("uploadImageBtnSection").style.display = "block";
  };

  const handleImageReset = () => {
    setImagePreview(null);
    setProfileImage(
      userRecord?.ProfilePicture ||
        "https://usman78056-001-site7.gtempurl.com/profiles/download-(1)_638646395157341553.png"
    );
    document.getElementById("uploadImageBtnSection").style.display = "none";
    document.getElementById("imageLoadSection").style.display = "block";
  };

  const handleStatusChange = () => {
    setStatus(!status);
  };

  const handleAvailabilityChange = () => {
    setAvailability(!availability);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="mb-3 shadow-sm rounded bg-white profile-box text-center">
      <div className="py-4 px-3">
        <Image
          src={imagePreview || profileImage}
          id="previewImg"
          roundedCircle
          alt="Profile"
          className="mb-3"
          style={{ width: "250px", height: "250px" }}
        />
        <h5 className="font-weight-bold text-dark mb-1">
          {userRecord?.FirstName} {userRecord?.LastName}
        </h5>
      </div>

      {/* Image Upload Form */}
      <Form
        action="/User/UploadProfileImage"
        id="uploadProfileImageForm"
        method="post"
        encType="multipart/form-data"
      >
        <div className="pb-3" id="imageLoadSection">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Upload New Picture</Tooltip>}
          >
            <label className="btn btn-success m-0" htmlFor="fileAttachmentBtn">
              <i className="mdi mdi-image"></i> Upload Photo
              <input
                id="fileAttachmentBtn"
                name="ImagePath"
                type="file"
                className="d-none"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </OverlayTrigger>
        </div>

        {/* Update Image Section */}
        <div
          className="pb-3"
          id="uploadImageBtnSection"
          style={{ display: "none" }}
        >
          <Button className="btn btn-success" id="saveImage">
            Update Image
          </Button>
          <Button
            variant="danger"
            className="text-white mx-2"
            onClick={handleImageReset}
            id="imgReset"
          >
            Reset
          </Button>
        </div>
      </Form>

      <Row>
        <Col>
          <div className="custom-control custom-switch my-2">
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch-button"
              label={status ? "Online" : "Offline"}
              checked={status}
              onChange={handleStatusChange}
            />

            {/* Availability Toggle */}
            <Form.Check
              type="switch"
              id="custom-switch-button"
              label={availability ? "Available" : "Unavailable"}
              checked={availability}
              onChange={handleAvailabilityChange}
            />
          </div>
        </Col>
      </Row>

      {/* Logout Link */}
      <Row className="border-top py-2">
        <Col>
          <Button
            type="button"
            variant="link"
            onClick={() => handleLogout()}
            className="text-dark w-100"
          >
            Log Out
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfileImage;
