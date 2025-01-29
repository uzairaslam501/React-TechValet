import { useState, useEffect } from "react";
import userPlaceholder from "../../../assets/images/user-placeholder.jpg";
import articlePlaceholder from "../../../assets/images/Articles.jpg";

const HandleImages = ({
  imagePath,
  imageAlt,
  imageStyle,
  placeholder,
  className = "",
}) => {
  const placeholderImage =
    placeholder === "article" ? articlePlaceholder : userPlaceholder;
  const [imageSrc, setImageSrc] = useState(imagePath || placeholderImage);

  const handleBrokenImage = () => {
    setImageSrc(placeholderImage);
  };

  useEffect(() => {
    setImageSrc(imagePath || placeholderImage);
  }, [imagePath]);

  return (
    <img
      onError={handleBrokenImage}
      src={imageSrc}
      alt={imageAlt}
      style={imageStyle}
      className={className}
    />
  );
};

export default HandleImages;
