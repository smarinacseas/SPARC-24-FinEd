import React from 'react';
import { useAuth } from '../../context/AuthContext';

function Home() {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Easy Money Home Page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;