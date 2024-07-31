// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import SentPage from './pages/BuddyNotify/SentPage';
import AcceptPage from './pages/BuddyNotify/AcceptPage';
import RejectPage from './pages/BuddyNotify/RejectPage';
import ReceivedPage from './pages/BuddyNotify/ReceivedPage';

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
      
        </Routes>
      </div>
    </Router>
  );
};

export default App;
