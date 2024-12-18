import React, { useEffect, useState } from "react";
import { Form, Button, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../redux/Reducers/authSlice";
import "./profileImage.css";
import {
  postUserActivity,
  postUserAvailable,
  UpdateProfileImage,
} from "../../../../../redux/Actions/authActions";

const UserProfileImage = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(
    userRecord?.profilePicture ||
      "https://usman78056-001-site7.gtempurl.com/profiles/download-(1)_638646395157341553.png"
  );
  const [status, setStatus] = useState(userRecord?.status);
  const [availability, setAvailability] = useState(userRecord?.availability);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageEvent, setImageEvent] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setImageEvent(file);
    document.getElementById("uploadImageBtnSection").style.display = "block";
  };

  const handleUpdateImage = () => {
    if (imageEvent) {
      dispatch(
        UpdateProfileImage({ userId: userRecord?.userEncId, file: imageEvent })
      ).then((response) => {});
    }
  };

  const handleImageReset = () => {
    setImagePreview(null);
    setProfileImage(
      userRecord?.profilePicture ||
        "https://usman78056-001-site7.gtempurl.com/profiles/download-(1)_638646395157341553.png"
    );
    document.getElementById("uploadImageBtnSection").style.display = "none";
    document.getElementById("imageLoadSection").style.display = "block";
  };

  const handleStatusChange = (value) => {
    if (value === "on") {
      value = "true";
    } else {
      value = "false";
    }
    dispatch(
      postUserActivity({ userId: userRecord?.userEncId, activityStatus: value })
    ).then((response) => {
      if (response?.payload === "1") {
        setStatus(true);
      } else {
        setStatus(false);
      }
    });
  };

  const handleAvailabilityChange = () => {
    dispatch(
      postUserAvailable({
        userId: userRecord?.userEncId,
        available: !availability,
      })
    ).then((response) => {
      if (response?.payload === "1") {
        setAvailability(true);
      } else {
        setAvailability(false);
      }
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setStatus(userRecord?.status === "1" && true);
    setAvailability(userRecord?.availability === "1" && true);
    setImagePreview(userRecord?.profilePicture);
  }, [
    userRecord?.status,
    userRecord?.availability,
    userRecord?.profilePicture,
  ]);

  return (
    <div className="mb-2 shadow rounded bg-white profile-box text-center">
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
          <Button
            onClick={handleUpdateImage}
            className="btn btn-success"
            id="saveImage"
          >
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

      <div className="custom-control custom-switch my-2">
        <Form.Check
          type="switch"
          id="custom-switch-button"
          label={status ? "Online" : "Offline"}
          checked={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        />
        <Form.Check
          type="switch"
          id="custom-switch-button"
          label={availability ? "Available" : "Unavailable"}
          checked={availability}
          onChange={handleAvailabilityChange}
        />
      </div>

      {/* Logout Link */}
      <Button
        type="button"
        variant="link"
        onClick={() => handleLogout()}
        className="text-dark w-100 border-top my-2"
      >
        Log Out
      </Button>
    </div>
  );
};

export default UserProfileImage;
