import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AppointmentsPage.css'
import AppointmentForm from '../forms/AppointmentForm';

function AppointmentsPage() {
  const isLoggedIn = useSelector(state => state.userData.isLoggedIn)

  if (!isLoggedIn) {
    return (
      <div className='appointments-container'>
        <h1>You need to log in to continue</h1>
        <Link to="/login" className="login-button">Login</Link>
      </div>
    );
  }

  return (
    <div>
      <AppointmentForm />
    </div>
  );
}

export default AppointmentsPage;
