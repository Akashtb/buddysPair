// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Messages from './pages/Messages'

import Notification from './pages/notification';
import Settings from './pages/Settings';
import Edit from './pages/Edit';
import Change from './pages/Change';
import Contacted from './pages/Contacted';
import Shortlisted from './pages/Shortlisted';
import Shortlist from './pages/Shortlist';
import Viewed from './pages/Viewed';



const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* <Route path="/" element={<Messages Se="Messages"/>} /> */}
          <Route path="/noti" element={<Notification />} />
          <Route path='/setting' element={<Settings Se="Settings"/>} />
          <Route path='/' element={<Edit Se="Edit My Profile"/>}/>
          <Route path='/pass' element={<Change Se="Change Password"/>}/>
          <Route path='/contact' element={<Contacted Se="Contacted"/>}/>
          <Route path='/short' element={<Shortlisted Se="Shortlisted By"/>}/>
          <Route path='/by' element={<Shortlist Se="Shortlist"/>}/>
          <Route path='/view' element={<Viewed Se="Viewed My Profile"/>}/>

          </Routes>
      </div>
    </Router>
  );
};

export default App;