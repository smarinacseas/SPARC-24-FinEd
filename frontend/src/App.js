import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            {process.env.REACT_APP_DEV_MODE === 'true' ? (
              <Route path="*" element={<Home />} />
            ) : (
              <>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
              </>
            )}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

