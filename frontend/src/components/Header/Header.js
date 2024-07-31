import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    // Add your logout logic here
    setDropdownVisible(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="header">
      <div className="brand">Easy Money</div>
      <div className="tabs-container">
        <div className="tabs">
          <Link className="tab" to="/home">Roadmap</Link>
          <Link className="tab" to="/module1">Module 1</Link>
          <Link className="tab" to="/module2">Module 2</Link>
          <Link className="tab" to="/module3">Module 3</Link>
          <Link className="tab" to="/module4">Module 4</Link>
          <Link className="tab" to="/module5">Module 5</Link>
          <Link className="tab" to="/module6">Module 6</Link>
          <Link className="tab" to="/module7">Module 7</Link>
        </div>
      </div>
      <div className="settings">
        <button onClick={toggleDropdown}>Settings</button>
        {dropdownVisible && (
          <div className="dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
