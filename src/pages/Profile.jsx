import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

function Profile() {
  const { state } = useAuth();
  const { user } = state || {}; // Asegúrate de que state no sea undefined

  if (!user) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga si el usuario no está disponible aún
  }

  return (
    <div className="profile-page">
      <h1>Tu Perfil</h1>
      <p><strong>Nombre de usuario:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Nombre:</strong> {user.firstName}</p>
      <p><strong>Apellido:</strong> {user.lastName}</p>
      {user.profilePicture && (
        <div>
          <strong>Foto de perfil:</strong>
          <img src={user.profilePicture} alt="Foto de perfil" className="profile-picture" />
        </div>
      )}
    </div>
  );
}

export default Profile;
