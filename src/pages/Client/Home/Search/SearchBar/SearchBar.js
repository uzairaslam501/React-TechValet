import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword) {
      if (searchKeyword.length < 3) {
        return toast.error("Please enter a keyword with at least 3 characters");
      }
      navigate(`/search/${encodeURIComponent(searchKeyword)}`);
    } else {
      toast.error("Please enter a keyword to search");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="d-flex w-100">
        <Form.Control
          type="search"
          name="searchKeyword"
          placeholder="Find Services..."
          className="py-2"
          aria-label="Search"
          style={{
            width: "calc(100% - 60px)", // Adjust for button space if necessary
            borderRadius: "0",
            backgroundColor: "#f9f9f9",
            borderColor: "#999",
          }}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Button
          type="submit"
          variant="primary"
          style={{
            borderRadius: "0",
            width: "60px",
            borderColor: "#999",
          }}
        >
          <i className="bi bi-search"></i>
        </Button>
      </Form>
    </>
  );
};

export default SearchBar;
