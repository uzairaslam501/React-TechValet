import React from "react";
import { truncateCharacters } from "../../../../../utils/_helpers";
import HandleImages from "../../../../../components/Custom/Avatars/HandleImages";
import { Spinner } from "react-bootstrap";

const ChatSidebar = ({
  isMessageSidebarOpen,
  userSideBarLoader,
  usersList,
  activeChat,
  handleSearchMessage,
  handleSelectedChat,
}) => {
  return (
    <div
      id="plist"
      className={`people-list ${isMessageSidebarOpen ? "open" : ""}`}
    >
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
        {userSideBarLoader ? (
          <div className="text-center">
            <Spinner animation="grow" size="sm" />
          </div>
        ) : (
          <div>
            {usersList && usersList.length > 0 ? (
              usersList.map((user, index) => {
                return (
                  <li
                    className={`${
                      activeChat?.userDecId === user?.userDecId && "active"
                    } clearfix`}
                    key={`${index}-${user?.userDecId}`}
                    onClick={() => handleSelectedChat(user)}
                  >
                    <HandleImages
                      imagePath={user?.userImage}
                      imageAlt={user?.username}
                    />

                    <div className="about">
                      <div className="name">
                        {truncateCharacters(user?.username, 15)}
                      </div>
                      <div className="status">
                        {`${
                          user?.lastMessageUsername != ""
                            ? user?.lastMessageUsername
                            : "You"
                        }: ${truncateCharacters(user?.messageDescription, 12)}`}
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <li
                style={{
                  backgroundColor: "#fff",
                  cursor: "auto",
                  textAlign: "center",
                }}
              >
                <p>No Results</p>
              </li>
            )}
          </div>
        )}
      </ul>
    </div>
  );
};

export default ChatSidebar;
