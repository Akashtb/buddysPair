// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Messages from './pages/Message/Messages';
import SentPage from './pages/Sent/SentPage';
import AcceptPage from './pages/Accept/AcceptPage';
import RejectPage from './pages/Reject/RejectPage';
import ReceivedPage from './pages/Recieved/ReceivedPage';
import Filter from './pages/Filter/Filter';
import PartnerPreference from './pages/PartnerPreference/PartnerPreference';
import SubscriptionPlan from './pages/SubscriptionPlan/SubscriptionPlan';







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
          <Route path="/filter" element={<Filter />} />
          <Route path="/preference" element={<PartnerPreference />} />
          <Route path="/subscription" element={<SubscriptionPlan/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
