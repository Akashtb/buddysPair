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
      </Routes>
    </Router>
  );
}

export default App;
