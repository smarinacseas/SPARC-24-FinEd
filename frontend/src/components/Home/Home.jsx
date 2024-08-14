import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './home.css'; // Import the CSS file


function Home() {
  const { logout, user } = useAuth(); // Assuming you have user info in the Auth context
  const navigate = useNavigate();
  const [moduleProgress, setModuleProgress] = useState({});

  const goToModule = (modulePath) => {
    navigate(modulePath);
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/get-progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email }), // Pass user email to fetch their progress
        });

        if (response.ok) {
          const progressData = await response.json();
          setModuleProgress(progressData); // Set progress based on response data
        } else {
          console.error('Failed to fetch progress:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, [user.email]); // Fetch progress when component mounts or when user email changes

  return (
    <div className="home-container">
      <h1 className="home-title">Easy Money Home Page</h1>
      <button className="home-button" onClick={logout}>Logout</button>
      <button className="home-button" onClick={() => goToModule('/quiz')}>Go to Quiz</button>

      {Object.keys(moduleProgress).map((module, index) => (
        <div key={index} className="module">
          <button className="home-button" onClick={() => goToModule(`/${module}`)}>
            Go to {module.charAt(0).toUpperCase() + module.slice(1)}
            <div className="progress-bar" style={{ width: `${moduleProgress[module] || 0}%` }}></div>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;