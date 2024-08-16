import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import './home.css';

function Home() {
  //const { user } = useAuth();
  const { userEmail, isAuthenticated } = useAuth();  // Retrieve the authenticated user
  const navigate = useNavigate();
  const [moduleProgress, setModuleProgress] = useState({});

  const goToModule = (modulePath) => {
    navigate(modulePath);
  };

  useEffect(() => {
    console.log('Before fetch');
    const fetchProgress = async () => {
      console.log('in fetch');
      console.log('User Email:', userEmail); 
      if (isAuthenticated && userEmail) {
        try {
          console.log('before response');
          const response = await api.get('/get-progress', {
            params: { email: userEmail }
          });
          console.log('after reponse');
          console.log('Backend Response:', response);
          console.log('Module Progress Data:', response.data); // Log the data
          setModuleProgress(response.data);
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      }
    };

    fetchProgress();
  }, [userEmail]);

  return (
    <div className="home-container">
      <h1 className="home-title">Roadmap</h1>
      <button className="home-button" onClick={() => goToModule('/quiz')}>Go to Quiz</button>

      {Object.keys(moduleProgress).map((module, index) => (
        <div key={index} className="module">
          <button className="home-button" onClick={() => goToModule(`/${module}`)}>
            Go to {module.charAt(0).toUpperCase() + module.slice(1)}
            {/* Ensure the progress bar is always rendered, even for 0% progress */}
            <div className="progress-bar" style={{ width: `${moduleProgress[module] ?? 0}%` }}></div>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;