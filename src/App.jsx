// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './App.css';

import Messages from './pages/Message/Messages';
import SentPage from './pages/Sent/SentPage';
import AcceptPage from './pages/Accept/AcceptPage';
import RejectPage from './pages/Reject/RejectPage';
import ReceivedPage from './pages/Recieved/ReceivedPage';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SentPage />} />
          <Route path="/sent" element={<SentPage />} />
          <Route path="/accept" element={<AcceptPage />} />
          <Route path="/reject" element={<RejectPage />} />
          <Route path="/received" element={<ReceivedPage />} />
          <Route path="/message" element={<Messages />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
