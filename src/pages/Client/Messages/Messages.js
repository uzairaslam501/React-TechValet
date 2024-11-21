import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesSidebar } from "../../../redux/Actions/messagesAction";
import HandleImages from "../../../components/Custom/Avatars/HandleImages";

const Messages = () => {
  const { userAuth } = useSelector((state) => state?.authentication);
  const dispatch = useDispatch();
  const [usersList, setUsersList] = useState();

  const fetchSideBar = () => {
    dispatch(
      getMessagesSidebar(
        `Message/GetMessageSideBarLists?loggedInUserId=${userAuth?.id}`
      )
    ).then((response) => {
      setUsersList(response?.payload);
    });
  };

  const handleSearchMessage = (value) => {
    console.log("handleSearchMessage", value);
  };

  useEffect(() => {
    fetchSideBar();
  }, [userAuth?.id]);
  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  onChange={(e) => handleSearchMessage(e.target.value)}
                />
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                {usersList &&
                  usersList.map((user, index) => {
                    return (
                      <>
                        <li
                          className={`${index === 0 && "active"} clearfix`}
                          key={`${index}-${user.username}`}
                        >
                          <HandleImages
                            imagePath={user?.userImage}
                            imageAlt={user?.username}
                          />

                          <div className="about">
                            <div className="name">{user?.username}</div>
                            <div className="status">
                              {`${
                                user?.lastMessageUsername != ""
                                  ? user?.lastMessageUsername
                                  : "You"
                              }: ${user?.messageDescription}`}
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })}
              </ul>
            </div>
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      alt="avatar"
                    />
                    <div className="chat-about">
                      <h6 className="m-b-0">Aiden Chavez</h6>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-history">
                <ul className="m-b-0">
                  <li className="clearfix">
                    <div className="message-data text-right">
                      <span className="message-data-time">10:10 AM, Today</span>
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="avatar"
                      />
                    </div>
                    <div className="message other-message float-right">
                      {" "}
                      Hi Aiden, how are you? How is the project coming along?{" "}
                    </div>
                  </li>
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">10:12 AM, Today</span>
                    </div>
                    <div className="message my-message">
                      Are we meeting today?
                    </div>
                  </li>
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">10:15 AM, Today</span>
                    </div>
                    <div className="message my-message">
                      Project has been already finished and I have results to
                      show you.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-send"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter text here..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
