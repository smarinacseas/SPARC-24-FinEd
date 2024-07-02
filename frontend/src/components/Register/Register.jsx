import React, { useState } from 'react';
import "./register.css";
import { Link } from "react-router-dom";
import api from '../../api'; // Adjust the path according to your project structure

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register', { firstName, lastName, email, password });
      console.log('Server response:', response);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error during registration:', error);
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
      <h3>Sign Up</h3>
      <form className="registerUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="firstName">First Name:</label>
          <input 
            type="text"
            id="firstName"
            autoComplete='off'
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label htmlFor="lastName">Last Name:</label>
          <input 
            type="text"
            id="lastName"
            autoComplete='off'
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
            Sign Up
          </button>
          {message && <p className="mt-3 text-center">{message}</p>}
          <div className="login">
            <p>Already have an account?</p>
            <Link to="/login" type="button" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
