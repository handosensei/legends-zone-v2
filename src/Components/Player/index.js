import React, { useRef, useEffect } from 'react';
import { Card } from 'reactstrap';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './video.css';

function Player({videos, path}) {
  const videoRef = useRef(null);

  const getSources = () => {
    var windowSize = document.documentElement.clientWidth;
    if (windowSize < 600) {
      return [];
    }

    const sources = [];
    videos.forEach((nameVideo) => {
      const source = {
        src: `${path}/${nameVideo}`,
        type: 'video/mp4'
      }
      sources.push(source);
    })
    return sources;
  }

  useEffect(() => {
    const sources = getSources();
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
