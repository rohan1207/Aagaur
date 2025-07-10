import React, { useState, useEffect } from 'react';

const LandingPage2 = () => {
  const [isSucking, setIsSucking] = useState(false);
  const [isWhiteBG, setIsWhiteBG] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setIsSucking(true); // Start inward ink suction
    }, 1000); // initial delay

    const timeout2 = setTimeout(() => {
      setIsWhiteBG(true); // Switch to white bg and black logo
      setIsSucking(false); // Reset animation state
    }, 5000); // after 4s animation

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <div className={`container ${isWhiteBG ? 'white' : 'black'}`}>
      {/* Ink suction animation overlay */}
      {!isWhiteBG && (
        <div className={`ink-circle ${isSucking ? 'shrink' : ''}`} />
      )}

      {/* Logo */}
      <img
        src={isWhiteBG ? '/black.png' : '/white.png'}
        alt="Logo"
        className="logo"
      />

      {/* Styles */}
      <style>{`
        .container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background-color 1s ease-in-out;
          background-color: black;
        }

        .container.white {
          background-color: white;
        }

        .logo {
          position: relative;
          width: 200px;
          height: auto;
          z-index: 2;
          transition: opacity 0.5s ease-in-out 0.3s;
        }

        .ink-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4000px;
          height: 4000px;
          background-color: black;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(1);
          z-index: 1;
        }

        .shrink {
          animation: suckIn 4s ease-in-out forwards;
        }

        @keyframes suckIn {
          to {
            transform: translate(-50%, -50%) scale(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage2;
