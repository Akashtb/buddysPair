import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Footer = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <footer className="bg-gray-100 rounded-full -my-10 md:hidden mx-auto">
      <div className="grid grid-cols-6 gap-4 mx-auto items-center">
        <div></div>
        <div>
          <img
            src="/assets/Images/newglass.jpeg"
            alt="New Glass"
            className="bg-pink-500 h-6 rounded-3xl -mx-5"
            onClick={() => navigate('/locationSorting')} // Add navigation
          />
        </div>
        <div>
          <img
            src="/assets/Images/love.png"
            alt="Love"
            className="h-6 mx-auto bg-pink-400 rounded-full"
            onClick={() => navigate('/sent')} // Add navigation
          />
        </div>
        <div>
          <img
            src="/assets/Images/home2.png"
            alt="Home"
            className="h-9 mx-auto bg-pink-950 rounded-full"
            onClick={() => navigate('/buddysHomePage')} // Add navigation
          />
        </div>
        <div>
          <img
            src="/assets/Images/star.jpeg"
            alt="Star"
            className="h-9 mx-auto bg-pink-950 rounded-full"
            onClick={() => navigate('/shortlist')} // Add navigation
          />
        </div>
        <div>
          <img
            src="/assets/Images/comment.png"
            alt="Comment"
            className="h-6 mx-auto"
            onClick={() => navigate('/message')} // Add navigation
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
