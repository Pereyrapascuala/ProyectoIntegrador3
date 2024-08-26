import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading || !login) return;

    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api-auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      if (!response.ok) {
        setIsError(true);
        throw new Error("No se pudo iniciar sesión");
      }

      const responseData = await response.json();
      localStorage.setItem('token', responseData.token);

      const profileResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/profiles/profile_data/`, {
        method: "GET",
        headers: {
          "Authorization": `Token ${responseData.token}`,
          "Content-Type": "application/json"
        },
      });
      if (!profileResponse.ok) {
        setIsError(true);
        throw new Error("Error al obtener datos del perfil");
      }

      const profileData = await profileResponse.json();

      const userData = {
        token: responseData.token,
        userId: profileData.user__id,
        username: profileData.username,
        email: profileData.email,
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        profilePicture: profileData.profile_picture,
      };

      localStorage.setItem('userData', JSON.stringify(userData));

      login(userData);
      setIsSuccess(true); 

      setTimeout(() => {
        navigate('/profile'); 
      }, 2000);

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setIsError(true); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">Iniciar Sesión</h2>
          <div className="field">
            <label htmlFor="username">Nombre de usuario:</label>
            <div className="control has-icons-left">
              <input 
                className="input" 
                type="text" 
                id="username" 
                name="username" 
                ref={usernameRef} 
                aria-label="Nombre de usuario" 
                required 
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña:</label>
            <div className="control has-icons-left">
              <input 
                className="input" 
                type="password" 
                id="password" 
                name="password" 
                ref={passwordRef} 
                aria-label="Contraseña" 
                required 
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button 
                type="submit" 
                className="button is-success is-rounded" 
                disabled={isLoading}
              >
                {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
              </button>
            </div>
          </div>
        </form>
        {isSuccess && <p className="success-message">Inicio de sesión exitoso. Redirigiendo al perfil...</p>}
        {isError && <p className="error-message">Error al iniciar sesión. Verifique sus credenciales.</p>}
      </div>
    </section>
  );
}

export default Login;
