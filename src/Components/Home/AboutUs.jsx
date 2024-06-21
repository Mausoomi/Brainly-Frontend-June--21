import * as React from "react";
import image from "../../Assets/Images/About-us.png";
import Heading from "../Heading";
import Paragraphs from "../Paragraphs";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import StarRating from "../StarRating";
import { useState } from "react";
import CrossIcon from "../../Assets/Images/Label.png";
import { Fetch_Partner_With_Us_Data } from "../../store/Actions/Authactions";

function AboutUs() {
  const [closePopUp, setClosePopUp] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [Email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setmessage] = useState("");
  const [emailError , setEmailerror] = useState("")
  const [subjectError , setSubjectError]= useState("")



  const dispatch = useDispatch()
  const handleForgotPasswordClose = (e) => {
    e.preventDefault();
    setClosePopUp(false);
  };
  const handlePartnerClick = () => {
    setClosePopUp(true);
  };

 const handleSave = () => {
   // Validation for empty fields
   if (!Email.trim()) {
     setEmailerror("Email address is required.");
     return;
   }
   if (!subject.trim()) {
     setSubjectError("Subject is required.");
     return;
   }

   // Email format validation using regular expression
   const emailRegex =
     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (!emailRegex.test(Email)) {
     setEmailerror("Please enter a valid email address.");
     return;
   }

   console.log("Form Submitted"); // Placeholder for actual submit logic

   const formData = {
     Email: Email,
     subject: subject,
     message: message,
   };

    dispatch( Fetch_Partner_With_Us_Data(formData))
     setClosePopUp(false)
 };


  return (
    <section className="justify-between sm:mt-8 mt-0  sm:py-14 py-4  px-4  max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex justify-center flex-col w-[41%] max-md:ml-0 max-md:w-full ">
          <img
            loading="lazy"
            src={image}
            alt="About Us"
            className=" w-full aspect-square max-md:mt-10 max-md:max-w-full hideImage"
          />
        </div>
        <div className="flex flex-col ml-5 w-[59%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center  py-2.5 max-md:mt-10 max-md:max-w-full">
            <div className="sm:text-left text-center">
              <Heading blueText="About" whiteText="Us?" />
            </div>
            <Paragraphs para="Welcome to GenAIForge Innovations, a pioneering force in educational technology based in Reading, Berkshire. Our mission is to revolutionize learning through the power of Generative AI, creating personalized and engaging educational content that caters to learners globally. With a team of passionate educators, technologists, and creators, we specialize in not just crafting adaptive educational materials, but also in providing full-stack development, web design, and quality assurance solutions. We pride ourselves on being more than just a service provider; we are a partner in innovation for educational institutions, content creators, and businesses seeking to transform the educational experience. At GenAIForge Innovations, we invite you to join us in our journey to shape the future of education, making it more accessible, engaging, and effective for everyone." />
            <div className="get-started-button">
              <div className="aboutUSBtn">
                {/* {/ <Link to={`${isAuthenticated ? "/DashBoard" : "/SignUpPage"}`}> /} */}
                <Button
                  btnText="Partner With Us"
                  onClickFunction={handlePartnerClick}
                />
              
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`popup-backdrop ${closePopUp ? "flex" : "hidden"}`}>
        <div className="popup">
          <div className="py-4">
            <div className="flex justify-between">
              <h1 className="font-poppins   SignText colorBlue ">
                Partner with us
              </h1>
              <button id="crossReview" onClick={handleForgotPasswordClose}>
                <img src={CrossIcon} alt="cross" />
                {/* {/ <RxCross2 className="colorBlue" /> /} */}
              </button>
            </div>
            {/* <h2 className="font-poppins font-normal text-white SignText">
              Contact
          
            </h2> */}
            <form>
              <div className="flex flex-col sm:py-4 py-2">
                <label className=" font-poppins text-white userInfoText">
                  Email address
                </label>
                <input
                  type="Email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="userInfoBox"
                />
              </div>
              {emailError && <p className="text-red-500">{emailError}</p>}
              <div className="flex flex-col sm:py-4 py-2">
                <label className=" font-poppins text-white userInfoText">
                  Subject
                </label>
                <input
                  type="Email"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="userInfoBox"
                />
              </div>
              {subjectError && <p className="text-red-500">{subjectError}</p>}
              <div className="flex flex-col sm:py-4 py-2">
                <textarea
                  className="userInfoBox h-[100px]"
                  name="comment"
                  form="usrform"
                  value={message}
                  onChange={(e) => setmessage(e.target.value)}
                  placeholder=" Enter text here..."
                ></textarea>
              </div>
            </form>
            
              <Button btnText="Submit" onClickFunction={handleSave} />
          
          </div>
          {/* <button className="cross" onClick={handleForgotPasswordClose}>
            <RxCross2 />
          </button> */}
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
