import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import './home.css';

function Home() {
  const { userEmail, isAuthenticated } = useAuth();  // Retrieve the authenticated user
  const navigate = useNavigate();
  const [moduleProgress, setModuleProgress] = useState({});
  const [unlockStatus, setUnlockStatus] = useState({});

  const goToModule = (modulePath) => {
    navigate(modulePath);
  };

  useEffect(() => {
    const fetchProgress = async () => {
      if (isAuthenticated && userEmail) {
        try {
          const response = await api.get('/get-progress', {
            params: { email: userEmail }
          });
          setModuleProgress(response.data);

          // Determine which modules are unlocked
          const updatedUnlockStatus = {};
          let previousModule = 'module1';
          let isUnlocked = true;

          for (const module of Object.keys(response.data)) {
            updatedUnlockStatus[module] = isUnlocked;

            if (response.data[previousModule] === 100) {
              isUnlocked = true;
            } else {
              isUnlocked = false;
            }

            previousModule = module;
          }

          setUnlockStatus(updatedUnlockStatus);
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      }
    };

    fetchProgress();
  }, [userEmail, isAuthenticated]);

  return (
    <div className="home-container">
      <h1 className="home-title">Roadmap</h1>
      <button className="home-button" onClick={() => goToModule('/quiz')}>Go to Quiz</button>

      {Object.keys(moduleProgress).map((module, index) => {
        const moduleNumber = module.replace('module', '');

        console.log("module #: ", moduleNumber); // Debugging line
        console.log("progress: ", moduleProgress[module]); // Debugging line
        
        return (
          <div key={index} className="module">
            <button
              className={`home-button ${unlockStatus[module] ? '' : 'locked'}`}
              onClick={() => unlockStatus[module] && goToModule(`/${module}`)}
              disabled={!unlockStatus[module]}
            >
              Go to Module {moduleNumber}
              <div className="progress-bar" style={{ width: `${moduleProgress[module] ?? 0}%` }}></div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;