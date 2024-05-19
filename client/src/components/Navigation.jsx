import React, { useState, useEffect, useRef } from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../state/userActions'; 
import Swal from 'sweetalert2';

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  }
  
  function LogoutLink({ children, ...props }) {
    const handleLogout = () => {
      dispatch(logoutAction());
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logout successful",
        showConfirmButton: false,
        timer: 1000,
      });
      setDropdownOpen(false);
      navigate('/login');
    };
    
    return (
      <li>
        <a href="#" onClick={handleLogout} {...props}>
          {children}
        </a>
      </li>
    );
  }

  const isLoggedIn = useSelector(state => state.userData.isLoggedIn);
  const username = useSelector(state => state.userData.username);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='nav'>
      <Link to="/" className='website-name'>
        
      <span className="logo-container">
          <img className="logo" src='./logo.png' alt="logo" />
          Monforte Dental Clinic
        </span>
        <p>Your smile, our priority.</p>
      </Link>
      <ul>
        <CustomLink to="/" className="nav-link">Home</CustomLink>
        <CustomLink to="/about" className="nav-link">About</CustomLink>
        <CustomLink to="/services" className="nav-link">Services</CustomLink>
        <CustomLink to="/contact" className="nav-link">Contact</CustomLink>
        {isLoggedIn ? (
          <li className="dropdown" ref={dropdownRef}>
            <a href="#" className="nav-link" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {username}
            </a>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <CustomLink to="/dashboard"  className="dropdown-item" onClick={() => setDropdownOpen(!dropdownOpen)}>Dashboard</CustomLink>
                <CustomLink to="/appointments" className="dropdown-item" onClick={() => setDropdownOpen(!dropdownOpen)}>Appointment</CustomLink>
                <LogoutLink className="dropdown-item" >Logout</LogoutLink>
              </ul>
            )}
          </li>
        ) : (
          <CustomLink to="/login" className="nav-link">Login</CustomLink>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
