import React, { useRef, useEffect } from 'react';
import { Card } from 'reactstrap';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '../video.css';


function Player() {
  const videoRef = useRef(null);
  const vehicleContentMP4 = 'https://metalegends.mypinata.cloud/ipfs/QmfEaKN1rSCdFQYV4jDPApjWhcLykUMA5hT9nJGxrZbLHQ/mp4/';

  const getSources = () => {
    var windowSize = document.documentElement.clientWidth;
    if (windowSize < 600) {
      return [];
    }

    return [
      {src: vehicleContentMP4 + 'celestial-speedster.mp4', type: 'video/mp4'},
      {src: vehicleContentMP4 + 'burner-speed-tank.mp4', type: 'video/mp4'},
      {src: vehicleContentMP4 + 'roboter-hovertank.mp4', type: 'video/mp4'},
      {src: vehicleContentMP4 + 'goldboi-tank.mp4', type: 'video/mp4'},
      {src: vehicleContentMP4 + 'matrix-racing-car.mp4', type: 'video/mp4'},
      {src: vehicleContentMP4 + 'cyber-bike.mp4', type: 'video/mp4'},
      {src: vehicleContentMP4 + 'roboter-hovertank-council.mp4', type: 'video/mp4'},
      {src: vehicleContentMP4 + 'rough-buggy.mp4', type: 'video/mp4'},
      {src: vehicleContentMP4 + 'roboter-hovertank-council.mp4', type: 'video/mp4'},
      {src: vehicleContentMP4 + 'burner-speed-tank-honorary.mp4', type: 'video/mp4'},
      {src: vehicleContentMP4 + 'celestial-speedster-whale.mp4', type: 'video/mp4'},
      {src: vehicleContentMP4 + 'goldboi-tank-guardian.mp4', type: 'video/mp4'},
      {src: vehicleContentMP4 + 'cyber-bike-judge.mp4', type: 'video/mp4'},
    ];
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
