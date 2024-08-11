import React from "react";
import Header from "../components/HeaderAyas";
import Footer from "../components/FooterAyas";

const gridData = [
  { id: 1,image:<img src="/assets/Images/mammootty.jpeg" alt="" className="h-10 rounded-full"></img>,image2:<img src="/Images/love.png" alt="" className="h-4"></img>,image3:<img src="/Images/cross.png" alt="" className="h-4 -mt-6"></img>, order:'A', name: 'Item 1', description: 'Description for item 1' },
  { id: 2,image:<img src="/assets/Images/mammootty.jpeg" alt="" className="h-10 rounded-full"></img>,image2:<img src="/Images/love.png" alt="" className="h-4"></img>,image3:<img src="/Images/cross.png" alt="" className="h-4 -mt-6"></img>,order:'B', name: 'Item 2', description: 'Description for item 2' },
  { id: 3,image:<img src="/assets/Images/mammootty.jpeg" alt="" className="h-10 rounded-full"></img>,image2:<img src="/Images/love.png" alt="" className="h-4"></img>,image3:<img src="/Images/cross.png" alt="" className="h-4 -mt-6"></img>,order:'C', name: 'Item 3', description: 'Description for item 3' },

  // Add more items as needed
];

function Contacted({Se}) {
  return (
    <div>

      <div>
      <Header title={Se}/>
      </div>
      <div className='grid grid-cols-1 h-screen bg-white rounded-2xl'>
        <div className=" grid grid-cols-1  gap-3 mt-5 h-px mx-3">
          {gridData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 rounded-full my-1"
            >
              <div className="grid grid-cols-1">
              <h2 className="text-lg font-semibold mt-5 mx-14 h-4">{item.order}</h2>
              <div className="grid grid-cols-4" >
              <p className="mx-12 mt-5">{item.image}</p>

              <h2 className=" grid col-start-2 col-end-4 text-lg font-semibold mt-5 mx-14 h-4 ">{item.name}</h2>
              <p className="grid col-start-2 text-blue-600 mx-14 mt-3 ">{item.description}</p>
              <p className=" -my-6 mx-8 px-12">{item.image2}</p>
              <p className="">{item.image3}</p>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
          <Footer/>
    </div>




  )
}

export default Contacted;
