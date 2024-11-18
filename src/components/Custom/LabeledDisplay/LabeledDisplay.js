import React from "react";
import { Badge } from "react-bootstrap";
import { serviceTime } from "../../../utils/client/data/requestedData";
const LabeledDisplay = ({ preferredServiceTime }) => {
  return (
    <div className="border border-grey rounded bg-white py-2 px-1">
      {preferredServiceTime &&
        preferredServiceTime.split(",").map((time) => {
          const matchedOption = serviceTime.find(
            (option) => option.match === time.trim()
          );
          return (
            <Badge bg="secondary" className="p-2 fw-normal" key={time}>
              {matchedOption && matchedOption.value}
            </Badge>
          );
        })}
    </div>
  );
};

export default LabeledDisplay;
