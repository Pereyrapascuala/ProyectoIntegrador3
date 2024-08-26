import React, { createContext, useState } from 'react';

export const SongsContext = createContext();

export const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [playing, setPlaying] = useState(false);

  return (
    <SongsContext.Provider value={{ songs, setSongs, currentSong, setCurrentSong, playing, setPlaying }}>
      {children}
    </SongsContext.Provider>
  );
};