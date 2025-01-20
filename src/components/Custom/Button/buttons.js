import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const CustomButtons = ({ buttons, row, className = "" }) => {
  return (
    <ButtonGroup className={className}>
      {buttons.map((button) =>
        button.icon ? (
          <Button
            key={button.id}
            onClick={button.onClick ? () => button.onClick(row) : undefined}
            className={button.className}
            variant={button.variant || "light"}
            title={button.title || ""}
            size="sm"
          >
            <i className={button.icon}></i>
          </Button>
        ) : (
          <Button
            key={button.id}
            onClick={button.onClick ? () => button.onClick(row) : undefined}
            className={button.className}
            title={button.title || ""}
            variant={button.variant || "primary"}
            size="sm"
          >
            {button.label}
          </Button>
        )
      )}
    </ButtonGroup>
  );
};

export default CustomButtons;
