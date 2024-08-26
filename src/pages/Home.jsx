import React from 'react';
import '../styles/Home.css';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import NavBar from '../components/NavBar';

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="main-layout">
        <Sidebar />
        <MainContent>
          <div className="main-content">
            <h2>Artistas populares</h2>
            <div className="artists">
              <div className="artist-card">
                <img src="artist1.jpg" alt="Artista 1" />
                <p>Artista 1</p>
              </div>
              <div className="artist-card">
                <img src="artist2.jpg" alt="Artista 2" />
                <p>Artista 2</p>
              </div>
              {/* Más artistas */}
            </div>

            <h2>Álbumes populares</h2>
            <div className="albums">
              <div className="album-card">
                <img src="album1.jpg" alt="Álbum 1" />
                <p>Álbum 1</p>
              </div>
              <div className="album-card">
                <img src="album2.jpg" alt="Álbum 2" />
                <p>Álbum 2</p>
              </div>
              {/* Más álbumes */}
            </div>
          </div>
        </MainContent>
      </div>
    </div>
  );
};

export default Home;