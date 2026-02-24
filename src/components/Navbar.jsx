import React from 'react';

function Navbar({ currentPage, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => onNavigate('home')}>
        <span className="logo-green">GreenBite</span>
        <span className="logo-brown"> Café</span>
      </div>
      <ul className="navbar-links">
        <li>
          <button 
            className={`nav-link-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Inicio
          </button>
        </li>
        <li>
          <button 
            className={`nav-link-btn ${currentPage === 'menu' ? 'active' : ''}`}
            onClick={() => onNavigate('menu')}
          >
            Nuestra Carta
          </button>
        </li>
        <li>
          <button 
            className={`nav-link-btn ${currentPage === 'location' ? 'active' : ''}`}
            onClick={() => onNavigate('location')}
          >
            Cómo Llegar
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
