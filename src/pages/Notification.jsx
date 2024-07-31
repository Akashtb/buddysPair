// import React from 'react'

// function Notification() {

//     const show=()=>{
//         console.log('khuh');
//         <div className='grid grid-cols-1 gap-y-14 mx-11'>
//             <div>1</div>
//             <div>1</div>
//             <div>1</div>

//         </div>
//     }
//   return (
//     <div>
//       <div className='grid grid-cols-2 ' >
//         <div></div>
//         <div className='place-self-center m-20'>
//             <button onClick={show}>kk</button>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Notification

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
    <div className="p-8">
      <button
        onClick={handleClick}
        className="grid grid-cols-1 place-items-end rounded-3xl"
      >
        {showData ? 'h' : 'S'}
        </button>
      {showData && (
        <div className="mt-10 grid grid-cols-1  gap-24">
          {gridData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 bg-pink-700"
            >
              <h2 className="text-lg font-semibold mt-5">{item.name}</h2>
              <p className="text-blue-600">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notification;
