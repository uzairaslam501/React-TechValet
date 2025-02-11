import React from "react";
import { Badge } from "react-bootstrap";
import { serviceTime } from "../../../utils/client/data/requestedData";
const LabeledDisplay = ({
  preferredServiceTime,
  background = "secondary",
  className = "",
  badgeClassName = "p-2 fw-normal",
  style,
}) => {
  return (
    <div className={className}>
      {preferredServiceTime &&
        preferredServiceTime.split(",").map((time) => {
          const matchedOption = serviceTime.find(
            (option) => option.id === time.trim()
          );
          return (
            <Badge
              bg={background}
              className={badgeClassName}
              key={time}
              style={style}
            >
              {matchedOption && matchedOption.value}
            </Badge>
          );
        })}
    </div>
  );
};

export default LabeledDisplay;
