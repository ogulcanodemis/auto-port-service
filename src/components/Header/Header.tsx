import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="top-menu">
        <div className="menu-item home">
          <Link to="/">
            <i className="home-icon">🏠</i>
          </Link>
        </div>
        <div className="menu-item new-service active">
          <Link to="/yeni-servis">
            <i className="service-icon">🔧</i>
            <span>YENİ SERVİS OLUŞTUR</span>
          </Link>
        </div>
        <div className="menu-item vehicles">
          <Link to="/araclar">
            <i className="vehicles-icon">🚗</i>
            <span>ARAÇLAR</span>
          </Link>
        </div>
        <div className="menu-item customers">
          <Link to="/musteriler">
            <i className="customers-icon">👥</i>
            <span>MÜŞTERİLER</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 