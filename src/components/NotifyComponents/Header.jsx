// src/components/Header.js
import './Header.css';

const Header = ({ title }) => {
  return (
    <div className="header">
      <input type="text" className="search-bar" placeholder="🔍" />
    
      <h1 className="title">{title}</h1>
    </div>
  );
};

export default Header;
