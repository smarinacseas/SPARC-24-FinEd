import React from 'react'
import "./register.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="registerUser">
      <h3>Sign Up</h3>
      <form className="registerUserForm">
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input 
            type="text"
            id="name"
            autoComplete='off'
            placeholder="Enter your name"
          />
          <label htmlFor="email">Email:</label>
          <input 
            type="email"
            id="email"
            autoComplete='off'
            placeholder="Enter your Email"
          />
          <label htmlFor="password">Password:</label>
          <input 
            type="password"
            id="password"
            autoComplete='off'
            placeholder="Enter your password"
          />
          <button type="submit" class="btn btn-success">
            Sign Up
          </button>
          <div className="login">
            <p>Already have an account?</p>
            <Link to="/login" type="submit" class="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
