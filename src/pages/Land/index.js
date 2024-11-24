import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import 'video.js/dist/video-js.css';
import {getLandMinted} from "../../client/ApiMetaLegends";


const Land = () => {
  const { tokenId } = useParams();
  const videoRef = useRef(null);
  const [VIDEO2, setVIDEO2] = useState(null);
  const [VIDEO1, setVIDEO1] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const url = 'https://metalegends.mypinata.cloud/ipfs/QmQik7GsQyQeCqNtETJY2M5uAA6kNEbxVFrWT5asHdeo1D';
  const uri = {
    celestial: {
      legendary: {
        biome: `${url}/biome/Biome01/`,
        card: `${url}/card/1_celestial/celestial_legendary/`,
      },
      sacred: {
        biome: `${url}/biome/Biome01/`,
        card: `${url}/card/1_celestial/celestial_sacred/`,
      },
      normal: {
        biome: `${url}/biome/Biome01/`,
        card: `${url}/card/1_celestial/celestial_normal/`,
      },
    },
    burner: {
      legendary: {
        biome: `${url}/biome/Biome02/`,
        card: `${url}/card/2_burner/burner_legendary/`,
      },
      sacred: {
        biome: `${url}/biome/Biome02/`,
        card: `${url}/card/2_burner/burner_sacred/`,
      },
      normal: {
        biome: `${url}/biome/Biome02/`,
        card: `${url}/card/2_burner/burner_normal/`,
      },
    },
    roboter: {
      legendary: {
        biome: `${url}/biome/Biome03/`,
        card: `${url}/card/3_roboter/roboter_legendary/`,
      },
      sacred: {
        biome: `${url}/biome/Biome03/`,
        card: `${url}/card/3_roboter/roboter_sacred/`,
      },
      normal: {
        biome: `${url}/biome/Biome03/`,
        card: `${url}/card/3_roboter/roboter_normal/`,
      },
    },
    goldboi: {
      legendary: {
        biome: `${url}/biome/Biome04/`,
        card: `${url}/card/4_goldboi/goldboi_legendary/`,
      },
      sacred: {
        biome: `${url}/biome/Biome04/`,
        card: `${url}/card/4_goldboi/goldboi_sacred/`,
      },
      normal: {
        biome: `${url}/biome/Biome04/`,
        card: `${url}/card/4_goldboi/goldboi_normal/`,
      },
    },
    'matrix-angel': {
      legendary: {
        biome: `${url}/biome/Biome05/`,
        card: `${url}/card/5_matrix/matrix_legendary/`,
      },
      sacred: {
        biome: `${url}/biome/Biome05/`,
        card: `${url}/card/5_matrix/matrix_sacred/`,
      },
      normal: {
        biome: `${url}/biome/Biome05/`,
        card: `${url}/card/5_matrix/matrix_normal/`,
      },
    },
    cyber: {
      legendary: {
        biome: `${url}/biome/Biome06/`,
        card: `${url}/card/6_cyber/cyber_legendary/`,
      },
      sacred: {
        biome: `${url}/biome/Biome06/`,
        card: `${url}/card/6_cyber/cyber_sacred/`,
      },
      normal: {
        biome: `${url}/biome/Biome06/`,
        card: `${url}/card/6_cyber/cyber_normal/`,
      },
    },
    rough: {
      legendary: {
        biome: `${url}/biome/Biome07/`,
        card: `${url}/card/7_rough/rough_legendary/`,
      },
      sacred: {
        biome: `${url}/biome/Biome07/`,
        card: `${url}/card/7_rough/rough_sacred/`,
      },
      normal: {
        biome: `${url}/biome/Biome07/`,
        card: `${url}/card/7_rough/rough_normal/`,
      },
    },
  };


  useEffect(() => {
    const fetchLandData = async () => {
      try {
        const land = await getLandMinted(tokenId);

        const uriVideoBiome = uri[land['land']['class']][land['category']]['biome'] + land.landContent.biomeName;
        const uriVideoCard = uri[land['land']['class']][land['category']]['card'] + land.landContent.cardName;

        setVIDEO2(uriVideoBiome);
        setVIDEO1(uriVideoCard);

        setActiveVideo(uriVideoCard);
        videoRef.current.load();
        videoRef.current.play();
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchLandData();
  }, [tokenId]);

  const handleVideoChange = (video) => {
    if (video && video !== activeVideo) {
      setActiveVideo(video);
      videoRef.current.load();
      videoRef.current.play();
    }
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
            disabled={!VIDEO1}
          >
            Card
          </button>
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
            disabled={!VIDEO2}
          >
            Biome
          </button>
        </div>
      </div>
    </div>
  );
}

export default Land;
