import './App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  return (
    <div>
      <div className='grid grid-cols-2 h-32 bg-blue-900 place-items-center rounded-t-xl '>      
       <div><i className="fa-solid fa-magnifying-glass bg-pink-300 h-8 w-8 p-2 rounded-full justify-items-start"  ></i></div>
        <div className='text-white font- text-4xl  justify-self-start'>Sent</div> 
      </div>
   <div className='grid grid-cols-2 bg-blue-900 '>
        <div className='grid grid-rows-1 bg-white rounded-tl-3xl text-white'>
          .
        </div>
        <div className='grid grid-rows-12 bg-white rounded-tr-3xl'>
          
        </div>
   </div>
   <div className='grid grid-cols-1 h-screen bg-neutral-400 rounded-2xl'>

   </div>
   <div className='grid grid-cols-6 h-14 bg-yellow-700 rounded-full mx-10 -my-28 content-evenly'>
    <div></div>
      <div><img src='/house.png' alt=''className='bg-pink-500 h-6 rounded-full m-2 '></img></div>
      <div><img src='/location-arrow-solid.svg' alt='' className='h-6 m-2 bg-white rounded-full'></img></div>
      <div><img src='/color-management.svg' alt='' className='h-9'></img></div>
      <div><img src='/icons8-multiple-users-32.png' alt='d'></img> </div>
      <div ><i class="fa-regular fa-comment"></i></div>

   </div>
    </div>


   

  )
}

export default App;
