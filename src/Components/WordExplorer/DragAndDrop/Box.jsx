import { memo, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Update_Drag_Drop_Copy } from "../../../store/Slice/DragDropSlice";
// import { Update_Drag_Drop } from '../../../store/Actions/QuestionAction';
// import { Create_Status_Schema } from '../../../store/Slice/statusSlice';

export const Box = memo(function Box({
  name,
  type,
  isDropped,
  BoxImg,
  acceptedTypes,
  isMatched,
  endPoints,
  StoryTitle,
  droppedBoxCount,
  boxLength,
  MatcheBoxCount,
  setMatchedBoxCount,
  lastDroppedItem,
  setToggleCount,
  toggleCount,
}) {
  const dispatch = useDispatch();
  // console.log(StoryTitle);
  const user = useSelector((state) => state.auth.user);

  const userID = user ? user._id : null;
  // console.log(lastDroppedItem);

  const [successfulDrop, setSuccessfulDrop] = useState(null);
  const [successDropedCard, setSuccessDroppedCard] = useState(0);
  //  const WordexplorerDataAll = useSelector((state) => state.DragDrop.data)

  //  console.log(WordexplorerDataAll.Wordexplore)
  //  console.log(acceptedTypes)
  //  console.log(type)

  const handleSuccesDrag = async (e) => {
    // console.log(e)
    // console.log(isMatched);
    // console.log("drooped ----------------------");
    console.log(type);
    if (acceptedTypes.includes(type) && type === lastDroppedItem?._id) {
      let formData = {
        StoryTitle: StoryTitle,
        Student_ID: userID,
        pathname: endPoints,
        WordExplorerID: acceptedTypes,
      };
      console.log(formData);
      console.log("drooped ---------------------- in the function ---");
      await dispatch(Update_Drag_Drop_Copy(formData));
      setSuccessfulDrop(null);
      setSuccessDroppedCard((prev) => prev + 1);
      setToggleCount((prev) => prev + 1);
      // console.log("succes drop");
    } else {
      // Shake effect if drop is not allowed
      // console.log("succe not ");
      setSuccessfulDrop({ animation: "shake 0.5s" });
      setTimeout(() => {
        setSuccessfulDrop(null);
      }, 500);
    }
  };
  useEffect(()=>{
    if(isMatched){
        setSuccessDroppedCard((prev) => prev + 1);
           setToggleCount((prev) => prev + 1);
    }
  },[toggleCount])

  // useEffect(()=>{
  //   handleSuccesDrag()
  // },[])

  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name, BoxImg },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type]
  );

  console.log(successDropedCard, ".......successcard......");

  console.log(toggleCount, "......toggle   count");
  const boxStyle = {
    ...successfulDrop,
    opacity,
    background: isMatched
      ? "green"
      : isDropped
      ? "green"
      : "linear-gradient(92.77deg, rgba(118, 29, 232, 0.3) -2.94%, rgba(41, 189, 236, 0.3) 56.14%)",
  };
  const bgImg = {
    backgroundImage: `url(https://ik.imagekit.io/xhdikl4j8/${BoxImg})`,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
  };
  const draggableRef = isMatched ? null : isDropped ? null : drag;

  return (
    <div
      ref={draggableRef}
      style={boxStyle}
      data-testid="box"
      className="ansCard"
      onDragEnd={handleSuccesDrag}
      // onDragLeave={(e) => handleSuccesDrag(e)}
    >
      <div className="ansBoxImg">
        <div className="AnsImg" style={bgImg}></div>
        {/* <img src={` https://ik.imagekit.io/dev24/${BoxImg}`} alt="ansImg" className="AnsImg"  /> */}
      </div>
      <div className="ansTextBox">
        <p className="ansText">{name}</p>
      </div>
    </div>
  );
});

// import { memo, useState } from 'react';
// import { useDrag } from 'react-dnd';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { Update_Drag_Drop } from '../../../store/Actions/QuestionAction';

// export const Box = memo(function Box({
//   name,
//   type,
//   isDropped,
//   BoxImg,
//   acceptedTypes,
//   isMatched

// }) {

//   const { id } =  useParams()
//   const dispatch = useDispatch()

//   // console.log(isMatched)

//   const [successfulDrop, setSuccessfulDrop] = useState(null);

//   const handleSuccesDrag = () => {
//     if (acceptedTypes.includes(type)) {
//       let data = {
//         StoryID:id,
//         WordExplorerID:acceptedTypes
//       }
//       console.log(data)

//       dispatch(Update_Drag_Drop(data))
//       setSuccessfulDrop(null);
//      console.log("succes drop")
//     } else {
//       // Shake effect if drop is not allowed
//       console.log("succe not ")
//       setSuccessfulDrop({ animation: 'shake 0.5s' });
//       setTimeout(() => {
//         setSuccessfulDrop(null);
//       }, 500);
//     }
//   };

//   const [{ opacity }, drag] = useDrag(
//     () => ({
//       type,
//       item: { name, BoxImg },
//       collect: (monitor) => ({
//         opacity: monitor.isDragging() ? 0.4 : 1,
//       }),
//     }),
//     [name, type]
//   );

//   const boxStyle = {
//     ...successfulDrop,
//     opacity,
//     background: isMatched? 'green': isDropped ? 'green' : 'linear-gradient(92.77deg, rgba(118, 29, 232, 0.3) -2.94%, rgba(41, 189, 236, 0.3) 56.14%)',
//   };

//   const draggableRef = isMatched? null : isDropped ? null : drag;

//   return (
//     <div
//       ref={draggableRef}
//       style={ boxStyle}
//       data-testid="box"
//       className="ansCard"
//       onDragEnd={handleSuccesDrag}
//     >
//       <div className="ansBoxImg">
//         <img src={` https://ik.imagekit.io/dev24/${BoxImg}`} alt="ansImg" className="AnsImg" />
//       </div>
//       <div className="ansTextBox">
//         <p className="ansText">{name}</p>
//       </div>
//     </div>
//   );
// });
