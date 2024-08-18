import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, userEmail, logout } = useAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [unlockStatus, setUnlockStatus] = useState({
    module1: true, // Module 1 is always unlocked
    module2: false,
    module3: false,
    module4: false,
    module5: false,
    module6: true,
    module7: true,
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      if (isAuthenticated && userEmail) {
        try {
          const response = await api.get('/get-progress', { params: { email: userEmail } });
          const progress = response.data;

          // Determine unlock status for modules
          const updatedUnlockStatus = { module1: true }; // Module 1 is always unlocked
          let previousModule = 'module1';
          let isUnlocked = true;

          Object.keys(progress).forEach((module) => {
            updatedUnlockStatus[module] = isUnlocked;
            if (progress[module] === 100) {
              isUnlocked = true;
            } else {
              isUnlocked = false;
            }
            previousModule = module;
          });

          setUnlockStatus(updatedUnlockStatus);
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      }
    };

    fetchProgress();
  }, [isAuthenticated, userEmail]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const modules = [
    { path: '/home', name: 'Roadmap', shortName: 'RM', unlock: true },
    { path: '/module1', name: 'Module 1', shortName: 'M1', unlock: unlockStatus.module1 },
    { path: '/module2', name: 'Module 2', shortName: 'M2', unlock: unlockStatus.module2 },
    { path: '/module3', name: 'Module 3', shortName: 'M3', unlock: unlockStatus.module3 },
    { path: '/module4', name: 'Module 4', shortName: 'M4', unlock: unlockStatus.module4 },
    { path: '/module5', name: 'Module 5', shortName: 'M5', unlock: unlockStatus.module5 },
    { path: '/module6', name: 'Module 6', shortName: 'M6', unlock: unlockStatus.module6 },
    { path: '/module7', name: 'Module 7', shortName: 'M7', unlock: unlockStatus.module7 },
  ];

  const renderModuleLinks = () => (
    modules.map((module, index) => (
      windowWidth > 768 && (
        <Link
          key={index}
          className={`tab ${module.unlock ? '' : 'locked'}`}
          to={module.path}
          data-short-name={module.shortName}
        >
          {windowWidth > 1024 ? module.name : module.shortName}
        </Link>
      )
    ))
  );

  const renderDropdownItems = () => (
    modules.map((module, index) => (
      <Dropdown.Item
        as={Link}
        key={index}
        to={module.path}
        className={module.unlock ? '' : 'locked'}
      >
        {module.name}
      </Dropdown.Item>
    ))
  );

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
          <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic" className="custom-dropdown-toggle">
              <div className="menu-icon">
                <div className="menu-line"></div>
                <div className="menu-line"></div>
                <div className="menu-line"></div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right">
              {windowWidth <= 768 && renderDropdownItems()}
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </header>
  );
}

export default Header;