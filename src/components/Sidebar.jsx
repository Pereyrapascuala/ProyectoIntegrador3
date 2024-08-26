import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchSongs, uploadSong, searchPlaylists } from '../services/api';
import { SongsContext } from '../context/SongsContext';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [playlistSearchQuery, setPlaylistSearchQuery] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const { setSongs } = useContext(SongsContext);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const results = await searchSongs(searchQuery);
      setSongs(results);
      console.log(results); // Puedes mostrar los resultados en la interfaz o en la consola
    } catch (error) {
      console.error('Error al buscar canciones:', error);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsModalOpen(true);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('No se ha seleccionado ningún archivo.');
      return;
    }

    if (!title) {
      setError('No se ha proporcionado un título.');
      return;
    }

    try {
      await uploadSong({ title, file });
      setIsModalOpen(false);
      setFile(null);
      setTitle('');
      setSuccessMessage('Canción subida exitosamente.');
      setTimeout(() => setSuccessMessage(''), 3000); // Ocultar el mensaje después de 3 segundos
    } catch (error) {
      console.error('Error al subir la canción:', error);
      setError('Error al subir la canción.');
    }
  };

  const handleCancel = () => {
    setFile(null);
    setTitle('');
    setIsModalOpen(false);
  };

  const handleSearchPlaylists = async () => {
    if (!playlistSearchQuery) {
      setError('No se ha proporcionado un nombre para buscar listas de reproducción.');
      return;
    }

    try {
      const results = await searchPlaylists(playlistSearchQuery);
      setPlaylists(results);
      setPlaylistSearchQuery('');
      setSuccessMessage('Listas de reproducción encontradas exitosamente.');
      setTimeout(() => setSuccessMessage(''), 3000); // Ocultar el mensaje después de 3 segundos
    } catch (error) {
      console.error('Error al buscar listas de reproducción:', error);
      setError('Error al buscar listas de reproducción.');
    }
  };

  const handlePlaylistClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <div className="sidebar">
      <h1>MUSIC</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar canciones..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar Canciones</button>
      </div>
      <div className="bottom-buttons">
        <button onClick={() => document.getElementById('audioUpload').click()}>Agregar canciones</button>
        <input
          id="audioUpload"
          type="file"
          accept="audio/mp3"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <input
          type="text"
          placeholder="Buscar listas de reproducción"
          value={playlistSearchQuery}
          onChange={(e) => setPlaylistSearchQuery(e.target.value)}
          style={{ marginTop: '10px', padding: '10px', width: '100%', borderRadius: '5px' }}
        />
        <button onClick={handleSearchPlaylists}>Buscar lista</button>
      </div>
      <div className="playlists">
        {playlists.length > 0 && (
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)} style={{ cursor: 'pointer' }}>
                {playlist.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {isModalOpen && (
        <div className="modal" style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', width: '300px', textAlign: 'center' }}>
            <h2>Subir Canción</h2>
            <p>Archivo: {file?.name}</p>
            <input
              type="text"
              placeholder="Ingrese el título de la canción"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ padding: '10px', width: '100%', borderRadius: '5px', marginBottom: '10px' }}
            />
            <div className="modal-actions">
              <button onClick={handleUpload} style={{ backgroundColor: '#1DB954', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
                Subir
              </button>
              <button onClick={handleCancel} style={{ backgroundColor: 'grey', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}>
                Cancelar
              </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default Sidebar;