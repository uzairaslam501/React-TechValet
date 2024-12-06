import React from "react";
import HandleImages from "../../../../../components/Custom/Avatars/HandleImages";

const ChatHeader = ({ activeChat, userOnlineStatus, toggleSidebar }) => {
  return (
    <div className="row">
      <div className="col-sm-10">
        <div>
          {activeChat && (
            <div>
              <HandleImages
                imagePath={activeChat?.userImage}
                imageAlt={activeChat?.username}
              />
              <div className="chat-about">
                <h6 className="mb-0">{activeChat?.username}</h6>
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
          )}
        </div>
        <div className="text-end">
          <button
            className="btn btn-light d-md-none" // Visible on mobile only
            onClick={toggleSidebar}
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>
      <div className="col-sm-2"></div>
    </div>
  );
};

export default ChatHeader;
