import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './video.css';

function PetsPlayer() {
  const videoRef = useRef(null);

  const sources = [
    {src: 'https://meta-life.io/img/gallery/wildlife/video/4.mp4', type: 'video/mp4'},
    {src: 'https://meta-life.io/img/gallery/wildlife/video/5.mp4', type: 'video/mp4'},
    {src: 'https://meta-life.io/img/gallery/wildlife/video/6.mp4', type: 'video/mp4'},
    {src: 'https://meta-life.io/img/gallery/wildlife/video/7.mp4', type: 'video/mp4'},
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
    <div className="video-container">
      <video ref={videoRef} className="video-js vjs-16-9" autoPlay muted />
    </div>
  );
}

export default PetsPlayer;
