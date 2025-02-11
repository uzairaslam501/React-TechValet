import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./profileImage.css";
import {
  postUserActivity,
  postUserAvailable,
  UpdateProfileImage,
} from "../../../../redux/Actions/authActions";
import HandleImages from "../../../../components/Custom/Avatars/HandleImages";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserProfileImage = ({ userRecord, preview = false }) => {
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
      ).then((response) => {
        document.getElementById("uploadImageBtnSection").style.display = "none";
      });
    }
  };

  const handleImageReset = () => {
    setImagePreview(null);
    setProfileImage(userRecord?.profilePicture);
    document.getElementById("uploadImageBtnSection").style.display = "none";
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

  const handleShareProfile = () => {
    const currentUrl = window.location.href; // Get the current page URL
    navigator.clipboard
      .writeText(currentUrl) // Copy to clipboard
      .then(() => {
        toast.success("URL copied to clipboard!"); // Show success message
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
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
    <>
      <Card className="shadow rounded bg-white profile-box text-center p-0">
        <div className="pt-4 px-3">
          <div className="text-end">
            <Button
              onClick={handleShareProfile}
              className="rounded-circle border-0 text-black"
              title="Share User Referral"
              style={{
                background: "#eae9e9",
              }}
            >
              <i className="bi bi-share-fill"></i>
            </Button>
          </div>

          <div>
            <div className="position-relative d-inline-block w-100 px-4">
              {/* Profile Image */}
              <HandleImages
                imagePath={
                  preview !== true
                    ? imagePreview || profileImage
                    : userRecord?.profileImage
                }
                imageAlt={`${userRecord?.firstName} ${userRecord?.lastName}`}
                imageStyle={{
                  width: "100%",
                  height: "100%",
                  border: "5px solid #000",
                }}
                className="mb-3 rounded-circle shadow"
              />

              {!preview && (
                <>
                  {/* Camera Icon as Upload Button */}
                  <label
                    htmlFor="fileAttachmentBtn"
                    className="camera-icon"
                    id="imageLoadSection"
                  >
                    <i className="bi bi-camera-fill"></i>
                    <input
                      id="fileAttachmentBtn"
                      name="ImagePath"
                      type="file"
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </>
              )}
            </div>

            <h2 className="fw-bold text-dark mb-3">
              {userRecord?.firstName} {userRecord?.lastName}
            </h2>
          </div>

          {preview === true ? (
            <div className="d-flex pb-3">
              <div className="mx-2 w-100">
                <Button
                  onClick={() => handleContactClick()}
                  variant={
                    userAuth && userAuth?.role === "Valet"
                      ? "secondary"
                      : "primary"
                  }
                  className="w-100"
                  disabled={userAuth && userAuth?.role === "Valet"}
                >
                  Contact Me
                </Button>
              </div>
              {/* <div>
                <Button
                  variant="outline-danger"
                  onClick={handleCopyReferral}
                  className="w-100"
                  title="Share User Refferal"
                >
                  <i className="bi bi-solid bi-gift"></i>
                </Button>
              </div> */}
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
            </>
          )}
        </div>
        {userAuth && userAuth?.role !== "Admin" && (
          <>
            <Container className="justify-content-center">
              <Row
                style={{
                  borderTop: "2px solid #eee",
                }}
              >
                <Col
                  xl={6}
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  className="p-0 pb-3"
                  style={{
                    borderRight: "2px solid #eee",
                  }}
                >
                  <div className="custom-control custom-switch my-2">
                    <label>{status ? "Online" : "Offline"}</label>
                    <div>
                      <label class="switch">
                        <input
                          type="checkbox"
                          checked={status}
                          onChange={handleStatusChange}
                          disabled={preview}
                        />
                        <span class="slider"></span>
                      </label>
                    </div>
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0">
                  <div className="custom-control custom-switch my-2">
                    <label>{availability ? "Available" : "Unavailable"}</label>
                    <div>
                      <label class="switch">
                        <input
                          type="checkbox"
                          checked={availability}
                          onChange={handleAvailabilityChange}
                          disabled={preview}
                        />
                        <span class="slider"></span>
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </Card>
    </>
  );
};

export default UserProfileImage;
