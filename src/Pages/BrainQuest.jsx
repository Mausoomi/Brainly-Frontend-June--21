import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Next from "../Assets/Images/arrow-down.png";
import pervious from "../Assets/Images/arrow-up.png";
import {
  Create_Progress,
  Create_Questions,
} from "../store/Actions/QuestionAction";
import { Fetch_weeklyperformance } from "../store/Actions/weeklyActions";
import "../Styles/Brainquest.css";
import {
  Get_Copy_brainQuest,
  Update_Copy_brainQuest,
} from "../store/Slice/BrainQuestSlice";
import "../Styles/Dashboard.css";
import StarRating from "../Components/StarRating";
import { submitRatings } from "../store/Actions/RatingAction";
import Button from "../Components/Button";
import CrossIcon from "../Assets/Images/Label.png";
import "../Styles/AuthPage.css";

function ProgressBar({ current, total }) {
  const progress = (current / total) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="question-count">
        <span className="font-Inter question-count-question">Question:</span>{" "}
        <span className="font-Inter count-question-count">
          {current} / {total}
        </span>
      </div>
    </div>
  );
}

const BrainQuest = ({ questionsData }) => {
  const {
    data: data,
    endPoints: endPoints,
    StoryTitle: StoryTitle,
  } = questionsData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [questions, setquestions] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(questions?.length).fill(null)
  );
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const BrainyUpdatedData = useSelector((state) => state.BrainQuest.data);
  const [updatedScore, setUpdatedScore] = useState(0);
  console.log("--------- BrainyUpdatedData -------- ", BrainyUpdatedData);

  const [closePopUp, setClosePopUp] = useState(false);

  const [arrayWithSelectedAns, setarrayWithSelectedAns] = useState(null);
  const [comment, setComment] = useState("");
  const [wordRating, setWordRating] = useState(0);
  const [storyRating, setStoryRating] = useState(0);
  const [questionRating, setQuestionRating] = useState(0);
  const [visitCount, setVisitCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(user?.Children_Name);

  useEffect(() => {
    let Data = {
      StoryTitle: StoryTitle,
      Student_ID: user._id,
      pathname: endPoints,
    };
    // console.log(Data);
    dispatch(Get_Copy_brainQuest(Data));
  }, []);

  useEffect(() => {
    if (BrainyUpdatedData?.length > 0) {
      // console.log(BrainyUpdatedData[0].Question_id);
      setarrayWithSelectedAns(BrainyUpdatedData[0].Question_id);
      setquestions(BrainyUpdatedData);
      const correctANs = arrayWithSelectedAns?.filter((question, index) => {
        return (
          arrayWithSelectedAns[index].answer ===
          arrayWithSelectedAns[index].submitedanswer
        );
      });
      console.log(correctANs);
      setUpdatedScore(correctANs?.length);
    } else {
      setquestions(questionsData.data);
    }
  }, [BrainyUpdatedData, arrayWithSelectedAns]);

  console.log(BrainyUpdatedData);

  if (!questions || questions?.length === 0) {
    console.log(questions);
    return (
      <div className="text-white font-bold">
        No questions available for this Story.{" "}
      </div>
    );
  }

  const handleAnswerSelection = async (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex]?.Answer;
    const isCorrect = selectedAnswer === correctAnswer;

    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      return newAnswers;
    });

    // Await dispatchCreateQuestion and handle the result
    await dispatchCreateQuestion(selectedAnswer, isCorrect);
  };

  const dispatchCreateQuestion = async (selectedAnswer, isCorrect) => {
    const formData = {
      StudentId: user?._id,
      QuestionsId: questions[currentQuestionIndex]?._id,
      question: questions[currentQuestionIndex]?.Question,
      options: questions[currentQuestionIndex]?.Option,
      answer: questions[currentQuestionIndex]?.Answer,
      submitedanswer: selectedAnswer,
      tag: "Science",
      difficultyLevel: "Easy",
      repetitionLevel: 0,
      repetitionInterval: 1,
      nextReviewDate: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
      lastRevieweDate: new Date(),
      pathname: endPoints,
      StoryTitle: questionsData.StoryTitle,
    };

    // Dispatch both actions and await their completion
    await dispatch(Create_Progress(formData));
    await dispatch(Create_Questions(formData));

    // Update answer count based on correctness
    if (isCorrect) {
      setCorrectAnswerCount((prevCount) => prevCount + 1);
    } else {
      setWrongAnswerCount((prevCount) => prevCount + 1);
    }
  };

  const handleNext = () => {
    const isCorrect =
      questions[currentQuestionIndex].Answer ===
      selectedAnswers[currentQuestionIndex];
    if (isCorrect) {
      // console.log(score);
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowScore(true);
      handleSubmit();
      setClosePopUp(true);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // console.log(questions[currentQuestionIndex]?._id);
    const formData = {
      StudentId: user?._id,
      QuestionsCorrectCount: correctAnswerCount,
      QuestionsWrongCount: wrongAnswerCount,
      TotalquestionsattemptedCount: correctAnswerCount + wrongAnswerCount,
    };
    await dispatch(Fetch_weeklyperformance({ formData }));
    console.log(formData);
    let Data = {
      StoryTitle: StoryTitle,
      Student_ID: user._id,
      pathname: endPoints,
      QuestionID: questions[currentQuestionIndex]?._id,
      isCompleted: true,
    };
    // console.log(Data);
    await dispatch(Update_Copy_brainQuest(Data));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (storyRating === 0 || wordRating === 0) {
      setErrorMessage("Please rate both the quality of stories and words.");
      return;
    }
    setErrorMessage(""); // Clear any existing errors if the submission is valid

    const rating = { wordRating, storyRating, comment };
    console.log(rating, ".....rating");
    setClosePopUp(false);
    dispatch(
      submitRatings({
        wordRating: wordRating,
        storyRating: storyRating,
        questionRating: questionRating,
        comment: comment,
        Student_id: user?._id,
        StoryTitle: questionsData?.StoryTitle,
      })
    );
  };

  const handleForgotPasswordClose = (e) => {
    e.preventDefault();
    setClosePopUp(false);
  };

  console.log(closePopUp);
  console.log({
    wordRating: wordRating,
    storyRating: storyRating,
    questionRating: questionRating,
    comment: comment,
    Student_id:[user?._id],
    StoryTitle: questionsData?.StoryTitle,
  });

  console.log(updatedScore);
  return (
    <div className="quiz-container">
      {showScore ? (
        <div>
          <div className="score-container">
            <p className="text-white pt-4 text-bold">
              Your Score: {score}/{questions.length}
            </p>
            <div className="question-details">
              <div className="correct-answers">
                <h3 className="hdScroe font-bold">CORRECT ANSWERS</h3>
                {questions.map((question, index) => {
                  if (questions[index].Answer === selectedAnswers[index]) {
                    return (
                      <div key={index} className="question-detail">
                        <p className="selectedQue">{question.question}</p>
                        <p className="seleCorr">
                          Correct Answer: {question.Answer}
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
                {questions.map((question, index) => {
                  if (
                    questions[index].Answer !== selectedAnswers[index] &&
                    selectedAnswers[index] !== null
                  ) {
                    return (
                      <div key={index} className="question-detail">
                        <p className="selectedQue">{question.question}</p>
                        <p className="seleCorr">
                          Correct Answer: {question.Answer}
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
          <div className={`popup-backdrop ${closePopUp ? "flex" : "hidden"}`}>
            <div className="popup">
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="font-poppins   SignText colorBlue ">
                    Please Provide Valuable Feedback
                  </h1>
                  <button id="crossReview" onClick={handleForgotPasswordClose}>
                    <img src={CrossIcon} alt="cross" />
                    {/* <RxCross2 className="colorBlue" /> */}
                  </button>
                </div>

                <form>
                  <div className="flex flex-col sm:py-4 py-2">
                    <label className=" font-poppins text-white userInfoText">
                      Rate the Quality of Stories
                    </label>
                    <div>
                      <StarRating
                        totalStars={5}
                        selectedStars={storyRating}
                        onRating={setStoryRating}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:py-4 py-2">
                    <label className=" font-poppins text-white userInfoText">
                      Rate the Quality of Words
                    </label>
                    <div>
                      <StarRating
                        totalStars={5}
                        selectedStars={wordRating}
                        onRating={setWordRating}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:py-4 py-2">
                    <label className=" font-poppins text-white userInfoText">
                      Rate the Quality of Questions
                    </label>
                    <div>
                      <StarRating
                        totalStars={5}
                        selectedStars={questionRating}
                        onRating={setQuestionRating}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:py-4 py-2">
                    <textarea
                      className="userInfoBox h-[100px]"
                      name="comment"
                      form="usrform"
                      placeholder="Comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )}
                </form>
                <div className="h-[50%]">
                  <Button
                    btnText="Submit"
                    onClickFunction={handleReviewSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : BrainyUpdatedData?.length > 0  ? (
        <>
          <div className="score-container">
            <p className="text-white pt-4 text-bold">
              Your Score: {updatedScore}/{arrayWithSelectedAns?.length}
            </p>
            <div className="question-details">
              <div className="correct-answers">
                <h3 className="hdScroe font-bold">CORRECT ANSWERS</h3>
                {arrayWithSelectedAns?.map((question, index) => {
                  if (
                    arrayWithSelectedAns[index].answer ===
                    arrayWithSelectedAns[index].submitedanswer
                  ) {
                    return (
                      <div key={index} className="question-detail">
                        <p className="selectedQue">{question.question}</p>
                        <p className="seleCorr">
                          Correct Answer: {question.answer}
                        </p>
                        <p className="yourAns">
                          Your Answer: {question.submitedanswer}
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
                {arrayWithSelectedAns?.map((question, index) => {
                  // console.log(question);
                  if (
                    arrayWithSelectedAns[index].answer !==
                      arrayWithSelectedAns[index].submitedanswer &&
                    arrayWithSelectedAns[index].submitedanswer !== null
                  ) {
                    return (
                      <div key={index} className="question-detail">
                        <p className="selectedQue">{question.question}</p>
                        <p className="seleCorr">
                          Correct Answer: {question.answer}
                        </p>
                        <p className="yourAns">
                          Your Answer: {question.submitedanswer}
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
          {/* <p>
            BrainQuestData already Exists Come Back Again To See the Correct
            Answers and Wrong Answers
          </p> */}
        </>
      ) : (
        <>
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={questions?.length}
          />
          <div className="question-container">
            <h2 className="question font-poppins">
              {questions[currentQuestionIndex]?.Question}
            </h2>
            <div className="answer-options">
              {questions[currentQuestionIndex]?.Option.map((answer, index) => (
                <div key={index} className="answer-option custom-radio">
                  <input
                    type="radio"
                    id={`answer-${index}`}
                    name="answer"
                    value={answer}
                    onChange={() => handleAnswerSelection(answer)}
                    checked={answer === selectedAnswers[currentQuestionIndex]}
                    className="option"
                    style={{ backgroundColor: "red" }}
                  />
                  <label
                    htmlFor={`answer-${index}`}
                    className="font-poppins answer-label"
                  >
                    {answer}
                  </label>
                </div>
              ))}
            </div>
            <div className="button-container">
              <button
                className={`previous-button ${
                  currentQuestionIndex === 0 ? "invisible" : ""
                }`}
                onClick={() =>
                  setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
                }
                disabled={currentQuestionIndex === 0}
              >
                <span>
                  <img src={pervious} alt="Previous" />
                </span>
                Previous
              </button>
              <button
                className="next-button"
                onClick={handleNext}
                disabled={
                  selectedAnswers[currentQuestionIndex] === null ||
                  showScore ||
                  selectedAnswers[currentQuestionIndex] === undefined
                }
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Finish"
                  : "Next"}
                <span>
                  <img src={Next} alt="Next" />
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BrainQuest;
