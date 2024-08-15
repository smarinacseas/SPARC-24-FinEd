import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Quiz from './components/Quiz/Quiz';
import Header from './components/Header/Header';
import Module1 from './components/Modules/Module1/Module1';
import Module2 from './components/Modules/Module2/Module2';
import Module3 from './components/Modules/Module3/Module3';
import Module4 from './components/Modules/Module4/Module4';
import Module5 from './components/Modules/Module5/Module5';
import Module6 from './components/Modules/Module6/Module6';
import Module7 from './components/Modules/Module7/Module7';
import { AuthProvider, useAuth } from './context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <>
            <Header />
            <Routes>
              {process.env.REACT_APP_DEV_MODE === 'true' ? (
                <Route path="*" element={<Home />} />
              ) : (
                <>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                  <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
                  <Route path="/module1" element={<PrivateRoute><Module1 /></PrivateRoute>} />
                  <Route path="/module2" element={<PrivateRoute><Module2 /></PrivateRoute>} />
                  <Route path="/module3" element={<PrivateRoute><Module3 /></PrivateRoute>} />
                  <Route path="/module4" element={<PrivateRoute><Module4 /></PrivateRoute>} />
                  <Route path="/module5" element={<PrivateRoute><Module5 /></PrivateRoute>} />
                  <Route path="/module6" element={<PrivateRoute><Module6 /></PrivateRoute>} />
                  <Route path="/module7" element={<PrivateRoute><Module7 /></PrivateRoute>} />
                </>
              )}
            </Routes>
          </>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
