import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AppointmentsPage from './pages/AppointmentsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

function App() {
  const isLoggedIn = useSelector(state => state.userData.isLoggedIn)  
  return (
    <>
      <Header/>
      <Navigation/>
      <main className='container'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/*" element={<NotFound />} />
          {isLoggedIn ? (
              <Route path="/dashboard" element={<Dashboard />} />
            ) : (
              <Route path="/login" element={<LoginPage />} />
          )}
          {isLoggedIn ? (
              <> </>
            ) : (
              <Route path="/register" element={<RegisterPage />} /> 
          )}
        </Routes>
        
      </main>
      <Footer/>
    </>
  );
}

export default App;
