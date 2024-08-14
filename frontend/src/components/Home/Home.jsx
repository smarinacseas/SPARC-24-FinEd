import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
import './home.css'; // Import the CSS file

function Home() {
  // const { logout } = useAuth();
  const navigate = useNavigate();

  const goToModule = (modulePath) => {
    navigate(modulePath);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Roadmap</h1>
      {/* <button className="home-button" onClick={logout}>Logout</button> */}
      <button className="home-button" onClick={() => goToModule('/quiz')}>Go to Quiz</button>
      <button className="home-button" onClick={() => goToModule('/module1')}>Go to Module 1</button>
      <button className="home-button" onClick={() => goToModule('/module2')}>Go to Module 2</button>
      <button className="home-button" onClick={() => goToModule('/module3')}>Go to Module 3</button>
      <button className="home-button" onClick={() => goToModule('/module4')}>Go to Module 4</button>
      <button className="home-button" onClick={() => goToModule('/module5')}>Go to Module 5</button>
      <button className="home-button" onClick={() => goToModule('/module6')}>Go to Module 6</button>
      <button className="home-button" onClick={() => goToModule('/module7')}>Go to Module 7</button>
    </div>
  );
}

export default Home;