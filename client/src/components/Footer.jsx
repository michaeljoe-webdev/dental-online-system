import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Footer() {
  const isLoggedIn = useSelector(state => state.userData.isLoggedIn)
  function CustomLink({ to, children, ...props }){
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})
      return (
        <li className={isActive ? "active" : ""} >
          <Link to={to} {...props} >
            {children}
          </Link>
        </li>
      );
  }
  return (
    <>
    <footer className='footer'>
        <div>
          <div className="row">
          <div className="col"><span><em>"Cherish your teeth, for they are the guardians of your laughter."</em></span></div>
          <div className="col">
            <ul>
              <h3 className='Links'>Links</h3>
              <CustomLink to="/">Home</CustomLink>
              <CustomLink to="/about">About</CustomLink>
              <CustomLink to="/services">Services</CustomLink>
              <CustomLink to="/contact">Contact</CustomLink>
              {isLoggedIn ? (
                  <CustomLink to="/dashboard">Book An Appointment</CustomLink>
                ) : (
                  <CustomLink to="/login">Book An Appointment</CustomLink>
              )}
              
            </ul>
          </div>
          <div className="col">
            <ul>
              <h3 className='Links'>Services</h3>
              <CustomLink to="#">Routine Check-ups</CustomLink>
              <CustomLink to="#">Cleanings</CustomLink>
              <CustomLink to="#">Fillings</CustomLink>
              <CustomLink to="#">Extractions</CustomLink>
              <CustomLink to="#">Teeth Whitening</CustomLink>
              <CustomLink to="#">Orthodontics</CustomLink>
            </ul>
          </div>
          <div className="col">
          <ul>
            <h3>Contact Us</h3>
            <span>123 Main Street, Cityville</span>
            <br/>
            <span>Opens at 8am-5pm Monday to Sunday</span>
            <br/>
            <span>info@monfortedentalclinic.com</span>
            <br/>
            <span>(555) 123-4567</span>
            </ul>
          </div>
        </div>
        </div>
        <p>Copyright &copy; 2024 Monforte Dental Clinic - All Right Reserved</p>
    </footer>
    </>
  );
}

export default Footer;
