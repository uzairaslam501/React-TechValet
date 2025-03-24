import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; // ✅ Ensure this import is correct

const DynamicBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log("Particles.js engine:", engine); // Debugging line
    if (typeof loadFull === "function") {
      await loadFull(engine); // ✅ Ensures `loadFull` is available
    } else {
      console.log("loadFull is not a function. Check tsparticles version.");
    }
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: 0 },
        particles: {
          number: { value: 100, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.6,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.3, sync: false },
          },
          size: {
            value: 4,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.3, sync: false },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            attract: { enable: true, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 200, line_linked: { opacity: 1 } },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
        background: { color: "#e3e3e3" },
      }}
    />
  );
};

export default DynamicBackground;
