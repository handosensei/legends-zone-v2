import { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './video.css';

function PetsPlayer({ sources }) {
  const videoRef = useRef(null);

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
        player.play();
      }
    });

    return () => {
      player.dispose();
    };
  }, [sources]);

  return (
    <div className="video-container">
      <video ref={videoRef} className="video-js vjs-16-9" autoPlay muted />
    </div>
  );
}

export default PetsPlayer;
