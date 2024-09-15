import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Front from "./pages/Authenticate/front/index.jsx";
import Intrest from "./pages/Authenticate/Intrest/index.jsx";
import Confirm from "./pages/Authenticate/Intrest/confirm/index.jsx";
import Job from "./pages/Authenticate/job/index.jsx";
import JobSeeker from "./pages/Authenticate/job/seeker/index.jsx";
import Employe from "./pages/Authenticate/job/Employe/index.jsx";
import Other from "./pages/Authenticate/OtherProfile/index.jsx";
import Payment from "./pages/Authenticate/Payment/index.jsx";
import Payment2 from "./pages/Authenticate/Payment2/index.jsx";
import Profile from "./pages/Authenticate/Profilecreation/index.jsx";
import Registration from "./pages/Authenticate/Registration/index.jsx";
import Login from "./pages/Authenticate/UserLogin/index.jsx";
import SignUp from "./pages/Authenticate/UserSignup/index.jsx";
import Home from './pages/BuddysHome/Home';
import QualificationSorting from './pages/Qualification/QualificationSorting';
import EducationSort from './pages/EducationSort/EducationSort';
import QualificationSortingPage from './pages/SortingPages/QualificationSorting/QualificationSortingPage';
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
import ViewedMyProfileActivity from './pages/ViewedMyProfileActivity/ViewedMyProfileActivity';
import Contacted from './pages/Contacted/Contacted';
import ShortlistedBy from './pages/ShortlistedBy/ShortlistedBy';
import Shortlist from './pages/Shortlist/Shortlist';
import Settings from './pages/Settings';
import Edit from './pages/Edit.jsx';
import Change from './pages/Change';
import NotFoundPage from "./pages/pagenotfound/NotFoundPage.jsx";
import AccessDeniedPage from "./pages/accessDenied/AccessDenied.jsx";
import ChatRoomPage from "./pages/Chatroom/ChatRoomPage.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import PrivacySettings from "./pages/privacysetting/Privacy.jsx";
import AuthContext from "./context/AuthContext.jsx";
import useAxiosPrivate from "./CustomApi/UseAxiosPrivate.jsx";
import ProtectedRoute from "./customRoute/ProtectedRoute.jsx";
import IdContext from "./context/IdContext.jsx";
import { SocketMessageContext } from "./context/SocketMessageContext.jsx";


function App() {
  const { auth } = useContext(AuthContext)
  const{matrimonyProfileId} = useContext(IdContext)
  const axiosPrivate = useAxiosPrivate()
  const {socketMessage, setSocketMessage, receivedRequest, setReceivedRequest,acceptedRequest, setAcceptedRequest,rejectRequest, setRejectedRequest} = useContext(SocketMessageContext)
  console.log("receivedRequest",receivedRequest);
  // console.log("acceptedRequest",acceptedRequest);
  // console.log("rejectRequest",rejectRequest);
  // console.log("socketMessage",socketMessage);
  


  const socket = useRef();
  console.log("auth", auth);

  useEffect(() => {

    const initialRun = async () => {
      try {
        const response = await axiosPrivate.get('/api/auth/getIds');
        console.log("for initialRun", response.data);

      } catch (error) {
        console.error(error);
      }
    };

    if(matrimonyProfileId){
      initialRun();
    }
  }, [matrimonyProfileId]);




  return (
    <>
      <Routes>
        <Route path="/" element={auth && Object.keys(auth).length ? <Home socket={socket} /> : <Front />} />
        <Route path="/login" element={!auth || Object.keys(auth).length === 0 ? <Login /> : <Home socket={socket} />} />
        <Route path="/sign" element={<SignUp />} />
        <Route path="/registration/:id" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job" element={<Job />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/intrest" element={<Intrest />} />
        <Route path="/job/employe" element={<Employe />} />
        <Route path="/job/seeker" element={<JobSeeker />} />


        <Route path="/other/:id" element={
          <ProtectedRoute>
            <Other />
          </ProtectedRoute>}
        />

        <Route path="/buddysHomePage" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/QualificationSortedPage" element={
          <ProtectedRoute>
            <QualificationSorting />
          </ProtectedRoute>}
        />

        <Route path="/educationSortedPage" element={
          <ProtectedRoute>
            <EducationSort />
          </ProtectedRoute>}
        />

        <Route path="/qualificationSorting" element={
          <ProtectedRoute>
            <QualificationSortingPage />
          </ProtectedRoute>}
        />

        <Route path="/locationSorting" element={
          <ProtectedRoute>
            <LocationSortingPage />
          </ProtectedRoute>}
        />

        <Route path="/sent" element={
          <ProtectedRoute>
            <SentPage />
          </ProtectedRoute>}
        />

        <Route path="/accept" element={
          <ProtectedRoute>
            <AcceptPage />
          </ProtectedRoute>}
        />

        <Route path="/reject" element={
          <ProtectedRoute>
            <RejectPage />
          </ProtectedRoute>}
        />

        <Route path="/received" element={
          <ProtectedRoute>
            <ReceivedPage />
          </ProtectedRoute>}
        />


        <Route path="/message" element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>}
        />

        <Route path="/filter" element={
          <ProtectedRoute>
            <Filter />
          </ProtectedRoute>}
        />

        <Route path="/preference" element={
          <ProtectedRoute>
            <PartnerPreference />
          </ProtectedRoute>}
        />

        <Route path="/subscription" element={
          <ProtectedRoute>
            <SubscriptionPlan />
          </ProtectedRoute>}
        />

        <Route path='/setting' element={
          <ProtectedRoute>
            <Settings Se="Settings" />
          </ProtectedRoute>}
        />

        <Route path='/edit' element={
          <ProtectedRoute>
            <Edit Se="Edit My Profile" />
          </ProtectedRoute>}
        />

        <Route path='/change' element={
          <ProtectedRoute>
            <Change Se="Change Password" />
          </ProtectedRoute>}
        />

        <Route path="/shortlist" element={
          <ProtectedRoute>
            <Shortlist />
          </ProtectedRoute>}
        />

        <Route path="/shortlistedby" element={
          <ProtectedRoute>
            <ShortlistedBy />
          </ProtectedRoute>}
        />

        <Route path="/contacted" element={
          <ProtectedRoute>
            <Contacted />
          </ProtectedRoute>}
        />


        <Route path="/viewed" element={
          <ProtectedRoute>
            <ViewedMyProfileActivity />
          </ProtectedRoute>}
        />

        <Route path="/chat" element={
          <ProtectedRoute>
            <ChatRoomPage/>
            {/* <ChatRoomPage socket={socket} /> */}
          </ProtectedRoute>}
        />
        
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment2" element={<Payment2 />} />
        {/* <Route path="/designationSorting" element={<DesignationSortingPage />} />
        <Route path="/viewedMyProfileSorting" element={<ViewedMyProfile />} /> */}

        <Route path="*" element={<NotFoundPage />} />
        <Route path="/accessDenied" element={<AccessDeniedPage />} />
        <Route path="/privacySetting" element={<PrivacySettings />} />
      </Routes>
    </>
  );
}

export default App;
