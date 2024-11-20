import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const LottiePlayer = ({ src, style, autoplay = true, loop = true }) => {
  return (
    <>
      <Player src={src} style={style} loop={loop} autoplay={autoplay} />
    </>
  );
};

export default LottiePlayer;
