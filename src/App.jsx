// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './App.css';
import SentPage from './pages/Notify/SentPage';
import AcceptPage from './pages/Notify/AcceptPage';
import RejectPage from './pages/Notify/RejectPage';
import ReceivedPage from './pages/Notify/ReceivedPage';
import Messages from './pages/Message/Messages';


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
