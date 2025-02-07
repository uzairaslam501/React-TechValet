import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const SearchBar = ({
  parentClass = "",
  boxClass = "",
  buttonClass = "",
  parentStyle = {},
  boxStyle = {},
  buttonStyle = {},
}) => {
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
      <Form
        onSubmit={handleSubmit}
        className={`d-flex w-100 ${parentClass}`}
        style={parentStyle}
      >
        <Form.Control
          type="search"
          name="searchKeyword"
          placeholder="Find Services..."
          className={`${boxClass}`}
          aria-label="Search"
          style={boxStyle}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Button
          type="submit"
          variant="primary"
          style={buttonStyle}
          className={buttonClass}
        >
          <i className="bi bi-search"></i>
        </Button>
      </Form>
    </>
  );
};

export default SearchBar;
