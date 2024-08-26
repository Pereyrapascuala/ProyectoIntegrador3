import { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlaylists, deletePlaylist, getSongs, deleteSong, updatePlaylist, updateSong } from '../services/api';
import ReactPlayer from 'react-player';
import { SongsContext } from '../context/SongsContext';
import '../styles/MainContent.css';

const MainContent = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);
  const navigate = useNavigate();
  const { songs, setSongs } = useContext(SongsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistData = await getPlaylists();
        setPlaylists(playlistData);

        const songData = await getSongs();
        setSongs(songData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [setSongs]);

  const handleDeletePlaylist = async (id) => {
    try {
      await deletePlaylist(id);
      setPlaylists(playlists.filter(playlist => playlist.id !== id));
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  const handleDeleteSong = async (id) => {
    try {
      await deleteSong(id);
      setSongs(songs.filter(song => song.id !== id));
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  const handleUpdatePlaylist = async (id, newName) => {
    try {
      await updatePlaylist(id, { name: newName });
      setPlaylists(playlists.map(playlist => 
        playlist.id === id ? { ...playlist, name: newName } : playlist
      ));
    } catch (error) {
      console.error('Error updating playlist:', error);
    }
  };

  const handleUpdateSong = async (id, newTitle) => {
    try {
      await updateSong(id, { title: newTitle });
      setSongs(songs.map(song => 
        song.id === id ? { ...song, title: newTitle } : song
      ));
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setPlaying(true);
  };

  const handleNavigateToPlaylist = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <div className="main-content">
      <div className="section">
        <h2>Listas populares</h2>
        <div className="scrollable">
          {playlists.map(playlist => (
            <div className="card" key={playlist.id} onClick={() => handleNavigateToPlaylist(playlist.id)} onContextMenu={(e) => {
              e.preventDefault();
              // Lógica para ingresar a la lista de reproducción
            }}>
              <img src="album-placeholder.jpg" alt={playlist.name} />
              <h3>{playlist.name}</h3>
              <button className="play-button" onClick={(e) => {
                e.stopPropagation();
                // Lógica para reproducir la lista de reproducción
              }}>▶</button>
              <button onClick={(e) => {
                e.stopPropagation();
                handleDeletePlaylist(playlist.id);
              }}>Eliminar</button>
              <button onClick={(e) => {
                e.stopPropagation();
                const newName = prompt('Nuevo nombre de la lista:', playlist.name);
                if (newName) handleUpdatePlaylist(playlist.id, newName);
              }}>Modificar nombre</button>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Canciones</h2>
        <div className="scrollable">
          {songs.map(song => (
            <div className="card" key={song.id}>
              <img src="song-placeholder.jpg" alt={song.title} />
              <h3>{song.title}</h3>
              <button className="play-button" onClick={() => handlePlaySong(song)}>▶</button>
              <button onClick={() => handleDeleteSong(song.id)}>Eliminar</button>
              <button onClick={() => {
                const newTitle = prompt('Nuevo nombre de la canción:', song.title);
                if (newTitle) handleUpdateSong(song.id, newTitle);
              }}>Modificar nombre</button>
            </div>
          ))}
        </div>
      </div>
      {currentSong && (
        <div className="player-container">
          <ReactPlayer
            ref={playerRef}
            url={currentSong.song_file}
            playing={playing}
            controls
            width="100%"
            height="50px"
          />
          <button onClick={() => setPlaying(!playing)}>
            {playing ? "Pausar" : "Reproducir"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MainContent;