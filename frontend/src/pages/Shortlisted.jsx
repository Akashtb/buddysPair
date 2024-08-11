import React from "react";
import Footer from "../components/FooterAyas";
import Header2edit from "../components/Header2editAyas";

const gridData = [
  { id: 1, image: <img src="/assets/Images/mammootty.jpeg" alt="" className="h-10 rounded-full" />, image2: <img src="/assets/Images/love.png" alt="" className="h-4" />, image3: <img src="/assets/Images/cross.png" alt="" className="h-4 -mt-6" />, order: 'A', name: 'Mammootty', description: 'Lovely' },
  { id: 2, image: <img src="/assets/Images/mammootty.jpeg" alt="" className="h-10 rounded-full" />, image2: <img src="/assets/Images/love.png" alt="" className="h-4" />, image3: <img src="/assets/Images/cross.png" alt="" className="h-4 -mt-6" />, order: '', name: 'Ayas', description: 'Contact me anytime' },
  { id: 3, image: <img src="/assets/Images/mammootty.jpeg" alt="" className="h-10 rounded-full" />, image2: <img src="/assets/Images/love.png" alt="" className="h-4" />, image3: <img src="/assets/Images/cross.png" alt="" className="h-4 -mt-6" />, order: 'B', name: 'Balaraman', description: 'Always strong for you' },
  { id: 4, image: <img src="/assets/Images/mammootty.jpeg" alt="" className="h-10 rounded-full" />, image2: <img src="/assets/Images/love.png" alt="" className="h-4" />, image3: <img src="/assets/Images/cross.png" alt="" className="h-4 -mt-6" />, order: '', name: 'Borino', description: 'Call me if you like me' },
  { id: 5, image: <img src="/assets/Images/mammootty.jpeg" alt="" className="h-10 rounded-full" />, image2: <img src="/assets/Images/love.png" alt="" className="h-4" />, image3: <img src="/assets/Images/cross.png" alt="" className="h-4 -mt-6" />, order: 'C', name: 'Christopher', description: 'good' },
  { id: 6, image: <img src="" alt="" className="h-10 rounded-full" />, image2: <img src="" alt="" className="h-4" />, image3: <img src="" alt="" className="h-4 -mt-6" />, order: '', name: '', description: '' },
  // Add more items as needed
];

function Shortlisted({ Se }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full bg-gray-800 text-white rounded-t-3xl">
        <Header2edit title={Se} />
      </header>

      <div className="flex flex-1 overflow-hidden mt-4">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-200 text-black h-screen rounded-2xl-custom p-4 hidden  md:block">
          <h2 className="text-xl font-bold my-8">Buddyspair</h2>
          <ul>
            <li><a href="#" className="block py-2 hover:bg-gray-700">Home</a></li>
            <li><a href="#" className="block py-2 hover:bg-gray-700">Love</a></li>
            <li><a href="#" className="block py-2 hover:bg-gray-700">Messages</a></li>
            <li><a href="#" className="block py-2 hover:bg-gray-700">Favourites</a></li>
            <li><a href="#" className="block py-2 hover:bg-gray-700">Search</a></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1   overflow-auto p-7">
          <div className=" rounded-xl-custom bg-white w-full -my-8 ">
            {gridData.map((item) => (
              <div key={item.id} className="rounded-full my-1">
                <div className="grid grid-cols-12 gap-4 mt-4">
                  <div className="col-span-12 mt-14">{item.order}</div>
                  <div className="col-span-2 mt-4">{item.image}</div>
                  <div className="col-span-6 grid grid-rows-2">
                    <div className="font-bold">{item.name}</div>
                    <div>{item.description}</div>
                  </div>
                  <div className="col-span-2 mt-2">{item.image2}</div>
                  <div className="col-span-2 mt-8">{item.image3}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="container bg-white text-white p-4 fixed mb-0 bottom-0 ">
                <Footer />
            </footer>
    </div>
  );
}

export default Shortlisted;


