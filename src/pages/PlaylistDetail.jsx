/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getPlaylist } from '../services/api';

const PlaylistDetail = ({ playlistId, onClose }) => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playlistId) {
      setError(new Error('Playlist ID is required'));
      setLoading(false);
      return;
    }

    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylist(playlistId);
        setPlaylist(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={onClose}>Cerrar</button>
      <h1>{playlist.name}</h1>
      <ul>
        {playlist.songs && playlist.songs.map(song => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDetail;