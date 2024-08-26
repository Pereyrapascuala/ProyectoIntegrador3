import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import '../styles/Player.css';

const Player = ({ currentSongUrl, currentSongTitle }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0); // Reinicia la reproducción al inicio
      setPlaying(true); // Inicia la reproducción automáticamente
    }
  }, [currentSongUrl]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <div className="player">
      {currentSongUrl && (
        <>
          <div className="player__info">
            <p className="player__title">Reproduciendo ahora: {currentSongTitle}</p>
          </div>
          <div className="player__controls">
            <ReactPlayer
              ref={playerRef}
              url={currentSongUrl}
              playing={playing}
              controls
              width="100%"
              height="50px"
            />
            <button onClick={handlePlayPause}>
              {playing ? 'Pause' : 'Play'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;