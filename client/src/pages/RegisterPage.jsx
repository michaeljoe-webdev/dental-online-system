import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './RegisterPage.css';

const RegisterPage = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [full_name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!emailPattern.test(email)) {
      setError('Invalid email address');
      return;
    }
    if (!passwordPattern.test(password)) {
      setError(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
      );
      return;
    }

    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post(apiUrl + '/auth/register', {
        username,
        email,
        password,
        full_name,
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registration successful',
        showConfirmButton: false,
        timer: 1000,
      });
      navigate('/login');
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Registration failed',
        showConfirmButton: false,
        timer: 1000,
      });
      console.error('Failed to register', error);
      setError('User or Email already used');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
              className="register-input"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="register-input"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="register-input"
            />
          </div>
          <div>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              placeholder="Re-type Password"
              className="register-input"
            />
          </div>
          <div>
            <input
              type="text"
              value={full_name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full Name"
              className="register-input"
            />
          </div>
          <button className="register-button" type="submit">
            Register
          </button>
          <p className="register-link">
                Already have an account?   <Link to="/login" >Login
            </Link>
            </p>
        </form>

      </div>
    </div>

  );
};

export default RegisterPage;
