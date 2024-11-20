import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const LottiePlayer = ({ src, style }) => {
  return (
    <>
      <Player src={src} style={style} loop autoplay />
    </>
  );
};

export default LottiePlayer;
