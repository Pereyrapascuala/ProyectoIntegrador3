import  { useState, useEffect} from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
    const { token } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await fetch('https://sandbox.academiadevelopers.com/users/profiles/profile_data/', {
              method: 'GET',
              headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              const errorText = await response.text();
              console.error('Error response:', errorText);
              throw new Error('Error al obtener los datos del perfil');
            }
    
            const data = await response.json();
            setProfile(data);
          } catch (error) {
            console.error(error);
            setError('No se pudo obtener el perfil.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchProfile();
      }, [token]);
    
      if (loading) return <div>Cargando...</div>;
      if (error) return <div>{error}</div>;
    
      return (
        <div>
          <h1>Perfil de Usuario</h1>
          {profile ? (
            <div>
              <p>Nombre de Usuario: {profile.username}</p>
                <p>Correo Electrónico: {profile.email}</p>
                <p>Nombre Completo: {profile.first_name} {profile.last_name}</p>
            </div>
          ) : (
            <p>No se encontró el perfil.</p>
          )}
        </div>
      );
    };
export default Profile;
