import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import tick from "../../Assets/Images/tickMark.png";
import "../../Styles/Brainquest.css";
import {
  Fetch_Daily_Quiz_Data,
  Get_Daily_Quiz_Questions,
} from "../../store/Actions/DailyQuizAction";
import Heading from "../Heading";

function ProgressBar({ current, total, answeredQuestions }) {
  return (
    <div
      className="progress-container  flex items-center justify-between  absolute  "
      id="circlePostion"
    >
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          className={`progress-circle ${
            answeredQuestions[index] ? "answered" : ""
          }`}
        >
          {answeredQuestions[index] ? (
            <div className="tickImg">
              <img src={tick} alt="tick" />
            </div>
          ) : (
            <div className="questionNum">{index + 1}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function ProgressBarLine({ current, total }) {
  const progress = (current / total) * 105;

  return (
    <div className="">
      <div className="progress-barLine">
        <div className="progress" style={{ width: `${progress}% ` }}></div>
      </div>
    </div>
  );
}

function DailyQuiz() {
  const dispatch = useDispatch();

  const Daily_Quiz_Questions = useSelector(
    (state) => state.DailyQuiz.Current_DailyQuiz_Question
  );

  console.log(Daily_Quiz_Questions);

  const user = useSelector((state) => state.auth.user);
  const id = user._id;
  let questions = Daily_Quiz_Questions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(questions.length).fill(null)
  );

  const [showbg, setShowBg] = useState(true);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [nextBtnClicked, setNextBtnClicked] = useState(false);
  const [prevBtrnClicked, setPrevBtnClicked] = useState(false);
  const [ArrayOfSelectedAnsCorrect, setArrayOfSelectedAnsCorrect] = useState(
    []
  );
  const [formData, setformData] = useState({
    CorrectQuestions: null,
    WrongQuestions: null,
    id: null,
  });

  const [ArrayOfSelectedAnsWrong, setArrayOfSelectedAnsWrong] = useState([]);
  const [ValueselectedAnsArray, setValueSelectedAnsArray] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const [answeredQuestions, setAnsweredQuestions] = useState(() => {
    const initialArray = Array.from({ length: questions.length }, () => false);
    initialArray[0] = true;
    return initialArray;
  });

  useEffect(() => {
    dispatch(Get_Daily_Quiz_Questions(id));
  }, [id]);

  console.log(formData);

  console.log(ValueselectedAnsArray);

  const filtered = ValueselectedAnsArray.reduce((acc, item) => {
    // Use QuestionsId as the key
    const questionId = item.QuestionsId;
    // Check if this QuestionsId has been seen before or if the current index is greater than the one stored
    if (!acc[questionId] || item.index > acc[questionId].index) {
      acc[questionId] = item; // Store the current item for this QuestionsId
    }
    return acc;
  }, {});

  const finalArray = Object.values(filtered);

  console.log(finalArray, ".............finalArray");

  useEffect(() => {
    let newArrayOfSelectedAnsCorrect = [];
    let newArrayOfSelectedAnsWrong = [];

    finalArray.map((item, index) => {
      if (item.answer === selectedAnswers[index]) {
        newArrayOfSelectedAnsCorrect.push(item);
      } else {
        newArrayOfSelectedAnsWrong.push(item);
      }
    });
    console.log(newArrayOfSelectedAnsCorrect, "---------Correct");
    console.log(newArrayOfSelectedAnsWrong, "----------------wrong");

    setformData({
      CorrectQuestions: newArrayOfSelectedAnsCorrect,
      WrongQuestions: newArrayOfSelectedAnsWrong,
      id: id,
    });
  }, [trigger]);

  useEffect(() => {
    if (
      trigger !== 0 &&
      formData.WrongQuestions !== null &&
      formData.CorrectQuestions !== null
    ) {
      dispatch(Fetch_Daily_Quiz_Data(formData));
    }
  }, [formData, trigger]);

  const handleNext = () => {
    setNextBtnClicked(true);
    const isCorrect =
      questions[currentQuestionIndex].answer ===
      selectedAnswers[currentQuestionIndex];
    console.log(selectedAnswers[currentQuestionIndex]);

    setValueSelectedAnsArray([
      ...ValueselectedAnsArray,
      questions[currentQuestionIndex],
    ]);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    const updatedAnsweredQuestions = [...answeredQuestions];
    updatedAnsweredQuestions[currentQuestionIndex + 1] = true;
    setAnsweredQuestions(updatedAnsweredQuestions);

    if (currentQuestionIndex === questions.length - 1) {
      setShowScore(true);
      setShowBg(false);
      setTrigger((prev) => prev + 1);
      // dispatch(Fetch_Daily_Quiz_Data(formData));
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <Heading blueText="Daily" whiteText="Quiz" />
      <div className={showbg ? `Dailyquiz-container` : ""}>
        {showScore ? (
          <div className="score-container">
            <p className="text-white pt-4 text-bold">
              Your Score: {score}/{questions.length}
            </p>
            <div className="question-details">
              <div className="correct-answers">
                <h3 className="hdScroe font-bold">CORRECT ANSWERS</h3>
                {questions?.map((question, index) => {
                  if (questions[index].answer === selectedAnswers[index]) {
                    return (
                      <div key={index} className="question-detail">
                        <p className="selectedQue">{question.question}</p>
                        <p className="seleCorr">
                          Correct Answer: {question.answer}
                        </p>
                        <p className="yourAns">
                          Your Answer: {selectedAnswers[index]}
                        </p>
                        <hr />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="incorrect-answers">
                <h3 className="hdScroeWrong font-bold">INCORRECT ANSWERS</h3>
                {questions?.map((question, index) => {
                  if (
                    questions[index].answer !== selectedAnswers[index] &&
                    selectedAnswers[index] !== null
                  ) {
                    return (
                      <div key={index} className="question-detail">
                        <p className="selectedQue">{question.question}</p>
                        <p className="seleCorr">
                          Correct Answer: {question.answer}
                        </p>
                        <p className="yourAns">
                          Your Answer: {selectedAnswers[index]}
                        </p>
                        <hr />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        ) : (
          <>
            {!questions || questions.length === 0 ? (
              <div
                
                className="text-white font-bold NoDataAval pt-6 pb-4"
              >
                <div className="flex flex-col ">
                  <p className="pink-text">No more questions for today</p>
                  <p className="white-text" >
                    Check back tomorrow for the next quiz. Keep up the great
                    work and see you soon!
                  </p>
                </div>

                {/* <img
                  className="no-question"
                  src={require("../../Assets/Images/no-question.png")}
                  alt="no questions"
                /> */}
              </div>
            ) : (
              <>
                <div className="relative DailyRelative">
                  <ProgressBarLine
                    current={currentQuestionIndex}
                    total={questions.length}
                  />
                  <ProgressBar
                    current={currentQuestionIndex}
                    total={questions.length}
                    answeredQuestions={answeredQuestions}
                  />
                </div>

                <div className="question-container">
                  <h2 className="DailyQuizQuestion font-poppins" id="">
                    {currentQuestion?.question}
                  </h2>
                  <div className="DailyQuizanswer-options">
                    {currentQuestion?.options.map((answer, index) => (
                      <div key={index} className="daliyPerQues custom-radio">
                        <input
                          type="radio"
                          id={`answer-${index}`}
                          name="answer"
                          value={answer}
                          onChange={() => handleAnswerSelect(answer)}
                          checked={
                            answer === selectedAnswers[currentQuestionIndex]
                          }
                          className="option"
                          style={{ backgroundColor: "red" }}
                        />
                        <label
                          htmlFor={`answer-${index}`}
                          className="font-poppins ansMain"
                        >
                          {answer}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="DailyQuizebutton-container ">
                  <button
                    className={`${
                      currentQuestionIndex === 0 ? "invisible" : ""
                    } DailyQuize-previous-button`}
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                  >
                    <span>
                      <IoIosArrowBack className="font-semibold" />
                    </span>
                    Previous
                  </button>
                  <button
                    className="DailyQuize-next-button"
                    onClick={handleNext}
                    disabled={
                      selectedAnswers[currentQuestionIndex] === undefined ||
                      showScore ||
                      selectedAnswers[currentQuestionIndex] === null
                    }
                  >
                    {currentQuestionIndex === questions.length - 1
                      ? "Finish"
                      : "Next"}
                    <span>
                      <IoIosArrowForward className="font-semibold" />
                    </span>
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default DailyQuiz;
