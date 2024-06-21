import React, { useState, useEffect } from "react";
import ChartComponent from "./ChartComponent";
import "../Styles/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Fetch_LeaderBoardData_For_Current_Weeked,
  Get_Weekly_Performance_of_Student_All,
} from "../store/Actions/LeaderBoardActions";
import { Get_Count_Student } from "../store/Actions/Authactions";
import FreeTrailPopUp from "../Components/FreeTrailPopUp";


function DashBoard() {
  const user = useSelector((state) => state.auth.user);
  const [totalQuestion, setTotalQuestions] = useState(0);
  const [correctQuenstions, setCorrectQuestion] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState(0);
  const [totalWordPractice, setTotalWordPracticed] = useState(0);
const [freeTrialPopUp , setFreeTrialpopUp] = useState(false)


  console.log(user?.Children_Name);

  const AllDashboardData = useSelector(
    (state) => state.LeaderBoard.DashboardData
  );

  const WordCount = useSelector((state) => state.auth.WordCount);

  console.log(WordCount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_Weekly_Performance_of_Student_All(user._id));
    dispatch(Get_Count_Student(user._id));
  

  }, [dispatch, user._id]);

 

  const userData = AllDashboardData?.filter(
    (ele) => ele.StudentId._id === user._id
  );
  const capitalizeFirstLetter = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  console.log(AllDashboardData);

  useEffect(() => {
    if (AllDashboardData.length > 0) {
      const totalqueValue = AllDashboardData.map(
        (ele) => ele.TotalquestionsattemptedCount
      ).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      const totalCorrectValue = AllDashboardData.map(
        (ele) => ele.QuestionsCorrectCount
      ).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      const totalWrongValue = AllDashboardData.map(
        (ele) => ele.QuestionsWrongCount
      ).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      setTotalQuestions(totalqueValue);
      setCorrectQuestion(totalCorrectValue);
      setWrongQuestions(totalWrongValue);
      setTotalWordPracticed(WordCount[0]?.Count);
    }
  }, [AllDashboardData, WordCount]);

  console.log(WordCount[0]?.Count);
  console.log(totalWordPractice);

useEffect (()=>{
  if(user.Active_Plan === "Free-Trial"){
    setFreeTrialpopUp(true)
  }

},[])



  return (
    <>
      <div className="text-white dashboard-bg">
        <div>
          <div>
            <h1 className="client-name-h">
              {capitalizeFirstLetter(user?.Children_Name)}
            </h1>
          </div>
          <div>
            <div>
              <h4 className="chart-h">Activity</h4>

              <div className="activity-container">
                <div className="ab-1">
                  <div className="activity-box">
                    <img src={require("../Assets/Images/d-4.png")} alt="" />
                    <div>
                      <p>Total Questions</p>
                      <h5>{totalQuestion}</h5>
                    </div>
                  </div>
                  <div className="activity-box">
                    <img src={require("../Assets/Images/d-3.png")} alt="" />
                    <div>
                      <p>Correct Answers</p>
                      <h5>{correctQuenstions}</h5>
                    </div>
                  </div>
                </div>
                <div className="ab-1">
                  <div className="activity-box">
                    <img src={require("../Assets/Images/d-2.png")} alt="" />
                    <div>
                      <p>Wrong Answered</p>
                      <h5>{wrongQuestions}</h5>
                    </div>
                  </div>
                  <div className="activity-box">
                    <img src={require("../Assets/Images/d-1.png")} alt="" />
                    <div>
                      <p>Total Words Practiced</p>
                      {WordCount[0]?.Count ? (
                        <h5>{WordCount[0]?.Count}</h5>
                      ) : (
                        <h5>0</h5>
                      )}
                      {/* <h5>{WordCount[0]?.Count}</h5> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="activity-container">
              <div style={{ color: "white" }}>
                <ChartComponent />
              </div>
            </div>
          </div>
        </div>
        {freeTrialPopUp ? (
         <FreeTrailPopUp/>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default DashBoard;
