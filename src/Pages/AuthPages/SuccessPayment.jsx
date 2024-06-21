import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Activate_BuyPlan,
  GetSessionDetails,
  async_loaduser,
} from "../../store/Actions/Authactions";
import { useNavigate } from "react-router-dom";

function SuccessPayment() {
  const user = useSelector((state) => state.auth.user);
  console.log(user, "user at successPage");
  const loading = useSelector((state) => state.auth.loading);
  const sessionDetails = useSelector((state) => state.auth.sessionDetails);
  console.log(sessionDetails, "sessionDetails");

  const sessionID = localStorage.getItem("SessionID");
  console.log(sessionID, "sessionID from the localstorage");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionID) {
      dispatch(GetSessionDetails(sessionID));
    }
  }, [sessionID, dispatch]);

  useEffect(() => {
    if (sessionDetails !== null) {
      const formData = {
        created: sessionDetails.created,
        student_id: sessionDetails.metadata.student_id,
        sessionID: sessionID,
        Plan_Name: sessionDetails?.metadata?.Plan_Name,
        isFree: sessionDetails?.metadata?.isFree,
      };
      dispatch(Activate_BuyPlan(formData));
    }
  }, [sessionDetails, dispatch, sessionID]);

  // useEffect(() => {
  //   dispatch(async_loaduser());
  // }, []);

  if (loading) {
    return <div>....Loading</div>;
  } else {
    return (
      <div
        className="flex items-center justify-center"
        // style={{ textAlign: "center", width: "100%", color: "white" }}
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="successModal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button> */}
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Success</span>
            </div>

            <p className="mb-4 text-lg font-extrabold  text-gray-900 dark:text-white">
              Payment Successfully
            </p>

            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Amount : {sessionDetails?.amount_total}
            </p>
            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Plan Name : {sessionDetails?.metadata?.Plan_Name}
            </p>
            {/* <h5>{sessionDetails?.amount_total}</h5>
            <h5>{sessionDetails?.created}</h5>
            <h5>{sessionDetails?.currency}</h5>
            <h5>{sessionDetails?.metadata?.student_id}</h5>
            <h5>{sessionDetails?.payment_status}</h5>
            <h5>{sessionDetails?.status}</h5>
            
            <h5>{sessionDetails?.metadata?.Plan_Name}</h5> */}
            {/* <h5>{sessionDetails?.metadata?.isFree}</h5> */}
            {sessionDetails?.amount_total === 0 ? (
              <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Free Plan Active
              </p>
            ) : (
              ""
            )}
            <button
              onClick={() => navigate("/DashBoard")}
              data-modal-toggle="successModal"
              type="button"
              className="bg-transparent hover:dark:bg-green-900 text-green-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Go To DashBoard
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessPayment;
