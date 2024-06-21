// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { EditProfile_Student, Edit_Profile_Password } from "../../store/Actions/Authactions";
// import Heading from "../../Components/Heading";
// import Button from "../../Components/Button";

// function ChangePassword() {
//   const UserDetails = useSelector((state) => state.auth.user);
//   console.log(UserDetails);
//   // const StudentID = UserDetails._id;
//   const dispatch = useDispatch();

//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [ChaildNAmeError, setChaildNAmeError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [activeTab, setActiveTab] = useState(0);
//   const [formData, setFormData] = useState({
//     // Username: UserDetails.Username,
//     // Email: UserDetails.Email,
//     // Children_Name: UserDetails.Children_Name,
//     Current_Password: "",
//     New_Password: "",
//     Confirm_New_Password: "",
//     StudentID: UserDetails._id,
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const validateInputs = () => {
//     let isValid = true;

//     if (formData.Current_Password.trim() === "") {
//       setPasswordError("Password is required");
//       isValid = false;
//     } else if (
//       !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/.test(
//         formData.Current_Password
//       )
//     ) {
//       setPasswordError(
//         "Password must be 8 or more characters long and contain at least one letter, one number, and one special character"
//       );
//       isValid = false;
//     }

//     if (formData.New_Password.trim() !== formData.Confirm_New_Password.trim()) {
//       setPasswordError("Newpassword and Confirm New Passwowrd doesn't Match");
//       isValid = false;
//     } else if (
//       !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/.test(
//         formData.New_Password
//       )
//     ) {
//       setPasswordError(
//         "Password must be 8 or more characters long and contain at least one letter, one number, and one special character"
//       );
//       isValid = false;
//     }

//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateInputs()) {
//       try {
//         console.log(formData);
//         dispatch(Edit_Profile_Password(formData));
//       } catch (error) {
//         console.error("Error logging in:", error);
//       }
//     }

//     // await dispatch(EditProfile_Student(formData));
//     // window.location.reload();
//   };
//   console.log(formData);

//   const handleCancelEdit = (e) => {
//     e.preventDefault();
//     setFormData(formData);
//   };

//   return (
//     <div className="w-[80%] py-4 signInBox2">
//       <form onSubmit={handleSubmit}>
//         <div className="flex flex-col sm:py-4 py-2">
//           <label className="flex justify-between font-poppins text-white userInfoText">
//             <p>Enter Current Password</p>
//             <p className="flex gap-2 items-center">
//               <span onClick={togglePasswordVisibility}>
//                 {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
//               </span>
//               Hide
//             </p>
//           </label>
//           <input
//             type={passwordVisible ? "text" : "password"}
//             name="Current_Password"
//             value={formData.Current_Password}
//             onChange={handleChange}
//             className="userInfoBox"
//             required
//           />
//         </div>
//         <div className="flex flex-col sm:py-4 py-2">
//           <label className="flex justify-between font-poppins text-white userInfoText">
//             <p>Create New Password</p>
//             <p className="flex gap-2 items-center">
//               <span onClick={togglePasswordVisibility}>
//                 {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
//               </span>
//               Hide
//             </p>
//           </label>
//           <input
//             type={passwordVisible ? "text" : "password"}
//             name="New_Password"
//             value={formData.New_Password}
//             onChange={handleChange}
//             className="userInfoBox"
//           />
//         </div>
//         <p className="font-poppins text-white text-left">
//           Use 8 or more characters with a mix of letters, numbers & symbols
//         </p>
//         {passwordError && <span className="text-red-500">{passwordError}</span>}
//         <div className="flex flex-col sm:py-4 py-2">
//           <label className="flex justify-between font-poppins text-white userInfoText">
//             <p>Confirm New Password</p>
//             <p className="flex gap-2 items-center">
//               <span onClick={togglePasswordVisibility}>
//                 {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
//               </span>
//               Hide
//             </p>
//           </label>
//           <input
//             type={passwordVisible ? "text" : "password"}
//             value={formData.Confirm_New_Password}
//             name="Confirm_New_Password"
//             required
//             onChange={handleChange}
//             className="userInfoBox"
//           />
//         </div>

//         <div className="  items-center text-white gap-4">
//           <div className="w-[100%] text-white py-2">
//             <Button
//               btnText="Submit"
//               type="submit"
//               onClickFunction={handleSubmit}
//             />
//           </div>
//           <div className="w-[100%] text-white py-2">
//             <button
//               className="font- poppins font-medium bg-opacity-10 SignOutBtn colorBlue"
//               onClick={handleCancelEdit}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* {/ {error && <p>{error}</p>} /} */}
//     </div>
//   );
// }

// export default ChangePassword;


import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit_Profile_Password } from "../../store/Actions/Authactions";
import Button from "../../Components/Button";

function ChangePassword() {
  const UserDetails = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    Current_Password: "",
    New_Password: "",
    Confirm_New_Password: "",
    StudentID: UserDetails._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (field) => () => {
    setPasswordVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

    const validateInputs = () => {
      let isValid = true;

      if (formData.Current_Password.trim() === "") {
        setPasswordError("Password is required");
        isValid = false;
      } else if (
        !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/.test(
          formData.Current_Password
        )
      ) {
        setPasswordError(
          "Password must be 8 or more characters long and contain at least one letter, one number, and one special character"
        );
        isValid = false;
      }

      if (formData.New_Password.trim() !== formData.Confirm_New_Password.trim()) {
        setPasswordError("Newpassword and Confirm New Passwowrd doesn't Match");
        isValid = false;
      } else if (
        !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/.test(
          formData.New_Password
        )
      ) {
        setPasswordError(
          "Password must be 8 or more characters long and contain at least one letter, one number, and one special character"
        );
        isValid = false;
      }

      return isValid;
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(""); // Reset errors
    if (validateInputs()) {
      try {
        dispatch(Edit_Profile_Password(formData));
      } catch (error) {
        console.error("Error changing password:", error);
      }
    }
  };
  const handleCancelEdit = (e) => {
    e.preventDefault();
    setFormData({
      Current_Password: "",
      New_Password: "",
      Confirm_New_Password: "",
      StudentID: UserDetails._id,
    });
  };
  return (
    <div className="w-[80%] py-4 signInBox2">
      <form onSubmit={handleSubmit}>
        <PasswordInputField
          label="Enter Current Password"
          name="Current_Password"
          value={formData.Current_Password}
          visible={passwordVisible.current}
          toggleVisibility={toggleVisibility("current")}
          onChange={handleChange}
        />
        <PasswordInputField
          label="Create New Password"
          name="New_Password"
          value={formData.New_Password}
          visible={passwordVisible.new}
          toggleVisibility={toggleVisibility("new")}
          onChange={handleChange}
        />

        <p className="font-poppins text-white text-left">
          Use 8 or more characters with a mix of letters, numbers & symbols
        </p>

        <PasswordInputField
          label="Confirm New Password"
          name="Confirm_New_Password"
          value={formData.Confirm_New_Password}
          visible={passwordVisible.confirm}
          toggleVisibility={toggleVisibility("confirm")}
          onChange={handleChange}
        />
        {passwordError && <span className="text-red-500">{passwordError}</span>}
        <div className="  items-center text-white gap-4">
          <div className="w-[100%] text-white py-2">
            <Button
              btnText="Save"
              type="submit"
              onClickFunction={handleSubmit}
            />
          </div>
          <div className="w-[100%] text-white py-2">
            <button
              className="font- poppins font-medium bg-opacity-10 SignOutBtn colorBlue"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function PasswordInputField({
  label,
  name,
  value,
  visible,
  toggleVisibility,
  onChange,
}) {
  return (
    <div className="flex flex-col sm:py-4 py-2">
      <label className="flex justify-between font-poppins text-white userInfoText">
        <p>{label}</p>
        <span onClick={toggleVisibility} className="flex gap-2 items-center">
          {visible ? <FaRegEye /> : <FaRegEyeSlash />} Hide
        </span>
      </label>
      <input
        type={visible ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className="userInfoBox"
       
      />
    </div>
  );
}

export default ChangePassword;
