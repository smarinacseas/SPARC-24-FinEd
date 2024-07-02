import React from 'react'
import "./login.css";
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="registerUser">
      <h3>Login</h3>
      <form className="registerUserForm">
        <div className="inputGroup">
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
            Login
          </button>
        </div>
      </form>
      <div className="login">
        <p>Don't have an account?</p>
        <Link to="/" type="submit" class="btn btn-secondary">
          Create an Account
        </Link>
      </div>
    </div>
  )
}

export default Login
