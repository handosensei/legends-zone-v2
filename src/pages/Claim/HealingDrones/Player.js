import React, { useRef, useEffect } from 'react';
import { Card } from 'reactstrap';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '../video.css';

import healingDroneMp4 from '../../../assets/videos/healing-drone.mp4';

function Player() {
  const videoRef = useRef(null);

  const sources = [
    {src: healingDroneMp4, type: 'video/mp4'},
  ];

  useEffect(() => {
    const player = videojs(videoRef.current, {
      autoplay: true,
      controls: true,
      responsive: true,
      sources,
    });

    player.on('ended', () => {
      const currentSource = player.currentSource();
      const currentSrcIndex = sources.findIndex(
        (source) => source.src === currentSource.src
      );
      if (currentSrcIndex !== sources.length - 1) {
        const nextSource = sources[currentSrcIndex + 1];
        player.src(nextSource);
        player.playbackRate(0.5);
      } else {
        const nextSource = sources[0];
        player.src(nextSource);
        player.playbackRate(0.5);
      }
    });

    return () => {
      player.dispose();
    };
  }, []);

  return (
    <Card>
      <div className="video-container">
        <video ref={videoRef} className="video-js vjs-1-1" autoPlay muted />
      </div>
    </Card>
  );
}

export default Player;