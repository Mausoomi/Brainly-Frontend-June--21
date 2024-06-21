import React from "react";
import { useSelector } from "react-redux";
import { MdLockOutline } from "react-icons/md";

function StoryCard({
  storyImg,
  text,
  Brainquest,
  id,
  onStoryTextClick,
  Storyadvenure,
  Wordexplore,
  endPoints,
  StoryTitle,
  btnText,
  index, // Added index prop
  firstIndexTitle,
}) {
  const user = useSelector((state) => state.auth.user);
  console.log(storyImg);
  console.log(StoryTitle);
  console.log(Brainquest);
  console.log(user, "..............................on story card");
  let textColorClass = "";
  if (btnText === "New") {
    textColorClass = "new-text";
  } else if (btnText === "In Progress") {
    textColorClass = "progress-text";
  } else if (btnText === "Completed") {
    textColorClass = "completed-text";
  }

  console.log(index);
console.log(firstIndexTitle , index, "...................title");

  const isFreeTrial = user.Active_Plan === "Free-Trial";
  // const isDisabled = isFreeTrial && index !== 0;
    const isDisabled = isFreeTrial && firstIndexTitle !== text;

  return (
    <div className={`sciStryCard ${isDisabled ? "disabled-card" : ""}`}>
      <div className="stryimgbox">
        <img
          src={`https://ik.imagekit.io/xhdikl4j8/${storyImg}`}
          alt="StoryImage"
          className="StoryImageBox"
        />
      </div>

      <div
        onClick={() =>
          !isDisabled &&
          onStoryTextClick(
            id,
            Brainquest,
            Storyadvenure,
            Wordexplore,
            endPoints,
            StoryTitle
          )
        }
      >
        <p
          className={`font-poppins font-semibold text-lg cursor-pointer ${
            isDisabled ? "disabled-text" : ""
          }`}
        >
          {text}
        </p>
      </div>

      <div className="w-[100%]">
        <button
          onClick={() =>
            !isDisabled &&
            onStoryTextClick(
              id,
              Brainquest,
              Storyadvenure,
              Wordexplore,
              endPoints,
              StoryTitle
            )
          }
          className={`font-poppins font-semibold text-lg btnTextSciStry ${textColorClass} ${
            isDisabled ? " text-gray-800 flex items-center justify-center" : ""
          }`}
        >
          {isDisabled ? (
            <MdLockOutline className=" text-gray-800 flex items-center justify-center text-[1.5rem]" />
          ) : (
            btnText
          )}
        </button>
      </div>
    </div>
  );
}

export default StoryCard;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

// function StoryCard({
//   storyImg,
//   text,
//   Brainquest,
//   id,
//   onStoryTextClick,
//   Storyadvenure,
//   Wordexplore,
//   endPoints,
//   StoryTitle,
//   btnText,

//   index
// }) {
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.auth.user);
//   console.log(storyImg);
//   console.log(StoryTitle);
//   console.log(Brainquest);
//   console.log(index);
//   console.log(user, "..............................on story card");
//   let textColorClass = "";
//   if (btnText === "New") {
//     textColorClass = "new-text";
//   } else if (btnText === "In Progress") {
//     textColorClass = "progress-text";
//   } else if (btnText === "Completed") {
//     textColorClass = "completed-text";
//   }

//   const isFreeTrial = user?.Active_Plan === "Free-Trial";
//   const isDisabled = isFreeTrial && index !== 0;

//   return (
//     <>
//       <div className={`sciStryCard ${isDisabled ? "disabled-card" : ""}`}>
//         <div className="stryimgbox">
//           <img
//             src={`https://ik.imagekit.io/xhdikl4j8/${storyImg}`}
//             alt="StoryImage"
//             className="StoryImageBox"
//           />
//         </div>

//         <div
//           onClick={() =>
//             !isDisabled &&
//             onStoryTextClick(
//               id,
//               Brainquest,
//               Storyadvenure,
//               Wordexplore,
//               endPoints,
//               StoryTitle
//             )
//           }
//         >
//           <p
//             className={`font-poppins font-semibold text-lg cursor-pointer ${
//               isDisabled ? "disabled-text" : ""
//             }`}
//           >
//             {text}
//           </p>
//         </div>

//         <div className="w-[100%]">
//           <button
//             onClick={() =>
//               onStoryTextClick(
//                 id,
//                 Brainquest,
//                 Storyadvenure,
//                 Wordexplore,
//                 endPoints,
//                 StoryTitle
//               )
//             }
//             className={`font-poppins font-semibold text-lg btnTextSciStry ${textColorClass} ${
//               isDisabled ? "disabled-button" : ""
//             }`}
//           >
//             {btnText}
//             {/* {StatusData ? (StatusData.Status) : (btnText)} */}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default StoryCard;
