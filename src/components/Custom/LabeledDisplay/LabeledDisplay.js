import React from "react";
import { Badge } from "react-bootstrap";
import { serviceTime } from "../../../utils/client/data/requestedData";
const LabeledDisplay = ({
  preferredServiceTime,
  background = "secondary",
  className,
}) => {
  return (
    <div className={className}>
      {preferredServiceTime &&
        preferredServiceTime.split(",").map((time) => {
          const matchedOption = serviceTime.find(
            (option) => option.id === time.trim()
          );
          return (
            <Badge bg={background} className="p-2 fw-normal" key={time}>
              {matchedOption && matchedOption.value}
            </Badge>
          );
        })}
    </div>
  );
};

export default LabeledDisplay;
