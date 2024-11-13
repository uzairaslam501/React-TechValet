import React from "react";
import { Modal, Button } from "react-bootstrap";

const Dialogue = ({
  show,
  onHide,
  headerClass,
  title,
  bodyContent,
  footerContent,
  modalBodyClass,
  size = "md", // "sm", "md", "lg", or "xl"
  backdrop = true, // true, "static", or false
  centered = false,
  closeButton = true,
  showFooter = true,
  customFooterButtons = [],
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      backdrop={backdrop}
      centered={centered}
    >
      <Modal.Header className={headerClass} closeButton={closeButton}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={modalBodyClass}>{bodyContent}</Modal.Body>

      {showFooter && (
        <Modal.Footer>
          {customFooterButtons.length > 0
            ? customFooterButtons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "primary"}
                  className={button.className}
                  onClick={button.onClick}
                >
                  {button.text}
                </Button>
              ))
            : footerContent || <Button onClick={onHide}>Close</Button>}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default Dialogue;