import React, { useEffect } from 'react'
import DragNDrop from '../Components/WordExplorer/DragNDrop'
import { useDispatch, useSelector } from 'react-redux';
// import { Get_Drag_and_Drop_Data } from '../store/Slice/DragDropSlice';


function WordExplorer({ Wordexplore }) {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const userID = user ? user._id : null;
  // console.log(WordexploreStoryTitle)
  // useEffect(() => {

  //     let Data = {
  //       userID: userID,
  //       StoryTitle: WordexploreStoryTitle,
  //     };
  //     dispatch(Get_Drag_and_Drop_Data(Data));
  // }, [dispatch]);

  // const WordexplorerDataAll = useSelector((state) => state.DragDrop.data)
  // const worderDataLoading = useSelector((state) => state.DragDrop.loading)
  // const wordeDataerror = useSelector((state) => state.DragDrop.error)

  // console.log(WordexplorerDataAll)
  // const WordExplorerData = WordexplorerDataAll?.Wordexplore

  // console.log(WordExplorerData, "perstudent")

  // if (worderDataLoading) {
  //     return <div>Loading...</div>;
  // }

  // If data fetching resulted in an error, render error message
  //   if (wordeDataerror) {
  //     return <div>Error: {wordeDataerror}</div>;

  //   }

  // if (!WordExplorerData || WordExplorerData.length === 0) {
  //     return <div className='text-white font-bold' > No questions available</div>;
  // }

  return (
    <div className="flex flex-wrap justify-center content-start items-center ">
      <div style={{ width: "100%" }}>
        <DragNDrop Wordexplore={Wordexplore} />
        {/* <DragNDrop/> */}
      </div>
    </div>
  );
}

export default WordExplorer