/* eslint-disable no-unused-vars */
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLoginLogout = () => {
    if (user) {
      logout();
      navigate('/'); // Redirige a la página de inicio después de cerrar sesión
    } else {
      navigate('/login'); // Redirige a la página de login si no está autenticado
    }
  };

  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        {!user && <Link to="/login">Login</Link>} {/* Muestra "Login" solo si el usuario no está autenticado */}
        {user && <Link to="/profile">Profile</Link>} {/* Muestra "Profile" solo si el usuario está autenticado */}
        <button onClick={handleLoginLogout}>
          {user ? 'Cerrar Sesión' : 'Login'} {/* Cambia el texto del botón dependiendo del estado de autenticación */}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
