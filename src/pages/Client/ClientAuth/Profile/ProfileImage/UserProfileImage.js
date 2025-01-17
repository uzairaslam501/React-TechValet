import React, { useEffect, useState } from "react";
import { Form, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../../redux/Reducers/authSlice";
import "./profileImage.css";
import {
  postUserActivity,
  postUserAvailable,
  UpdateProfileImage,
} from "../../../../../redux/Actions/authActions";
import HandleImages from "../../../../../components/Custom/Avatars/HandleImages";
import { toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";

const UserProfileImage = ({ userRecord, preview = false }) => {
  console.log(userRecord);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageEvent, setImageEvent] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState(userRecord?.status);
  const { userAuth } = useSelector((state) => state?.authentication);
  const [profileImage, setProfileImage] = useState(userRecord?.profilePicture);
  const [availability, setAvailability] = useState(userRecord?.availability);

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

  const handleStatusChange = () => {
    dispatch(
      postUserActivity({
        userId: userRecord?.userEncId,
        activityStatus: !status,
      })
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

  const handleCopyReferral = async () => {
    const systemUrl = `${window.location.origin}`;
    const textToCopy = `${systemUrl}?referredBy=${userRecord?.userName}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy referral link");
    }
  };

  const handleContactClick = () => {
    if (userAuth) {
      navigate(`/messages/${userRecord?.userEncId}`);
    } else {
      navigate(`/login?redirect=/messages/${userRecord?.userEncId}`);
    }
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
    <div className="mb-2 shadow rounded bg-white profile-box text-center py-4 px-3">
      <div className="">
        <HandleImages
          imagePath={
            preview !== true
              ? imagePreview || profileImage
              : userRecord?.profileImage
          }
          imageAlt={`${userRecord?.firstName} ${userRecord?.lastName}`}
          imageStyle={{ width: "250px", height: "250px" }}
          className="mb-3 rounded-circle"
        />

        {preview === true && (
          <>
            <h5 className="font-weight-bold text-dark mb-1">
              {userRecord?.firstName} {userRecord?.lastName}
            </h5>
            {status ? (
              <p className="mb-0 text-success">Online</p>
            ) : (
              <p className="mb-0 text-danger">Offline</p>
            )}
            {availability ? (
              <p className="mb-0 text-success">Available</p>
            ) : (
              <p className="mb-0 text-danger">Unavailable</p>
            )}
          </>
        )}
      </div>

      {preview === true ? (
        <div className="d-flex">
          <div className="mx-2 w-100">
            <Button
              onClick={() => handleContactClick()}
              variant={
                userAuth && userAuth?.role === "Valet" ? "secondary" : "primary"
              }
              className="w-100"
              disabled={userAuth && userAuth?.role === "Valet"}
            >
              Contact Me
            </Button>
          </div>
          <div>
            <Button
              variant="outline-danger"
              onClick={handleCopyReferral}
              className="w-100"
              title="Share User Refferal"
            >
              <i className="bi bi-solid bi-gift"></i>
            </Button>
          </div>
        </div>
      ) : (
        <>
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
                <label
                  className="btn btn-success m-0"
                  htmlFor="fileAttachmentBtn"
                >
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
              onChange={handleStatusChange}
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
        </>
      )}
    </div>
  );
};

export default UserProfileImage;
