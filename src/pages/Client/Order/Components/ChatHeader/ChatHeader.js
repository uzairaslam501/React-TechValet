import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecordById } from "../../../../../redux/Actions/globalActions";
import HandleImages from "../../../../../components/Custom/Avatars/HandleImages";
import { Spinner } from "react-bootstrap";

const ChatHeader = ({ userOnlineStatus, orderDetails }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userRecord, setUserRecord] = useState({});
  const { userAuth } = useSelector((state) => state?.authentication);

  const fetchUserRecord = (id) => {
    dispatch(getRecordById(`/User/user-by-id/${encodeURIComponent(id)}`)).then(
      (response) => {
        setUserRecord(response?.payload);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    setIsLoading(true);
    if (userAuth?.role === "Valet") {
      fetchUserRecord(orderDetails?.customerEncId);
    } else {
      fetchUserRecord(orderDetails?.valetEncId);
    }
  }, [orderDetails, userAuth]);

  return isLoading ? (
    <Spinner animation="grow" />
  ) : (
    <div>
      <HandleImages
        imagePath={userRecord?.profileImage}
        imageAlt={`${userRecord?.firstName} ${userRecord?.lastName}`}
      />
      <div className="chat-about">
        <h6 className="mb-0">{`${userRecord?.firstName} ${userRecord?.lastName}`}</h6>
        <div>
          {userOnlineStatus !== -1 && (
            <div>
              {userOnlineStatus === 1 ? (
                <small>
                  Online
                  <sup>
                    <i className="bi bi-circle-fill online mx-1"></i>
                  </sup>
                </small>
              ) : (
                <small>
                  Offline
                  <sup>
                    <i className="bi bi-circle-fill offline mx-1"></i>
                  </sup>
                </small>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
