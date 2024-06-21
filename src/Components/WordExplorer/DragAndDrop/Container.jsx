//Old=========================================================================================================================

import update from "immutability-helper";
import React, { memo, useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import AllDustbinsComponent from "./AllDustbinsComponent.jsx";
import { Box } from "./Box.jsx";
import { Dustbin } from "./Dustbin.jsx";

export const Container = memo(function Container({ Wordexplore }) {
  const {
    data: wordexploreData,
    endPoints: wordexploreEndPoints,
    StoryTitle: StoryTitle,
  } = Wordexplore;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activBtn, setactiveBtn] = useState(false);
  const [allBoxesDropped, setAllBoxesDropped] = useState(false);
  const LatestData = useSelector((state) => state.DragandDrop.data);

  const dragData_Data = LatestData ? LatestData : Wordexplore.data;
  console.log(LatestData, "....latest");
  //  const dragData_Data = Wordexplore.data;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dustbins.length - 1 ? 0 : prevIndex + 1
    );
    setactiveBtn(true);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dustbins.length - 1 : prevIndex - 1
    );
    setactiveBtn(false);
  };

  const [dustbins, setDustbins] = useState(dragData_Data);
  const currentPage = currentIndex + 1;
  const totalPages = dustbins?.length;

  const [boxes, setBoxes] = useState(dragData_Data);
  // console.log(dustbins , "ddddd");
  // console.log(boxes ,"bbbbb");
  // Shuffle the boxes array
  useEffect(() => {
    const shuffledBoxes = shuffleArray(boxes);
    setBoxes(shuffledBoxes);
  }, []);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const column1 = boxes.slice(0, Math.ceil(boxes.length / 2));
  const column2 = boxes.slice(Math.ceil(boxes.length / 2));
  console.log(column1)
  const [droppedBoxNames, setDroppedBoxNames] = useState([]);
  const droppedBoxCount = droppedBoxNames.length + 1;
  const boxLength = boxes.length;
  const [MatcheBoxCount, setMatchedBoxCount] = useState(0);
  const [toggleCount, setToggleCount] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const userID = user ? user._id : null;

  useEffect(() => {
    const isMatchedTrueCount = dragData_Data.filter(
      (item) => item.isMatched === true
    ).length;
    setMatchedBoxCount(isMatchedTrueCount);
  }, [toggleCount]);

  console.log(dragData_Data);
  function isDropped(boxName, index) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }
  console.log(droppedBoxNames);
  const handleDrop = useCallback(
    (index, item) => {
      console.log("---------------------- handleDrop -------");

      const { name, BoxImg } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      // console.log(dustbins);
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: {
                BoxImg: BoxImg,
                _id: dustbins[index]._id,
              },
            },
          },
        })
      );
      console.log(dustbins, "--------------after ------");
      console.log(MatcheBoxCount, ",,,,,,,,,,,,,,,,,,,,matched count inside");
      console.log(boxLength, ".........................boxLemgth inside ");
      console.log(
        allBoxesDropped,
        "..........................droppedBoxNames Inside"
      );
      if (MatcheBoxCount === boxLength) {
        setAllBoxesDropped(true);
      }
    },
    [droppedBoxNames, dustbins, MatcheBoxCount, boxLength] // ensure all dependencies are declared
  );

  useEffect(() => {
    if (MatcheBoxCount === boxLength) {
      setAllBoxesDropped(true);
    }
  }, [MatcheBoxCount, boxLength]);

  console.log(MatcheBoxCount, ",,,,,,,,,,,,,,,,,,,,Outside matched count");
  console.log(boxLength, ".........................Outside boxLemgth");
  console.log(
    allBoxesDropped,
    "..........................droppedBoxNames outside"
  );
  console.log(toggleCount, "......toggle conatiner   count");
  useEffect(() => {
    if (allBoxesDropped) {
      setCurrentIndex(dustbins.length - 1);
      setactiveBtn(true);
    }
  }, [dustbins, allBoxesDropped]);

  if (!dragData_Data || dragData_Data.length === 0) {
    return <div>Please Try Again ... Network issue ...</div>;
  }

  return (
    <div>
      {allBoxesDropped ? (
        <AllDustbinsComponent dustbins={dragData_Data} />
      ) : (
        <div>
          <div className="tracking-normal text-center text-white max-w-[770px] font-poppins font-medium py-6 px-4 worldexplorerHd">
            Drag Pictures to the matching Words, light up correct pairs, shake
            for a retry
          </div>
          <div className="dragNdrop-box">
            <div className="QueBox">
              <div
                style={{ overflow: "hidden", clear: "both" }}
                className="innerQueBox"
              >
                {dustbins.map((dustbin, index) => (
                  <div
                    key={index}
                    style={{
                      display: currentIndex === index ? "block" : "none",
                    }}
                    className="mainQueCard"
                  >
                    <Dustbin
                      accept={dustbin._id}
                      lastDroppedItem={dustbin?.lastDroppedItem?.BoxImg}
                      onDrop={(item) => handleDrop(index, item)}
                      text={dustbin.text}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      key={index}
                      word={dustbin.Storytitle}
                      meaning={dustbin.Storyttext}
                      isMatched={dustbin.isMatched}
                      matchedImg={dustbin.Storyimage}
                      Antonyms={dustbin.Antonyms}
                      Synonyms={dustbin.Synonyms}
                      Noun={dustbin.Noun}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-5 justify-center content-start items-center py-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`btnPage `}
                  style={{
                    background: activBtn
                      ? ""
                      : "linear-gradient(99.26deg, #AE5DFF 8.42%, #7F90FF 50.53%, #A891F5 89.39%)",
                  }}
                >
                  <IoIosArrowBack className="arrow" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === dustbins.length - 1}
                  className={`btnPage `}
                  style={{
                    background: activBtn
                      ? "linear-gradient(99.26deg, #AE5DFF 8.42%, #7F90FF 50.53%, #A891F5 89.39%)"
                      : "",
                  }}
                >
                  <IoIosArrowForward className="arrow" />
                </button>
              </div>
            </div>
            <div className="AnsBox">
              <div className="innerAnsBox">
                <div className="box1">
                  {column1.map(
                    ({ Storyitext, Storyimage, _id, isMatched }, index) => (
                      <Box
                        name={Storyitext}
                        type={_id}
                        isDropped={isDropped(Storyitext, index)}
                        key={index}
                        BoxImg={Storyimage}
                        acceptedTypes={dustbins[currentIndex]._id}
                        isMatched={isMatched}
                        endPoints={Wordexplore.endPoints}
                        StoryTitle={Wordexplore.StoryTitle}
                        droppedBoxCount={droppedBoxCount}
                        boxLength={boxLength}
                        MatcheBoxCount={MatcheBoxCount}
                        setMatchedBoxCount={setMatchedBoxCount}
                        lastDroppedItem={dustbins[currentIndex].lastDroppedItem}
                        setToggleCount={setToggleCount}
                        toggleCount={toggleCount}
                      />
                    )
                  )}
                </div>
                <div className="box1">
                  {column2.map(
                    ({ Storyitext, Storyimage, _id, isMatched }, index) => (
                      <Box
                        name={Storyitext}
                        type={_id}
                        isDropped={isDropped(Storyitext, index)}
                        key={index}
                        endPoints={Wordexplore.endPoints}
                        StoryTitle={Wordexplore.StoryTitle}
                        BoxImg={Storyimage}
                        acceptedTypes={dustbins[currentIndex]._id}
                        isMatched={isMatched}
                        droppedBoxCount={droppedBoxCount}
                        boxLength={boxLength}
                        lastDroppedItem={dustbins[currentIndex].lastDroppedItem}
                        setToggleCount={setToggleCount}
                        toggleCount={toggleCount}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// //Old=========================================================================================================================

// import update from "immutability-helper";
// import React, { memo, useCallback, useEffect, useState } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { useDispatch, useSelector } from "react-redux";
// import AllDustbinsComponent from "./AllDustbinsComponent.jsx";
// import { Box } from "./Box.jsx";
// import { Dustbin } from "./Dustbin.jsx";

// export const Container = memo(function Container({ Wordexplore }) {
//   console.log(Wordexplore.data);
//   const {
//     data: wordexploreData,
//     endPoints: wordexploreEndPoints,
//     StoryTitle: StoryTitle,
//   } = Wordexplore;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [activBtn, setactiveBtn] = useState(false);
//   const [allBoxesDropped, setAllBoxesDropped] = useState(false);
//   const LatestData = useSelector((state) => state.DragandDrop.data);

//   console.log("-----------------------", LatestData);

//   const dragData_Data = LatestData ? LatestData : Wordexplore.data;
//   //  const dragData_Data = Wordexplore.data;
//   console.log(dragData_Data);
//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === dustbins.length - 1 ? 0 : prevIndex + 1
//     );
//     setactiveBtn(true);
//   };

//   const handlePrevious = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? dustbins.length - 1 : prevIndex - 1
//     );
//     setactiveBtn(false);
//   };

//   const [dustbins, setDustbins] = useState(dragData_Data);
//   const currentPage = currentIndex + 1;
//   const totalPages = dustbins?.length;

//   const [boxes, setBoxes] = useState(dragData_Data);
//   // console.log(dustbins , "ddddd");
//   // console.log(boxes ,"bbbbb");
//   // Shuffle the boxes array
//   useEffect(() => {
//     const shuffledBoxes = shuffleArray(boxes);
//     setBoxes(shuffledBoxes);
//   }, []);

//   // Function to shuffle an array
//   const shuffleArray = (array) => {
//     const newArray = [...array];
//     for (let i = newArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//     }
//     return newArray;
//   };

//   const column1 = boxes.slice(0, Math.ceil(boxes.length / 2));
//   const column2 = boxes.slice(Math.ceil(boxes.length / 2));
//   const [droppedBoxNames, setDroppedBoxNames] = useState([]);
//   const droppedBoxCount = droppedBoxNames.length + 1;
//   const boxLength = boxes.length;
//   const [MatcheBoxCount, setMatchedBoxCount] = useState(0);
//   const user = useSelector((state) => state.auth.user);
//   const dispatch = useDispatch();
//   const userID = user ? user._id : null;

//   useEffect(() => {
//     const isMatchedTrueCount = dragData_Data.filter(
//       (item) => item.isMatched === true
//     ).length;
//     setMatchedBoxCount(isMatchedTrueCount);
//   }, []);

//   function isDropped(boxName, index) {
//     return droppedBoxNames.indexOf(boxName) > -1;
//   }

//   const handleDrop = useCallback(
//     (index, item) => {
//       console.log("---------------------- handleDrop -------");

//       const { name, BoxImg } = item;
//       setDroppedBoxNames(
//         update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
//       );
//       // console.log(dustbins);
//       setDustbins(
//         update(dustbins, {
//           [index]: {
//             lastDroppedItem: {
//               $set: {
//                 BoxImg: BoxImg,
//                 _id: dustbins[index]._id,
//               },
//             },
//           },
//         })
//       );
//       console.log(dustbins, "--------------after ------");
//       if (MatcheBoxCount === boxLength) {
//         setAllBoxesDropped(true);
//       }
//     },
//     [droppedBoxNames, dustbins, MatcheBoxCount, boxLength] // ensure all dependencies are declared
//   );

//   useEffect(() => {
//     if (MatcheBoxCount === boxLength) {
//       setAllBoxesDropped(true);
//     }
//   }, [MatcheBoxCount, boxLength]);

//   useEffect(() => {
//     if (allBoxesDropped) {
//       setCurrentIndex(dustbins.length - 1);
//       setactiveBtn(true);
//     }
//   }, [dustbins, allBoxesDropped]);

//   if (!dragData_Data || dragData_Data.length === 0) {
//     return <div>Please Try Again ... Network issue ...</div>;
//   }
// console.log(allBoxesDropped)

//   return (
//     <div>
//       {allBoxesDropped ? (
//         <AllDustbinsComponent dustbins={dragData_Data} />
//       ) : (
//         <div>
//           <div className="tracking-normal text-center text-white max-w-[770px] font-poppins font-medium py-6 px-4 worldexplorerHd">
//             Drag Pictures to the matching Words, light up correct pairs, shake
//             for a retry
//           </div>
//           <div className="dragNdrop-box">
//             <div className="QueBox">
//               <div
//                 style={{ overflow: "hidden", clear: "both" }}
//                 className="innerQueBox"
//               >
//                 {dustbins.map((dustbin, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       display: currentIndex === index ? "block" : "none",
//                     }}
//                     className="mainQueCard"
//                   >
//                     <Dustbin
//                       accept={dustbin._id}
//                       lastDroppedItem={dustbin?.lastDroppedItem?.BoxImg}
//                       onDrop={(item) => handleDrop(index, item)}
//                       text={dustbin.text}
//                       currentPage={currentPage}
//                       totalPages={totalPages}
//                       key={index}
//                       word={dustbin.Storytitle}
//                       meaning={dustbin.Storyttext}
//                       isMatched={dustbin.isMatched}
//                       matchedImg={dustbin.Storyimage}
//                       Antonyms={dustbin.Antonyms}
//                       Synonyms={dustbin.Synonyms}
//                       Noun={dustbin.Noun}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className="flex gap-5 justify-center content-start items-center py-4">
//                 <button
//                   onClick={handlePrevious}
//                   disabled={currentIndex === 0}
//                   className={`btnPage `}
//                   style={{
//                     background: activBtn
//                       ? ""
//                       : "linear-gradient(99.26deg, #AE5DFF 8.42%, #7F90FF 50.53%, #A891F5 89.39%)",
//                   }}
//                 >
//                   <IoIosArrowBack className="arrow" />
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   disabled={currentIndex === dustbins.length - 1}
//                   className={`btnPage `}
//                   style={{
//                     background: activBtn
//                       ? "linear-gradient(99.26deg, #AE5DFF 8.42%, #7F90FF 50.53%, #A891F5 89.39%)"
//                       : "",
//                   }}
//                 >
//                   <IoIosArrowForward className="arrow" />
//                 </button>
//               </div>
//             </div>
//             <div className="AnsBox">
//               <div className="innerAnsBox">
//                 <div className="box1">
//                   {column1.map(
//                     ({ Storyitext, Storyimage, _id, isMatched }, index) => (
//                       <Box
//                         name={Storyitext}
//                         type={_id}
//                         isDropped={isDropped(Storyitext, index)}
//                         key={index}
//                         BoxImg={Storyimage}
//                         acceptedTypes={dustbins[currentIndex]._id}
//                         isMatched={isMatched}
//                         endPoints={Wordexplore.endPoints}
//                         StoryTitle={Wordexplore.StoryTitle}
//                         droppedBoxCount={droppedBoxCount}
//                         boxLength={boxLength}
//                         MatcheBoxCount={MatcheBoxCount}
//                         setMatchedBoxCount={setMatchedBoxCount}
//                         lastDroppedItem={dustbins[currentIndex].lastDroppedItem}
//                       />
//                     )
//                   )}
//                 </div>
//                 <div className="box1">
//                   {column2.map(
//                     ({ Storyitext, Storyimage, _id, isMatched }, index) => (
//                       <Box
//                         name={Storyitext}
//                         type={_id}
//                         isDropped={isDropped(Storyitext, index)}
//                         key={index}
//                         endPoints={Wordexplore.endPoints}
//                         StoryTitle={Wordexplore.StoryTitle}
//                         BoxImg={Storyimage}
//                         acceptedTypes={dustbins[currentIndex]._id}
//                         isMatched={isMatched}
//                         droppedBoxCount={droppedBoxCount}
//                         boxLength={boxLength}
//                         lastDroppedItem={dustbins[currentIndex].lastDroppedItem}
//                       />
//                     )
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// });
