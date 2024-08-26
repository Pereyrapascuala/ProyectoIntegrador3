import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Playlist from './pages/Playlist';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { SongsProvider } from './context/SongsContext';

const App = () => {
  return (
    <AuthProvider>
      <SongsProvider>
        <Router>
          <NavBar />
          <div className="app">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/playlist/:playlistId" element={<ProtectedRoute element={<Playlist />} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </SongsProvider>
    </AuthProvider>
  );
};

export default App;
