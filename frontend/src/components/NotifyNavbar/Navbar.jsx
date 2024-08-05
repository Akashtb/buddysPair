// src/components/Navbar.js

import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="nav-item">🏠</div>
      <Link to="/accept" className="navbar-item">Accept</Link>
      <Link to="/reject" className="navbar-item">Reject</Link>
      <Link to="/received" className="navbar-item">Received</Link>
      <Link to="/sent" className="navbar-item">Sent</Link>
      <Link to="/message" className="navbar-item">💬</Link>

    </nav>
  );
};

export default Navbar;
