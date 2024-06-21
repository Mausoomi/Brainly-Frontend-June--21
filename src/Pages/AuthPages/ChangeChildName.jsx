import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditProfile_Student } from "../../store/Actions/Authactions";
import Heading from "../../Components/Heading";
import Button from "../../Components/Button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
function ChangeChildName() {
  const UserDetails = useSelector((state) => state.auth.user);
  console.log(UserDetails);

  const dispatch = useDispatch();

  const [ChaildNAmeError, setChaildNAmeError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    Username: UserDetails.Username,
    Email: UserDetails.Email,
    Children_Name: UserDetails.Children_Name,
    // Current_Password: "",
    // New_Password: "",
    // Confirm_New_Password: "",
    StudentID: UserDetails._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    let isValid = true;

    if (formData.Children_Name.trim() === "") {
      setChaildNAmeError("Child Name is required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      try {
        console.log(formData);
        dispatch(EditProfile_Student(formData));
      } catch (error) {
        console.error("Error logging in:", error);
      }
    }
  };
  console.log(formData);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (validateInputs()) {
  //     setIsLoading(true); // Set loading state to true
  //     try {
  //       console.log(formData);
  //       await dispatch(EditProfile_Student(formData));
  //       // setUpdateSuccess(true); // Set success state
  //     } catch (error) {
  //       console.error("Error updating profile:", error);
  //       // setUpdateSuccess(false); // Set failure state
  //     } finally {
  //       setIsLoading(false); // Set loading state to false
  //     }
  //   }
  // };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setFormData({
      Username: UserDetails.Username,
      Email: UserDetails.Email,
      Children_Name: UserDetails.Children_Name,
      StudentID: UserDetails._id,
    });
  };

  return (
    <div className="w-[80%] py-4 signInBox2">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:py-4 py-2">
          <label className=" font-poppins text-white userInfoText">
            User Name
          </label>
          <input
            className=" text-slate-500 userInfoBox"
            name="Username"
            value={formData.Username}
            disabled
          />
        </div>
        <div className="flex flex-col sm:py-4 py-2">
          <label className=" font-poppins text-white userInfoText">
            Email address
          </label>
          <input
            type="email"
            className=" text-slate-500 userInfoBox"
            name="Email"
            value={formData.Email}
            disabled
            // onChange={handleChange}
          />
        </div>
        <div className="flex flex-col sm:py-4 py-2">
          <label className=" font-poppins text-white userInfoText">
            Child Name
          </label>
          <input
            className="userInfoBox"
            name="Children_Name"
            value={formData.Children_Name}
            onChange={handleChange}
            // required
          />
        </div>
        {ChaildNAmeError && (
          <span className="text-red-500">{ChaildNAmeError}</span>
        )}

        <div className="  items-center text-white gap-4">
          <div className="w-[100%] text-white py-2">
            {/* <button type="submit" onClick={handleSubmit}>
                Submit
              </button> */}
            <Button
              btnText={isLoading ? "Loading..." : "Submit"}
              onClickFunction={handleSubmit}
            />
          </div>
          <div className="w-[100%] text-white py-2">
            <button
              className="font-poppins font-medium bg-opacity-10 SignOutBtn  colorBlue"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      {/* {/ {error && <p>{error}</p>} /} */}
    </div>
  );
}

export default ChangeChildName;
