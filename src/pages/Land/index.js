import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";

import VIDEO1 from "../../assets/images/metalegends/land/content/Biome01_V001.mp4";
import VIDEO2 from "../../assets/images/metalegends/land/content/celestial_legendary_1.mp4";
import 'video.js/dist/video-js.css';


const Land = () => {
  const [activeVideo, setActiveVideo] = useState(VIDEO2);
  const videoRef = useRef(null);

  useEffect(() => {
  }, [activeVideo]);

  const handleVideoChange = (video) => {
    setActiveVideo(video);
    videoRef.current.load();
    videoRef.current.play();
  };

  return (
    <div style={{ position: "relative", width: "100%", margin: "0 auto" }}>
      <div style={{ position: "relative", width: "100%" }}>
        <video
          ref={videoRef}
          width="100%"
          height="80%"
          controls
          autoPlay
          style={{ display: "block" }}
        >
          <source
            src={activeVideo}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            gap: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "5px",
            borderRadius: "8px",
          }}
        >
          <button
            onClick={() => handleVideoChange(VIDEO2)}
            style={{
              padding: "5px 10px",
              backgroundColor: activeVideo === VIDEO2 ? "#007BFF" : "#ddd",
              color: activeVideo === VIDEO2 ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Land
          </button>
          <button
            onClick={() => handleVideoChange(VIDEO1)}
            style={{
              padding: "5px 10px",
              backgroundColor: activeVideo === VIDEO1 ? "#007BFF" : "#ddd",
              color: activeVideo === VIDEO1 ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Biome
          </button>

        </div>
      </div>
    </div>
  );
}

export default Land;
