
import * as React from "react";


import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import CrossIcon from "../Assets/Images/Label.png";
import { Fetch_Partner_With_Us_Data } from "../store/Actions/Authactions";
import Button from "./Button";


function ContactUs() {
    const [closePopUp, setClosePopUp] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [Email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setmessage] = useState("");
    const [emailError, setEmailerror] = useState("");
    const [subjectError, setSubjectError] = useState("");
      const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
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

      dispatch(Fetch_Partner_With_Us_Data(formData));
    };
  return (
    <div>
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="flex items-center gap-2 "
          onClick={handlePartnerClick}
        >
          <p>Contact Us</p>
        </button>
        <div className={`popup-backdrop ${closePopUp ? "flex" : "hidden"}`}>
          <div className="popup">
            <div className="py-4">
              <div className="flex justify-between">
                <h1 className="font-poppins   SignText colorBlue ">
                  Contact with us
                </h1>
                <button id="crossReview" onClick={handleForgotPasswordClose}>
                  <img src={CrossIcon} alt="cross" />
                  {/* <RxCross2 className="colorBlue" /> */}
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
      </div>
    </div>
  );
}

export default ContactUs