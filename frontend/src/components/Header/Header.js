import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const modules = [
    { path: '/home', name: 'Roadmap', shortName: 'RM' },
    { path: '/module1', name: 'Module 1', shortName: 'M1' },
    { path: '/module2', name: 'Module 2', shortName: 'M2' },
    { path: '/module3', name: 'Module 3', shortName: 'M3' },
    { path: '/module4', name: 'Module 4', shortName: 'M4' },
    { path: '/module5', name: 'Module 5', shortName: 'M5' },
    { path: '/module6', name: 'Module 6', shortName: 'M6' },
    { path: '/module7', name: 'Module 7', shortName: 'M7' }
  ];

  const renderModuleLinks = () => {
    return modules.map((module, index) => {
      if (windowWidth > 768) {
        return (
          <Link
            key={index}
            className="tab"
            to={module.path}
            data-short-name={module.shortName}
          >
            {windowWidth > 1024 ? module.name : module.shortName}
          </Link>
        );
      }
      return null;
    });
  };

  return (
    <header className="header">
      <div className="brand">Easy Money</div>
      {isAuthenticated && (
        <div className="tabs-container">
          <div className="tabs">
            {renderModuleLinks()}
          </div>
        </div>
      )}
      {isAuthenticated && (
        <div className="settings">
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </header>
  );
}

export default Header;