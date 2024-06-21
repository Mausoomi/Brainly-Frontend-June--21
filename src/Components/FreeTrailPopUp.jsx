import { useState,useEffect } from "react";
import CrossIcon from "../Assets/Images/Label.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function FreeTrailPopUp() {
  const [closePopUp, setClosePopUp] = useState(true);
    const [daysRemaining, setDaysRemaining] = useState(0);

  const handleForgotPasswordClose = (e) => {
    e.preventDefault();
    setClosePopUp(false);
  };
  const navigate = useNavigate();
  const handleSave = () => {
    navigate("/PlanDetails");
  };
  const user = useSelector((state) => state.auth.user);
  console.log(user.PaymentsID[0].createdDate);

  const createdDate = new Date(user.PaymentsID[0].createdDate);

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const today = new Date();
      const trialEndDate = new Date(createdDate);
      trialEndDate.setDate(trialEndDate.getDate() + 10);
      const timeDifference = trialEndDate - today;
      const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      setDaysRemaining(days);
    };

    calculateDaysRemaining();
  }, [createdDate]);

  return (
    <div>
      <div className="relative inline-block text-left">
        <div className={`popup-backdrop ${closePopUp ? "flex" : "hidden"}`}>
          <div className="popup">
            <div className="py-4">
              <div className="flex justify-between">
                <h1 className="font-poppins   SignText colorBlue ">Reminder</h1>
                <button id="crossReview" onClick={handleForgotPasswordClose}>
                  <img src={CrossIcon} alt="cross" />
                </button>
              </div>

              <div className="flex flex-col sm:py-4 py-2">
                <div className=" font-poppins text-white userInfoText">
                  {daysRemaining > 0
                    ? `Only ${daysRemaining} day${
                        daysRemaining > 1 ? "s" : ""
                      } left in your free trial! Upgrade to the paid plan now for continued access to premium features.`
                    : "Your free trial has ended. Upgrade to the paid plan now for continued access to premium features."}
                </div>
              </div>

              <Button btnText="Move to Plan" onClickFunction={handleSave} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeTrailPopUp;
