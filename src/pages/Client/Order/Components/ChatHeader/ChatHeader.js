import React, { useEffect, useState } from "react";
import HandleImages from "../../../../../components/Custom/Avatars/HandleImages";
import { useDispatch, useSelector } from "react-redux";
import { getRecordById } from "../../../../../redux/Actions/globalActions";

const ChatHeader = ({ activeChat, userOnlineStatus }) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state?.authentication);
  const [userRecord, setUserRecord] = useState({});

  const fetchUserRecord = (id) => {
    dispatch(getRecordById(`/User/user-by-id/${encodeURIComponent(id)}`)).then(
      (response) => {
        console.log(response?.payload);
        setUserRecord(response?.payload);
      }
    );
  };

  useEffect(() => {
    //Handle Check if the loggedIn User is Valet then the customer name should be displayed other wise valet name will display
    if (userAuth?.role === "Valet") {
      fetchUserRecord(activeChat?.customerEncId);
    } else {
      fetchUserRecord(activeChat?.valetEncId);
    }
  }, [activeChat, userAuth]);

  return (
    activeChat && (
      <div>
        <HandleImages
          imagePath={activeChat?.profileImage}
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
    )
  );
};

export default ChatHeader;
