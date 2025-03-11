import React from "react";
import { Button } from "react-bootstrap";

const RenderButton = ({
  isDelivered,
  userRole,
  openDialogue,
  showSpinner,
  allButtonDisabled,
}) => {
  const renderValetButtons = () => {
    if (isDelivered !== "2") {
      return (
        <Button
          onClick={() => openDialogue("delivery")}
          className="w-100"
          variant="success"
          size="sm"
          disabled={showSpinner || allButtonDisabled}
        >
          DELIVER YOUR ORDER
        </Button>
      );
    }
    return null;
  };

  const renderCustomerButtons = () => {
    if (isDelivered !== "2") {
      return (
        <>
          <Button
            id="acceptOrder"
            onClick={() => openDialogue("acceptOrder")}
            className="w-100 mb-2 w-100"
            variant="success"
            size="sm"
            disabled={showSpinner || allButtonDisabled}
          >
            ACCEPT ORDER
          </Button>

          {isDelivered === "1" && (
            <Button
              id="revision"
              onClick={() => openDialogue("revision")}
              className="w-100 mb-2"
              variant="outline-primary"
              size="sm"
              disabled={showSpinner || allButtonDisabled}
            >
              SEND REVISION
            </Button>
          )}
        </>
      );
    }
    return null;
  };

  const renderCompletedStatus = () => (
    <Button className="w-100 mb-2" variant="success" size="sm" disabled={true}>
      COMPLETED
    </Button>
  );

  return isDelivered === "2"
    ? renderCompletedStatus()
    : userRole === "Valet"
    ? renderValetButtons()
    : renderCustomerButtons();
};

export default RenderButton;
