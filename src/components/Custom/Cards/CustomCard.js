import React from "react";
import { Card, Button } from "react-bootstrap";
import HandleImages from "../Avatars/HandleImages";

const CustomCard = ({
  imageSrc,
  cardTitle,
  cardText,
  buttonText,
  buttonLink,
  buttonClass,
  cardStyle,
  cardClass,
  imageStyle,
  titleClass,
  textClass,
  children,
  animationEffect,
  animationEffectDelay,
}) => {
  return (
    <Card
      className={cardClass}
      style={cardStyle}
      data-aos={animationEffect}
      data-aos-delay={animationEffectDelay}
    >
      <Card.Body>
        {imageSrc && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <HandleImages
              imagePath={imageSrc}
              imageAlt={`${cardTitle}-${imageSrc}` || ""}
              imageStyle={imageStyle}
            />
          </div>
        )}

        {cardTitle && (
          <Card.Title className={titleClass}>{cardTitle}</Card.Title>
        )}

        {cardText && <Card.Text className={textClass}>{cardText}</Card.Text>}

        {buttonText && buttonLink && (
          <Button href={buttonLink} className={buttonClass}>
            {buttonText}
          </Button>
        )}

        {children && <div className="mt-3">{children}</div>}
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
