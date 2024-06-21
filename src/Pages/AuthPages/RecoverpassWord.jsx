// import React, { useEffect, useState } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";
// import { useDispatch, useSelector } from "react-redux";
// import { Find_Email, MatchOTP, Reset_Password } from "../../store/Actions/Authactions";

// function RecoverpassWord() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.FoundedUser);
//   const message = useSelector((state) => state.auth.Message);
//   //   console.log(user);
//   //   console.log(message);
//   const [Email, setEmail] = useState("");
//   const [step, setStep] = useState(1);
//   const [OTP, setOTP] = useState();
//   const [New_Password, setNew_Password] = useState();
//   const [ConfirmPassword, setConfirmPassword] = useState()
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const [closePopUp, setClosePopUp] = useState(false);

//   const handleNext = () => {

//     switch (step) {
//       case 1:
//         dispatch(Find_Email({ Email: Email }));
//         setStep(2);
//         break;
//       case 2:
//         dispatch(MatchOTP({ OTP: OTP, user_id: user._id }));
//         break;
//       default:
//         // Handle other steps or no action
//         break;
//     }
//   };

//   useEffect(() => {
//     if (message === "OTP  Matched Successfully") {
//       setStep(3);
//     } else {
//       setStep(1);
//     }
//   }, [message]);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };
//   const handleForgotPasswordClose = (e) => {
//     e.preventDefault();
//     setClosePopUp(true);
//   };

//   const handleForgetSubmit = async () => {
//     const data = {
//       id: user._id,
//       New_Password: New_Password,
//     };
//     await dispatch(Reset_Password(data));
//     await setStep(1)
//     setClosePopUp(true);
//   };

//   return (
//     <div>
//       <div className={`popup-backdrop ${closePopUp ? "hidden" : "flex"}`}>
//         <div className="popup">
//           {step === 1 && (
//             <div>
//               <h2 className="font-poppins font-normal text-white SignText">
//                 Forgot Password
//               </h2>
//               <form>
//                 <div className="flex flex-col sm:py-4 py-2">
//                   <label className=" font-poppins text-white userInfoText">
//                     Email address
//                   </label>
//                   <input
//                     type="Email"
//                     value={Email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="userInfoBox"
//                   />
//                 </div>
//               </form>
//               <button onClick={handleNext}>Next</button>
//             </div>
//           )}

//           {step === 2 && (
//             <div>
//               <h2 className="font-poppins font-normal text-white SignText">
//                 Forgot Password
//               </h2>
//               <form>
//                 <div className="flex flex-col sm:py-4 py-2">
//                   <label className=" font-poppins text-white userInfoText">
//                     Enter OTP
//                   </label>
//                   <input
//                     type="number"
//                     value={OTP}
//                     onChange={(e) => setOTP(e.target.value)}
//                     required
//                     className="userInfoBox"
//                   />
//                 </div>
//               </form>
//               <button onClick={handleNext}>Next</button>
//             </div>
//           )}

//           {step === 3 && (
//             <div>
//               <h2 className="font-poppins font-normal text-white SignText">
//                 Change Password
//               </h2>
//               <form>
//                 <div className="flex flex-col sm:py-4 py-2">
//                   <label className=" font-poppins text-white userInfoText">
//                     New PassWord
//                   </label>
//                   <p className="flex gap-2 items-center text-white">
//                     <span
//                       onClick={togglePasswordVisibility}
//                       className="text-white"
//                     >
//                       {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
//                     </span>
//                     Hide
//                   </p>
//                   <input
//                     type={passwordVisible ? "text" : "password"}
//                     value={New_Password}
//                     onChange={(e) => setNew_Password(e.target.value)}
//                     required
//                     className="userInfoBox"
//                   />
//                   <p className='font-poppins text-white text-left'>Use 8 or more characters with a mix of letters, numbers & symbols</p>
//                 </div>
//                 <div className="flex flex-col sm:py-4 py-2">
//                   <label className=" font-poppins text-white userInfoText">
//                     Match password
//                   </label>
//                   <input
//                     type="password"
//                     value={ConfirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                     className="userInfoBox"
//                   />
//                 </div>
//               </form>
//               <button onClick={handleForgetSubmit}>Submit</button>
//             </div>
//           )}

//           <button className="cross" onClick={handleForgotPasswordClose}>
//             <RxCross2 />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RecoverpassWord;


import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Find_Email, MatchOTP, Reset_Password } from "../../store/Actions/Authactions";

function RecoverpassWord() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.FoundedUser);
  const message = useSelector((state) => state.auth.Message);

  const [Email, setEmail] = useState("");
  const [userNameError,setUserNameError]= useState("")
  const [step, setStep] = useState(1);
  const [OTP, setOTP] = useState("");
  const [New_Password, setNew_Password] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [closePopUp, setClosePopUp] = useState(false);

  const handleNext = () => {
    switch (step) {
      case 1:
        if (Email.trim() === '') {
          setUserNameError('Email is required');
         return
        }
        else{
          dispatch(Find_Email({ Email: Email }));
          setStep(2);
        }
       
        break;
      case 2:
        dispatch(MatchOTP({ OTP: OTP, user_id: user._id }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (message === "OTP  Matched Successfully") {
      setStep(3);
    } else {
      setStep(1);
    }
  }, [message]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleForgotPasswordClose = (e) => {
    e.preventDefault();
    setClosePopUp(true);
  };

  const handleForgetSubmit = async () => {
    if (New_Password.trim() === '') {
      setPasswordError('Password is required');
      return;
    
    } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/.test(New_Password)) {
      setPasswordError('Password must be 8 or more characters long and contain at least one letter, one number, and one special character');
   
      return;
    }

    else if (New_Password !== ConfirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } 
 
    
    const data = {
      id: user._id,
      New_Password: New_Password,
    };

    await dispatch(Reset_Password(data));
    setStep(1);
    setClosePopUp(true);
  };

  return (
    <div>
      <div className={`popup-backdrop ${closePopUp ? "hidden" : "flex"}`}>
        <div className="popup">
          {step === 1 && (
            <div>
              <h2 className="font-poppins font-normal text-white SignText">
                Forgot Password
              </h2>
              <form>
                <div className="flex flex-col sm:py-4 py-2">
                  <label className=" font-poppins text-white userInfoText">
                    Email address
                  </label>
                  <input
                    type="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="userInfoBox"
                  />
                </div>
                {userNameError && (
                  <p className="text-red-500">{userNameError}</p>
                )}
              </form>
              <button onClick={handleNext}>Next</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-poppins font-normal text-white SignText">
                Forgot Password
              </h2>
              <form>
                <div className="flex flex-col sm:py-4 py-2">
                  <label className=" font-poppins text-white userInfoText">
                    Enter OTP
                  </label>
                  <input
                    type="number"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    required
                    className="userInfoBox"
                  />
                </div>
              </form>
              <button onClick={handleNext}>Next</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-poppins font-normal text-white SignText">
                Change Password
              </h2>
              <form>
                <div className="flex flex-col sm:py-4 py-2">
                  <label className=" font-poppins text-white userInfoText">
                    New Password
                  </label>
                  <p className="flex gap-2 items-center text-white">
                    <span
                      onClick={togglePasswordVisibility}
                      className="text-white"
                    >
                      {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                    Hide
                  </p>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={New_Password}
                    onChange={(e) => setNew_Password(e.target.value)}
                    required
                    className="userInfoBox"
                  />
                  <p className='font-poppins text-white text-left'>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                </div>
                <div className="flex flex-col sm:py-4 py-2">
                  <label className=" font-poppins text-white userInfoText">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="userInfoBox"
                  />
                </div>
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}
              </form>
              <button onClick={handleForgetSubmit}>Submit</button>
            </div>
          )}

          <button className="cross" onClick={handleForgotPasswordClose}>
            <RxCross2 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecoverpassWord;
