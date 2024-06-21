import React from "react";
import AboutUs from "../Components/Home/AboutUs";
import Brainylingo from "../Components/Home/Brainylingo";
import Faq from "../Components/Home/Faq";
import HowitWork from "../Components/Home/HowitWork";
import Learners from "../Components/Home/Learners";
import OurKey from "../Components/Home/OurKey";
import Revolutionize from "../Components/Home/Revolutionize";
import SelectPlan from "../Components/Home/Select-Plan";
import "../Styles/Home.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloatingButton from "./AuthPages/FloatingButton";

function HomePage({
  revolutionizeRef,
  brainylingoRef,
  howitWorkRef,
  aboutUsRef,
  learnersRef,
  selectPlanRef,
  faqRef,
}) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated);
  const userType = useSelector((state) => state.auth.userType);
  // console.log(userType);

  useEffect(() => {
    if (isAuthenticated > 0) {
      switch (userType) {
        case "student":
          navigate("/loggedInHome");
          break;
        case "admin":
          navigate("/Admin");
          break;
        default:
          navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [isAuthenticated, userType, navigate]);

  return (
    <div>
      <div ref={revolutionizeRef} id="revolutionize">
        <Revolutionize />
      </div>

      <div ref={brainylingoRef} id="brainylingo">
        <Brainylingo />
      </div>
      <div>
        <OurKey />
      </div>
      <div ref={howitWorkRef} id="howitWork">
        <HowitWork />
      </div>
      <div ref={aboutUsRef} id="aboutUs">
        <AboutUs />
      </div>
      <div ref={learnersRef} id="learners">
        <Learners />
      </div>
      <div ref={selectPlanRef} id="selectPlan">
        <SelectPlan />
      </div>
      <div ref={faqRef} id="faq">
        <Faq />
      </div>
      {/* <FloatingButton/> */}
    </div>
  );
}
export default HomePage;
