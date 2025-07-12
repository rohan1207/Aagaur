import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [switched, setSwitched] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial logo animation
    const switchTimer = setTimeout(() => {
      setSwitched(true);

      // Start fade out after logo animation + small delay
      const fadeOutTimer = setTimeout(() => {
        setFadeOut(true);

        // Navigate after fade out starts
        const navigationTimer = setTimeout(() => {
          navigate("/home");
        }, 1000); // Navigate after 1s fade out

        return () => clearTimeout(navigationTimer);
      }, 3000); // Start fade 3s after switch

      return () => clearTimeout(fadeOutTimer);
    }, 1000);

    return () => clearTimeout(switchTimer);
  }, [navigate]);

  const whiteImage = "/white.png";
  const blackImage = "/black.png";

  return (
    <div
      style={{
        backgroundColor: switched ? "#fff" : "#000",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 2s ease, opacity 1s ease",
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <h1
        style={{
          color: switched ? "#000" : "#fff",
          fontSize: "clamp(2rem, 4vw, 2.5rem)",
          fontWeight: "300",
          letterSpacing: "0.5em",
          marginBottom: "2rem",
          opacity: switched ? 1 : 0,
          transform: `translateY(${switched ? "0" : "-20px"})`,
          transition: "opacity 1s ease, transform 1s ease, color 2s ease",
          fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
          textTransform: "uppercase",
          borderBottom: switched
            ? "1px solid rgba(0,0,0,0.15)"
            : "1px solid rgba(255,255,255,0.15)",
          paddingBottom: "0.5rem",
          position: "relative",
        }}
      >
        AAGAUR
      </h1>

      <div
        style={{
          position: "relative",
          width: "200px",
          height: "200px",
          marginTop: "1rem",
        }}
      >
        <img
          src={whiteImage}
          alt="White Logo"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />

        <img
          src={blackImage}
          alt="Black Logo"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            clipPath: switched ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
            transition: "clip-path 2s ease-in-out",
          }}
        />
      </div>
    </div>
  );
};

export default LandingPage;
