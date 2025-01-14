import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const FileUploadButton = ({ setSelectedFile, disabled }) => {
  const fileInputRef = React.useRef(null);
  const MAX_FILE_SIZE_MB = 2; // Maximum file size in MB

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        toast.info(
          `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB.`
        );
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Visible button */}
      <Button
        variant="secondary-secondary"
        className="btn-sm w-50"
        onClick={handleButtonClick}
        disabled={disabled}
      >
        <i className="bi bi-upload me-2"></i> Upload
      </Button>
    </>
  );
};

export default FileUploadButton;
