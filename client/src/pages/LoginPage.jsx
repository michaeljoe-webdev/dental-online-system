import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { loginAction } from '../state/userActions';
import './LoginPage.css';

function LoginPage() {
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');

      let loginCredentials = {}
      if (email.includes('@')) {
        loginCredentials = { email: email, password: password };
      } else {
        loginCredentials = { username: email, password: password };
      }
      const response = await axios.post(apiUrl + '/auth/login', loginCredentials);
      const token = response.data.accessToken
      const userId = response.data.userId
      const fullName = response.data.fullName
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1000
      });
      dispatch(loginAction(fullName, token, userId ));
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to login:', error);
      setError('Email, username or password not matched');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email or Username"
            className="login-input"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
          <p className="register-link">
            Don't have an account?   <Link to="/register" >Register
          </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
