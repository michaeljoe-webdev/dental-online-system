import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomePage.css';

function HomePage() {
  const isLoggedIn = useSelector(state => state.userData.isLoggedIn)

  return (
    <>
      <div>
        <section className="header-section">
          <span className="logo-container">
            <img className="logo" src='./logo.png' alt="logo" />
            Monforte Dental Clinic
          </span>
          <span className="quote">"Cherish your teeth, for they are the guardians of your laughter."</span>
          <p>Book your appointment easily and quickly.</p>
          <button className='appointment-button'>
            {isLoggedIn ? (
              <Link className='appointment-text' to="/appointments" >Book An Appointment</Link>
              ) : (
              <Link className='appointment-text' to="/login" >Book An Appointment</Link>
            )}
          </button>
        </section>

        <section className="card-section">
          <div className="card">
            <h3>Accommodating</h3>
            <img src="./images/icons/accomodating.svg" alt="Team Member 1" />
            <p>Our clinic offers a welcoming environment, tailored to make every patient feel comfortable and cared for.</p>
          </div>
          <div className="card">
            <h3>Convenient</h3>
            <img src="./images/icons/convenient.svg" alt="Team Member 1" />
            <p>Located in a central area with flexible hours, we ensure that your dental care fits seamlessly into your busy schedule.</p>
          </div>
          <div className="card">
            <h3>Affordable</h3>
            <img src="./images/icons/affordable.svg" alt="Team Member 1" />
            <p>We provide high-quality dental services at competitive prices, with various payment options to suit your budget.</p>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet the Team</h2>
          <div className="team-member">
            <img src="./images/dentists/dentist1.jpg" alt="Team Member 1" />
            <p style={{ fontSize: '24px' }}><strong>Dr. John Doe</strong></p>
            <p>Dentist</p>
          </div>
          <div className="team-member">
            <img src="./images/dentists/dentist2.jpg" alt="Team Member 2" />
            <p style={{ fontSize: '24px' }}><strong>Dr. Jane Smith</strong></p>
            <p>Dental Hygienist</p>
          </div>
          <div className="team-member">
            <img src="./images/dentists/dentist3.jpg" alt="Team Member 3" />
            <p style={{ fontSize: '24px' }}><strong>Dr. Mei Chen</strong></p>
            <p>Dental Hygienist</p>
          </div>
        </section>

        <section className="testimonials-section">
          <h2>Testimonials</h2>
          <div className="testimonial">
            <p>"I had a great experience at Monforte Dental Clinic. The staff was friendly and professional, and I felt well taken care of."</p>
            <p>- Sakura Park</p>
          </div>
          <div className="testimonial">
            <p>"The service was excellent. I would highly recommend Monforte Dental Clinic to anyone looking for quality dental care."</p>
            <p>- Johan Martinez</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
