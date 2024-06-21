import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../src/Styles/theme.css";
import "./App.css";
import Background from "./Components/Background";
import DailyQuiz from "./Components/Daily/DailyQuiz.jsx";
import MainStory from "./Components/MainStory";
import HomePage from "./Pages/HomePage";
import NavBar from "./Pages/NavBar";
import ScienceFictionStories from "./Pages/ScienceFictionStories";
import AdventureStories from "./Pages/AdventureStories.jsx";
import FantasyStories from "./Pages/FantasyStories.jsx";
import HistoryStories from "./Pages/HistoryStories.jsx";
import MysteryStories from "./Pages/MysteryStories.jsx";
import SportsStories from "./Pages/SportsStories.jsx";
import LeaderBoard from "./Pages/LeaderBoard.jsx";
import DashBoard from "./Pages/DashBoard.jsx";
import SignUpPage from "./Pages/AuthPages/SignUpPage.jsx";
import SignInPage from "./Pages/AuthPages/SignInPage.jsx";
import RecoverpassWord from "./Pages/AuthPages/RecoverpassWord.jsx";
import TermsNPolicy from "./Components/TermsNPolicy.jsx";
import { async_loaduser } from "./store/Actions/Authactions.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./helper/ProtectedRoute.js";
import Layout from "./Components/Admin-compoents/Layout.js";
import AdminHome from "./Components/Admin-compoents/AdminHome.js";
import AdminFantasy from "./Components/Admin-compoents/AdminFantasy/AdminFantasy.js";
import AdminADDFantasy from "./Components/Admin-compoents/AdminFantasy/AdminADDFantasy.js";
import AdminEDITFantasy from "./Components/Admin-compoents/AdminFantasy/AdminEDITFantasy.js";
import AdminAdventure from "./Components/Admin-compoents/AdminAdventure/AdminAdventure.js";
import AdminADDAdventure from "./Components/Admin-compoents/AdminAdventure/AdminADDAdventure.js";
import AdminEDITAdventure from "./Components/Admin-compoents/AdminAdventure/AdminEDITAdventure.js";
import AdminMystery from "./Components/Admin-compoents/AdminMystery/AdminMystery.js";
import AdminADDMystery from "./Components/Admin-compoents/AdminMystery/AdminADDMystery.js";
import AdminEDITMystery from "./Components/Admin-compoents/AdminMystery/AdminEDITMystery.js";
import AdminScienceFiction from "./Components/Admin-compoents/AdminScience/AdminScienceFiction.js";
import AdminADDScienceFiction from "./Components/Admin-compoents/AdminScience/AdminADDScienceFiction.js";
import AdminEDITScienceFiction from "./Components/Admin-compoents/AdminScience/AdminEDITScienceFiction.js";
import AdminHistoryFiction from "./Components/Admin-compoents/AdminHistory/AdminHistoryFiction.js";
import AdminADDHistoryFiction from "./Components/Admin-compoents/AdminHistory/AdminADDHistoryFiction.js";
import AdminEDITHistoryFiction from "./Components/Admin-compoents/AdminHistory/AdminEDITHistoryFiction.js";
import AdminSportification from "./Components/Admin-compoents/AdminSport/AdminSportification.js";
import AdminADDSportification from "./Components/Admin-compoents/AdminSport/AdminADDSportification.js";
import AdminEDITSportification from "./Components/Admin-compoents/AdminSport/AdminEDITSportification.js";
import HomeLoggeIn from "./Pages/HomeLoggeIn.jsx";
import UserInfo from "./Components/Admin-compoents/UserInfo.js";
import TermsAndConditions from "./Components/TermsAndConditions.jsx";
import ProfileDetails from "./Pages/AuthPages/ProfileDetails.jsx";
import CancelPayment from "./Pages/AuthPages/CancelPayment.jsx";
import SuccessPayment from "./Pages/AuthPages/SuccessPayment.jsx";
import PlanDetailPage from "./Pages/AuthPages/PlanDetailPage.jsx";

function App() {
  const dispatch = useDispatch();
  const revolutionizeRef = useRef(null);
  const brainylingoRef = useRef(null);
  const howitWorkRef = useRef(null);
  const aboutUsRef = useRef(null);
  const learnersRef = useRef(null);
  const selectPlanRef = useRef(null);
  const faqRef = useRef(null);
  const navigate = useNavigate();

  const scrollToRef = (refId) => {
    // console.log(refId);
    switch (refId) {
      case "revolutionize":
        navigate("/");
        revolutionizeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "brainylingo":
        navigate("/");
        brainylingoRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "aboutUs":
        navigate("/");
        aboutUsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "howitWork":
        navigate("/");
        howitWorkRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "learners":
        navigate("/");
        learnersRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "selectPlan":
        navigate("/");
        selectPlanRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "faq":
        navigate("/");
        faqRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(async_loaduser());
  }, []);

  return (
    <div className="App">
      <Background />
      <NavBar scrollToRef={scrollToRef} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              revolutionizeRef={revolutionizeRef}
              brainylingoRef={brainylingoRef}
              howitWorkRef={howitWorkRef}
              aboutUsRef={aboutUsRef}
              learnersRef={learnersRef}
              selectPlanRef={selectPlanRef}
              faqRef={faqRef}
            />
          }
        />
        <Route path="/SignUpPage" element={<SignUpPage />} />
        <Route path="/cancelPayment" element={<CancelPayment />} />
        <Route path="/successPayment" element={<SuccessPayment />} />
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route
          path="/loggedInHome"
          element={
            <ProtectedRoute>
              <HomeLoggeIn
                revolutionizeRef={revolutionizeRef}
                brainylingoRef={brainylingoRef}
                howitWorkRef={howitWorkRef}
                aboutUsRef={aboutUsRef}
                learnersRef={learnersRef}
                selectPlanRef={selectPlanRef}
                faqRef={faqRef}
              />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/RecoverpassWord"
          element={
            // <ProtectedRoute>
              <RecoverpassWord />
       
          }
        /> */}

        <Route
          path="/ProfileDetails"
          element={
            <ProtectedRoute>
              <ProfileDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/PlanDetails"
          element={
            <ProtectedRoute>
             <PlanDetailPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mainStory/:id"
          element={
            <ProtectedRoute>
              <MainStory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ScienceFictionStories"
          element={
            <ProtectedRoute>
              <ScienceFictionStories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/FantasyStories"
          element={
            <ProtectedRoute>
              <FantasyStories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdventureStories"
          element={
            <ProtectedRoute>
              <AdventureStories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MysteryStories"
          element={
            <ProtectedRoute>
              <MysteryStories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/HistoryStories"
          element={
            <ProtectedRoute>
              <HistoryStories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SportsStories"
          element={
            <ProtectedRoute>
              <SportsStories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DailyQuiz"
          element={
            <ProtectedRoute>
              <DailyQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/LeaderBoard"
          element={
            <ProtectedRoute>
              <LeaderBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DashBoard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route path="/PolicyPrivacy" element={<TermsNPolicy />} />
        <Route path="/TermsOfUse" element={<TermsAndConditions />} />
        {/* ----------------------------------------------------------------------------------------------------------------------------- Admin Routes */}
        <Route
          path="/Admin"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/Admin/Admin-Home" element={<AdminHome />} />
          <Route path="/Admin/Admin-UserDetails" element={<UserInfo />} />

          <Route path="/Admin/Admin-Fantasy" element={<AdminFantasy />} />
          <Route
            path="/Admin/Admin-Fantasy/Admin-ADDFantasy"
            element={<AdminADDFantasy />}
          />
          <Route
            path="/Admin/Admin-Fantasy/Admin-EDITFantasy/:id"
            element={<AdminEDITFantasy />}
          />
          <Route path="/Admin/Admin-Adventure" element={<AdminAdventure />} />
          <Route
            path="/Admin/Admin-Adventure/Admin-ADDAdventure"
            element={<AdminADDAdventure />}
          />
          <Route
            path="/Admin/Admin-Adventure/Admin-EDITAdventure/:id"
            element={<AdminEDITAdventure />}
          />
          <Route path="/Admin/Admin-Mystery" element={<AdminMystery />} />
          <Route
            path="/Admin/Admin-Mystery/Admin-ADDMystery"
            element={<AdminADDMystery />}
          />
          <Route
            path="/Admin/Admin-Mystery/Admin-EDITMystery/:id"
            element={<AdminEDITMystery />}
          />
          <Route
            path="/Admin/Admin-ScienceFiction"
            element={<AdminScienceFiction />}
          />
          <Route
            path="/Admin/Admin-ScienceFiction/Admin-ADDScienceFiction"
            element={<AdminADDScienceFiction />}
          />
          <Route
            path="/Admin/Admin-ScienceFiction/Admin-EDITScienceFiction/:id"
            element={<AdminEDITScienceFiction />}
          />
          <Route
            path="/Admin/Admin-HistoryFiction"
            element={<AdminHistoryFiction />}
          />
          <Route
            path="/Admin/Admin-HistoryFiction/Admin-ADDHistoryFiction"
            element={<AdminADDHistoryFiction />}
          />
          <Route
            path="/Admin/Admin-HistoryFiction/Admin-EDITHistoryFiction/:id"
            element={<AdminEDITHistoryFiction />}
          />
          <Route
            path="/Admin/Admin-Sportification"
            element={<AdminSportification />}
          />
          <Route
            path="/Admin/Admin-Sportification/Admin-ADDSportification"
            element={<AdminADDSportification />}
          />
          <Route
            path="/Admin/Admin-Sportification/Admin-EDITSportification/:id"
            element={<AdminEDITSportification />}
          />
        </Route>
      </Routes>
      <ToastContainer
        style={{
          zIndex: 9999,
          position: "fixed", // Use 'fixed' instead of 'absolute'
          top: 0,
          right: 0,
        }}
      />
    </div>
  );
}

export default App;
