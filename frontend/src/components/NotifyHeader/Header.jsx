// src/components/Header.js
import './Header.css';
import { CiSearch } from "react-icons/ci";
const Header = ({ title }) => {
  return (
    <div className="header">
      <span className='search'><CiSearch /></span>
      <h1 className="title">{title}</h1>
    </div>
  );
};

export default Header;
