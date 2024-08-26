/* eslint-disable no-unused-vars */
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Accede a 'user' y 'logout' del contexto de autenticación

  const handleLoginLogout = () => {
    if (user) { // Si el usuario está autenticado
      logout(); // Cierra la sesión
      navigate('/'); // Redirige a la página de inicio
    } else {
      navigate('/login'); // Si no está autenticado, redirige a la página de login
    }
  };

  const handleProfile = () => {
    navigate('/profile'); // Redirige a la página de perfil
  };

  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user && <Link to="/login">Login</Link>} {/* Muestra la opción de perfil solo si el usuario está autenticado */}
        <a  onClick={handleLoginLogout}>
          {user ? 'Cerrar Sesión' : 'Login'} {/* Cambia el texto del botón dependiendo del estado de autenticación */}
        </a>
      </div>
    </div>
  );
};

export default NavBar;