import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditProfile_Student } from "../../store/Actions/Authactions";
import Heading from "../../Components/Heading";
import Button from "../../Components/Button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ChangeChildName from "./ChangeChildName";
import ChangePassword from "./ChangePassword";

function ProfileDetails() {
  const UserDetails = useSelector((state) => state.auth.user);
  console.log(UserDetails);
  // const StudentID = UserDetails._id;
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [ChaildNAmeError, setChaildNAmeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    Username: UserDetails.Username,
    Email: UserDetails.Email,
    Children_Name: UserDetails.Children_Name,
    Current_Password: "",
    New_Password: "",
    Confirm_New_Password: "",
    StudentID: UserDetails._id,
  });

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setFormData(formData);
  };

  return (
    <div className="text-white ProfileSection">
      <div>
        <Heading blueText="Profile" whiteText="Setting" />
      </div>
      <div>
        <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px">
            <li class="me-2">
              <div
                href="#"
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer ${
                  activeTab === 0
                    ? "text-blue-600 border-b-2 border-blue-600 dark:border-blue-500"
                    : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                onClick={() => handleTabClick(0)}
              >
                Change the child's name
              </div>
            </li>
            {!UserDetails?.FromGoogle ? (
              <li class="me-2">
                <div
                  href="#"
                  className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg  cursor-pointer ${
                    activeTab === 1
                      ? "text-blue-600 border-b-2 border-blue-600 dark:border-blue-500"
                      : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                  onClick={() => handleTabClick(1)}
                >
                  Change password
                </div>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {activeTab === 0 && <ChangeChildName />}
        {!UserDetails.FromGoogle ? activeTab === 1 && <ChangePassword /> : null}
      </div>
    </div>
  );
}

export default ProfileDetails;
