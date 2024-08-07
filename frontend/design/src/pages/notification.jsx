

import React, { useState } from 'react';

const gridData = [
  { id: 1, name: 'Item 1', description: 'Description for item 1' },
  { id: 2, name: 'Item 2', description: 'Description for item 2' },
  { id: 3, name: 'Item 3', description: 'Description for item 3' },
  // Add more items as needed
];

function Notification() {
  const [showData, setShowData] = useState(false);

  const handleClick = () => {
    setShowData(!showData);
  };

  return (
    <div className="grid grid-cols-1 place-content-end p-8 mx-7">
      <button
        onClick={handleClick}
        className="fa-regular fa-bell ml-96" 
      >
        {showData ? '' : ''}
        </button>
      {showData && (
        <div className="mt-10 grid grid-cols-1  gap-24">
          {gridData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 bg-pink-700 rounded-full"
            >
              <h2 className="text-lg font-semibold mt-5 mx-14 h-12">{item.name}</h2>
              <p className="text-blue-600 mx-14">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notification;
