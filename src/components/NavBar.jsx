import { useAuth } from "../context/AuthContext"
import Login from "./Login";


const NavBar = () => {
    const {user, logout} =useAuth();
  return (
    <nav className="navbar is-primary">
        <div className="navbar-brand">
            <a  className="navbar-item"  href="/">InfoShare</a>
        </div>
        <div className="navbar-end">
            {user ? (
                <>
                <a className="navbar-item" onClick={logout}>Cerrar Seccion</a>
                </>
            ): (
                <a className="navbar-item" onClick={Login}>Iniciar Seccion</a>
            )}
        </div>

    </nav>
  )
}

export default NavBar
