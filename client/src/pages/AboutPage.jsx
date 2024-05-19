import React from 'react';
import './AboutPage.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <h2>About Us</h2>
      <div className="card-container">
        <div className="card">
          <img src="dentist.jpg" alt="Dentist" />
          <div className="card-content">
            <h3>Our Team</h3>
            <p>Meet our experienced team of dentists and specialists.</p>
          </div>
        </div>
        <div className="card">
          <img src="clinic.jpg" alt="Clinic" />
          <div className="card-content">
            <h3>Our Clinic</h3>
            <p>Learn about our state-of-the-art clinic and facilities.</p>
          </div>
        </div>
        <div className="card">
          <img src="services.jpg" alt="Services" />
          <div className="card-content">
            <h3>Our Services</h3>
            <p>Explore the range of dental services we offer.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
