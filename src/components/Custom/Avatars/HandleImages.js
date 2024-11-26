import { useState, useEffect } from "react";

const HandleImages = ({ imagePath, imageAlt, imageStyle }) => {
  const [imageSrc, setImageSrc] = useState(
    imagePath || "https://bootdey.com/img/Content/avatar/avatar2.png"
  );

  const handleBrokenImage = () => {
    setImageSrc("https://bootdey.com/img/Content/avatar/avatar2.png");
  };

  useEffect(() => {
    setImageSrc(
      imagePath || "https://bootdey.com/img/Content/avatar/avatar2.png"
    );
  }, [imagePath]);

  return (
    <img
      onError={handleBrokenImage}
      src={imageSrc}
      alt={imageAlt}
      style={imageStyle}
    />
  );
};

export default HandleImages;
