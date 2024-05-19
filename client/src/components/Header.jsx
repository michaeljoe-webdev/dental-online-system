import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      <ul className='social-icons'>
        <li> <Link to="/contact" ><i className='fas fa-envelope'></i>&nbsp;info@monfortedentalclinic.com</Link></li>
        <li><a href='#'><i className='fas fa-map-marker-alt'></i>&nbsp;Gen.Trias, Cavite, Philippines</a></li>
        <li><a href='#'><i className='fas fa-clock'></i>&nbsp;Opens at 8am-5pm Monday to Sunday</a></li>
        <li> <Link to="/contact" ><i className='fas fa-phone'></i>&nbsp;(555) 123-4567</Link></li>
      </ul>
    </div>
  );
};

export default Header;
