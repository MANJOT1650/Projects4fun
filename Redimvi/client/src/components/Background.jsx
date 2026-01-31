import React, { useEffect } from 'react';
import './Background.css';

const Background = ({ children }) => {
  return (
    <div className="background-container">
      <video className="background-video" autoPlay muted loop>
        <source
          src="https://media.w3.org/cc0-video/big_buck_bunny_720p_30s.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="background-overlay"></div>
      <div className="background-content">{children}</div>
    </div>
  );
};

export default Background;
