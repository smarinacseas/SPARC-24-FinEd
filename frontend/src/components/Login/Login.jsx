import React, { useState } from 'react';
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      console.log('Server response:', response);
      setMessage(response.data.message);

      if (response.status === 200) {
        // Assume a function to save the authenticated state
        login();
        navigate('/home'); // Redirect to home after successful login
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else if (error.message) {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="registerUser">
      <h3>Login</h3>
      <form className="registerUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input 
            type="email"
            id="email"
            autoComplete='off'
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input 
            type="password"
            id="password"
            autoComplete='off'
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success">
            Login
          </button>
          {message && <p className="mt-3 text-center">{message}</p>}
        </div>
      </form>
      <div className="login">
        <p>Don't have an account?</p>
        <Link to="/register" type="button" className="btn btn-secondary">
          Create an Account
        </Link>
      </div>
    </div>
  );
};

export default Login;