import axios from 'axios'; // Importa axios para realizar solicitudes HTTP

// Obtiene la URL base de la API desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('API_BASE_URL:', API_BASE_URL);

// Crea una instancia de axios con la URL base de la API
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Función para establecer el token de autenticación
export const setAuthToken = (token) => {
  if (token) {
    // Si hay un token, lo establece en los encabezados comunes de axios
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
    console.log('Token set in headers:', token);
  } else {
    // Si no hay token, elimina el encabezado de autorización
    delete api.defaults.headers.common['Authorization'];
    console.log('Token removed from headers');
  }
};

// Interceptor para añadir el token en solicitudes protegidas
api.interceptors.request.use((config) => {
  const protectedEndpoints = ['playlists/', 'songs/', 'playlist-entries/']; // Endpoints que requieren autenticación
  console.log('Intercepting request:', config.url);

  // Si la URL de la solicitud coincide con un endpoint protegido
  if (protectedEndpoints.some((endpoint) => config.url.includes(endpoint))) {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    if (token) {
      config.headers.Authorization = `Token ${token}`; // Añade el token a los encabezados de la solicitud
      console.log('Authorization header set:', config.headers.Authorization);
    } else {
      console.error('No token found in localStorage');
    }
  }

  return config; // Devuelve la configuración de la solicitud
});

// Función para obtener los datos del perfil del usuario autenticado
export const getProfileData = async (token) => {
  console.log('Fetching profile data with token:', token);
  try {
    const response = await api.get('users/profiles/profile_data/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log('Profile data retrieved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Función para iniciar sesión
export const login = async (username, password) => {
  console.log('Attempting to login with username:', username);
  try {
    if (!username || typeof username !== 'string') {
      throw new Error('Username is required and must be a valid string.');
    }
    if (!password || typeof password !== 'string') {
      throw new Error('Password is required and must be a valid string.');
    }

    const response = await axios.post(`${API_BASE_URL}/api-auth/`, {
      username,
      password,
    });

    const { token } = response.data;
    localStorage.setItem('token', token);
    console.log('Login successful, token received:', token);

    const profileData = await getProfileData(token);
    localStorage.setItem('user__id', profileData.user__id);
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    console.log('Profile data saved to localStorage:', profileData);

    return { token, user__id: profileData.user__id, profileData };
  } catch (error) {
    if (error.response) {
      console.error('Error during login:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

// Función para cerrar sesión
export const logout = () => {
  console.log('Logging out');
  setAuthToken(null); // Elimina el token de los encabezados
  localStorage.removeItem('token'); // Elimina el token del almacenamiento local
  localStorage.removeItem('user__Id'); // Elimina el user__id del almacenamiento local
  localStorage.removeItem('userProfile'); // Elimina los datos del perfil del almacenamiento local
  console.log('User logged out, all local data cleared');
};

// Función para obtener todas las canciones (sin necesidad de token)
export const getSongs = async () => {
  console.log('Fetching all songs');
  try {
    const response = await api.get('harmonyhub/songs/'); // Realiza la solicitud para obtener las canciones
    console.log('Songs retrieved:', response.data.results);
    return response.data.results; // Devuelve los resultados de la respuesta
  } catch (error) {
    console.error('Error fetching songs:', error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para obtener los detalles de una canción
export const getSongDetails = async (id) => {
  console.log('Fetching details for song ID:', id);
  try {
    const response = await api.get(`harmonyhub/songs/${id}/`); // Realiza la solicitud para obtener los detalles de la canción
    console.log('Song details retrieved:', response.data);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error(`Error fetching song details for ID ${id}:`, error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para obtener todas las listas de reproducción
export const getPlaylists = async () => {
  console.log('Fetching all playlists');
  try {
    const response = await api.get('harmonyhub/playlists/'); // Realiza la solicitud para obtener las listas de reproducción
    console.log('Playlists retrieved:', response.data.results);
    return response.data.results; // Devuelve los resultados de la respuesta
  } catch (error) {
    console.error('Error fetching playlists:', error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para obtener una lista de reproducción específica por ID
export const getPlaylist = async (playlistId) => {
  console.log(`Fetching playlist with ID: ${playlistId}`);
  try {
    const response = await api.get(`harmonyhub/playlists/${playlistId}/`); // Realiza la solicitud para obtener la lista de reproducción específica
    console.log('Playlist retrieved:', response.data);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error(`Error fetching playlist with ID ${playlistId}:`, error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para crear una nueva lista de reproducción (requiere token)
export const createPlaylist = async (playlistData) => {
  console.log('Creating new playlist:', playlistData);
  try {
    const response = await api.post('harmonyhub/playlists/', playlistData, {
      headers: {
        'Content-Type': 'application/json',
      },
    }); // Realiza la solicitud para crear una nueva lista de reproducción
    console.log('Playlist created successfully:', response.data);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error creating playlist:', error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para actualizar una lista de reproducción existente (requiere token)
export const updatePlaylist = async (id, playlistData) => {
  console.log('Updating playlist ID:', id, 'with data:', playlistData);
  try {
    const response = await api.put(`harmonyhub/playlists/${id}/`, playlistData); // Realiza la solicitud para actualizar la lista de reproducción
    console.log('Playlist updated successfully:', response.data);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error(`Error updating playlist with ID ${id}:`, error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para actualizar una canción existente (requiere token)
export const updateSong = async (id, songData) => {
  console.log('Updating song ID:', id, 'with data:', songData);
  try {
    const response = await api.put(`harmonyhub/songs/${id}/`, songData); // Realiza la solicitud para actualizar la canción
    console.log('Song updated successfully:', response.data);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error(`Error updating song with ID ${id}:`, error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para eliminar una lista de reproducción (requiere token)
export const deletePlaylist = async (id) => {
  console.log('Deleting playlist ID:', id);
  try {
    const response = await api.delete(`harmonyhub/playlists/${id}/`); // Realiza la solicitud para eliminar la lista de reproducción
    console.log('Playlist deleted successfully:', response.data);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error(`Error deleting playlist with ID ${id}:`, error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para buscar listas de reproducción por título
export const searchPlaylists = async (title) => {
  console.log('Searching playlists with title:', title);
  try {
    const response = await api.get('harmonyhub/playlists/', {
      params: { title }
    }); // Realiza la solicitud para buscar listas de reproducción
    console.log('Playlists search results:', response.data.results);
    return response.data.results; // Devuelve solo los resultados
  } catch (error) {
    console.error('Error searching playlists:', error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

// Función para eliminar una canción (requiere token)
export const deleteSong = async (id) => {
  console.log('Deleting song ID:', id);
  try {
    const response = await api.delete(`harmonyhub/songs/${id}/`); // Realiza la solicitud para eliminar la canción
    console.log('Song deleted successfully:', response.data);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error(`Error deleting song with ID ${id}:`, error.response ? error.response.data : error.message);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

export const uploadSong = async ({ title, file }) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('file', file);

  try {
    const token = localStorage.getItem('token'); // Obtén el token de autenticación desde el almacenamiento local
    const response = await api.post('harmonyhub/songs/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` // Incluye el token en los encabezados de la solicitud
      }
    });
    console.log('Song uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al subir la canción:', error.response ? error.response.data : error.message);
    throw error;
  }
};


// Función para obtener los detalles de una lista de reproducción
export const getPlaylistDetails = async (id, token) => {
  console.log('Fetching playlist details for ID:', id);
  try {
    const response = await api.get(`harmonyhub/playlists/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch playlist details: ${response.status} ${response.statusText}`);
    }

    console.log('Playlist details retrieved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getPlaylistDetails:', error);
    throw error;
  }
};

// Función para buscar canciones por título
export const searchSongs = async (title) => {
  console.log('Searching songs with title:', title);
  try {
    const response = await api.get('harmonyhub/songs/', {
      params: { title }
    });
    console.log('Songs search results:', response.data.results);
    return response.data.results; // Asegúrate de devolver solo los resultados
  } catch (error) {
    console.error('Error searching songs:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Función para agregar una canción a una lista de reproducción
export const addSongToPlaylist = async (playlistId, songId, token) => {
  console.log('Adding song ID:', songId, 'to playlist ID:', playlistId);
  try {
    const response = await api.post('harmonyhub/playlist-entries/', {
      playlist: playlistId,
      song: songId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(`Song ${songId} added to playlist ${playlistId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error adding song to playlist ${playlistId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// Función para eliminar una canción de una lista de reproducción
export const removeSongFromPlaylist = async (playlistId, songId) => {
  console.log('Removing song ID:', songId, 'from playlist ID:', playlistId);
  try {
    const response = await api.post(`harmonyhub/playlist-entries/${playlistId}/remove_song/`, { song_id: songId });
    console.log(`Song ${songId} removed from playlist ${playlistId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error removing song from playlist ${playlistId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export default api; // Exporta la instancia de axios configurada
