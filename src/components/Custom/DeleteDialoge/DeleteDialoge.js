import React, { useState } from "react";
import Dialogue from "../Modal/modal";

const DeleteComponent = ({
  showDialog,
  setShowDialog,
  onDelete, // Renamed confirmDelete to onDelete for clarity
  item, // Changed to item to represent the service being deleted
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(item); // Call the delete function passed as a prop
      setShowDialog(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialogue
      show={showDialog}
      onHide={() => setShowDialog(false)}
      title="Confirm Deletion"
      bodyContent="Are you sure you want to delete this item?"
      customFooterButtons={[
        {
          text: isDeleting ? "Deleting..." : "Delete",
          onClick: handleDelete,
          variant: "danger",
          type: "button",
        },
        {
          text: "Cancel",
          variant: "secondary",
          onClick: () => setShowDialog(false),
          type: "button",
        },
      ]}
    />
  );
};

export default DeleteComponent;
