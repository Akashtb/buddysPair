import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="hidden  lg:w-64 md:flex lg:flex-col bg-gray-200 h-screen p-4 my-5 rounded-2xl-custom ">
      <nav>
        <ul>
    
          <h2 className="text-xl font-bold">Buddyspair</h2>
          <li onClick={()=>navigate('/buddysHomePage')}><a className="block py-2 hover:bg-gray-700">Home</a></li>
            <li onClick={()=>navigate('/sent')}><a href="#" className="block py-2 hover:bg-gray-700">Love</a></li>
            <li onClick={()=>navigate('/messsage')}><a href="#" className="block py-2 hover:bg-gray-700">Messages</a></li>
            <li onClick={()=>navigate('/shortlist')}><a href="#" className="block py-2 hover:bg-gray-700">Favourites</a></li>
            <li onClick={()=>navigate('/locationSorting')}><a href="#" className="block py-2 hover:bg-gray-700">Search</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
