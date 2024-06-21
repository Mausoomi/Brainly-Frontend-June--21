import React, { useEffect, useState } from "react";
import UserInfoCart from "./UserInfoCart";
import { useDispatch, useSelector } from "react-redux";
import { Get_All_Student_list } from "../../store/Actions/adminActions";

function UserInfo() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectName, setSelectName] = useState("");
  const [selectId, setSelectId] = useState(null);
  const [totalQuestion, setTotalQuestions] = useState(0);
  const [correctQuenstions, setCorrectQuestion] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState(0);
  const [totalWordPractice, setTotalWordPracticed] = useState(0);
  const dispatch = useDispatch();
  const handleShowDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const AllStudentList = useSelector((state) => state.Admin.allStudentData);

  // console.log(AllStudentList);

  const studentNames = AllStudentList.map((student) => {
    return { id: student._id, ChildName: student.Children_Name };
  });

  // console.log(studentNames);

  studentNames.map((item, index) => {
    // console.log(item.ChildName);
  });
  const handleIdOfStudent = (name, id) => {
    setSelectName(name);
    setSelectId(id);
    setShowDropDown(false)
  };

  console.log(selectId, selectName);
  useEffect(() => {
    dispatch(Get_All_Student_list());
  }, []);

  return (
    <div>
      <h1>Student Details</h1>
      <>
        <div className="text-white dashboard-bg">
          <div>
            <div>
              <h1 className="client-name-h"></h1>
            </div>
            <div>
              <div>
                <h4 className="text-black chart-h">Activity</h4>
                <div>
                  <div className="flex flex-col relative ">
                    Select Student
                    <button
                      id="dropdownDelayButton"
                      data-dropdown-toggle="dropdownDelay"
                      data-dropdown-delay="500"
                      data-dropdown-trigger="hover"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 btnAdminDropDwon"
                      type="button"
                      onClick={() => handleShowDropDown()}
                    >
                      {selectName ? <>{selectName}</> : " Select Student"}

                      <svg
                        class="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div
                      id="dropdownDelay"
                      class={`z-10 ${
                        showDropDown ? "flex" : "hidden"
                      } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-20`}
                    >
                      <ul
                        class="py-2 text-sm text-gray-700 dark:text-gray-200 w-full"
                        aria-labelledby="dropdownDelayButton"
                      >
                        {showDropDown ? (
                          <>
                            {studentNames.map((item, index) => (
                              <li
                                className="block w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white px-4 py-2 name"
                                key={index}
                                onClick={() =>
                                  handleIdOfStudent(item.ChildName, item.id)
                                }
                              >
                                {item.ChildName}
                              </li>
                            ))}
                          </>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="activity-container">
                  <div className="ab-1">
                    <div className="activity-box">
                      <img
                        src={require("../../Assets/Images/d-4.png")}
                        alt=""
                      />
                      <div>
                        <p className="text-black">Total Questions</p>
                        <h5 className="text-black">{totalQuestion}</h5>
                      </div>
                    </div>
                    <div className="activity-box">
                      <img
                        src={require("../../Assets/Images/d-3.png")}
                        alt=""
                      />
                      <div>
                        <p className="text-black">Correct Answers</p>
                        <h5 className="text-black">{correctQuenstions}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="ab-1">
                    <div className="activity-box">
                      <img
                        src={require("../../Assets/Images/d-2.png")}
                        alt=""
                      />
                      <div>
                        <p className="text-black">Wrong Answered</p>
                        <h5 className="text-black">{wrongQuestions}</h5>
                      </div>
                    </div>
                    <div className="activity-box">
                      <img
                        src={require("../../Assets/Images/d-1.png")}
                        alt=""
                      />
                      <div>
                        <p className="text-black">Total Words Practiced</p>
                        <h5 className="text-black">{totalWordPractice}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="activity-container-admin">
                <div style={{ color: "white" }}>
                  <UserInfoCart
                    studentId={selectId}
                    setTotalQuestions={setTotalQuestions}
                    setCorrectQuestion={setCorrectQuestion}
                    setWrongQuestions={setWrongQuestions}
                    setTotalWordPracticed={setTotalWordPracticed}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default UserInfo;
