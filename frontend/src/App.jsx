import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/BuddysHome/Home';
import './App.css';
import QualificationSorting from './pages/Qualification/QualificationSorting';
import EducationSort from './pages/EducationSort/EducationSort';

import QualificationSortingPage from './pages/SortingPages/QualificationSorting/QualificationSortingPage'
import LocationSortingPage from './pages/SortingPages/LocationSorting/LocationSortingPage';
import DesignationSortingPage from './pages/SortingPages/DesignationSorting/DesignationSortingPage';
import ViewedMyProfile from './pages/SortingPages/ViewMyProfile/ViewedMyProfile';
import Messages from './pages/Message/Messages';
import SentPage from './pages/Sent/SentPage';
import AcceptPage from './pages/Accept/AcceptPage';
import RejectPage from './pages/Reject/RejectPage';
import ReceivedPage from './pages/Recieved/ReceivedPage';
import Filter from './pages/Filter/Filter';
import PartnerPreference from './pages/PartnerPreference/PartnerPreference';
import SubscriptionPlan from './pages/SubscriptionPlan/SubscriptionPlan';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/buddysHomePage" element={<Home />} />

        <Route path="/QualificationSortedPage" element={<QualificationSorting />} />
        <Route path="/educationSortedPage" element={<EducationSort />} />
        <Route path="/qualificationSorting" element={<QualificationSortingPage/>} />
        <Route path="/locationSorting" element={<LocationSortingPage/>} />
        <Route path="/designationSorting" element={<DesignationSortingPage/>} />
        <Route path="/viewedMyProfileSorting" element={<ViewedMyProfile/>} />
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
    </Router>
  );
}

export default App;