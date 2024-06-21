//====old

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Next from "../../Assets/Images/arrow-down.png";
import pervious from "../../Assets/Images/arrow-up.png";
import StoryCard from "./StoryCard";
import {
  AdventurefetchData,
  Create_whole_copy,
  FantasyfetchData,
  HistoryfetchData,
  MysteryfetchData,
  SciencefetchData,
  SportfetchData,
  emptyFakeData,
} from "../../store/Actions/storyActions";
import { emptyLatestData } from "../../store/Slice/DragDropSlice";
import {
  SyncAlluser_Data_AdventureData,
  SyncAlluser_Data_FantasyData,
  SyncAlluser_Data_HistoryData,
  SyncAlluser_Data_MysteryData,
  SyncAlluser_Data_ScienceData,
  SyncAlluser_Data_SportData,
} from "../../store/Actions/Authactions";

function AllScienceStories({ filteredBtnText, NoDataMessage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [endPoints, setEndPoints] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const FakeDataFetched = useSelector((state) => state.Story.FakeData);

  // console.log(FakeDataFetched, "---------------fakedata--------before");

  const dataFetched = useSelector((state) => state.Story.data);
  const [FakeData, setFakeData] = useState([]);
  const [indexOneTitle, setIndexOneTitle] = useState("");

  useEffect(() => {
    // console.log("emptyLatestData");
    dispatch(emptyLatestData());
    dispatch(emptyFakeData());
  }, []);

  // useEffect(() => {
  //   if (
  //     FakeDataFetched?.length > 0 &&
  //     FakeDataFetched !== null &&
  //     FakeDataFetched !== undefined
  //   ) {
  //     console.log(
  //       "------------------- FakeData before FakeDataFetched ----",
  //       FakeData
  //     );
  //     setFakeData(FakeDataFetched);
  //   }
  // }, [FakeDataFetched]);

  useEffect(() => {
    if (
      FakeDataFetched?.length > 0 &&
      FakeDataFetched !== null &&
      FakeDataFetched !== undefined
    ) {
      // console.log(
      //   "------------------- FakeData before FakeDataFetched ----",
      //   FakeData
      // );
      setFakeData(FakeDataFetched);
   
    }
  }, [FakeDataFetched]);

  useEffect(() => {
    let validate = true;
    const fetchData = () => {
      switch (location.pathname) {
        case "/ScienceFictionStories":
          setEndPoints("/ScienceFictionStories");
          dispatch(SciencefetchData());
          dispatch(SyncAlluser_Data_ScienceData());
          break;
        case "/FantasyStories":
          setEndPoints("/FantasyStories");
          dispatch(FantasyfetchData());
          dispatch(SyncAlluser_Data_FantasyData());
          break;
        case "/MysteryStories":
          setEndPoints("/MysteryStories");
          dispatch(MysteryfetchData());
          dispatch(SyncAlluser_Data_MysteryData());
          break;
        case "/HistoryStories":
          setEndPoints("/HistoryStories");
          dispatch(HistoryfetchData());
          dispatch(SyncAlluser_Data_HistoryData());
          break;
        case "/AdventureStories":
          setEndPoints("/AdventureStories");
          dispatch(AdventurefetchData());
          dispatch(SyncAlluser_Data_AdventureData());
          break;
        case "/SportsStories":
          setEndPoints("/SportsStories");
          dispatch(SportfetchData());
          dispatch(SyncAlluser_Data_SportData());
          break;
        default:
          break;
      }
    };

    fetchData();

    return () => {
      validate = false;
    };
  }, [dispatch, location]);

  useEffect(() => {
    // console.log("---------------- FakeData ---", FakeData);
    if (FakeData?.length > 0) {
      const CopyData = {
        Student_ID: user._id,
        Data: FakeData,
        pathname: location.pathname,
      };

      dispatch(Create_whole_copy(CopyData));
      setFakeData([]);
    }
  }, [FakeData, dispatch]);

  const loading = useSelector((state) => state.Story.loading);
  const error = useSelector((state) => state.Story.error);

  useEffect(() => {
    setIndexOneTitle(dataFetched[0]?.Title);
  }, [dataFetched]);  



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }




  console.log(indexOneTitle, ".....................indexTitle");

  const itemsPerPage = 8;
  const filteredStories = dataFetched
    ? filteredBtnText
      ? dataFetched.filter(
          (dataFetched) => dataFetched.Status === filteredBtnText
        )
      : dataFetched
    : [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStories = filteredStories.slice(startIndex, endIndex);
  // console.log(currentStories[0].Title, "............................index0");
  console.log(dataFetched[0], "............beforfilter");

  console.log(filteredBtnText);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleStoryCardClick = (
    id,
    Brainquest,
    Storyadvenure,
    Wordexplore,
    endPoints,
    StoryTitle
  ) => {
    navigate(`/mainStory/${id}`, {
      state: { Brainquest, Storyadvenure, Wordexplore, endPoints, StoryTitle },
    });
  };
  console.log(user.Active_Plan);

  return (
    <div>
      <div className="cardConatiner">
        {currentStories && currentStories?.length > 0 ? (
          currentStories?.map((item, index) => (
            <StoryCard
              key={index}
              storyImg={item.Image[0]}
              text={item.Title}
              btnText={item.Status}
              id={item._id}
              onStoryTextClick={handleStoryCardClick}
              Brainquest={item.Brainquest}
              Storyadvenure={item.Storyadvenure}
              Wordexplore={item.Wordexplore}
              endPoints={endPoints}
              StoryTitle={item.Title}
              index={index}
              firstIndexTitle={indexOneTitle}
            />
          ))
        ) : (
          <div>
            <p className=" font-Poetsen nodataMsg">{NoDataMessage}</p>
          </div>
        )}
      </div>

      {filteredBtnText === "Clear All" ? (
        ""
      ) : (
        <div className="p-4 button-container">
          {currentPage > 1 && (
            <button className="previous-button" onClick={handlePreviousPage}>
              <span>
                <img src={pervious} alt="Previous" />
              </span>
              Previous
            </button>
          )}
          {currentStories.length === itemsPerPage && (
            <button className="next-button" onClick={handleNextPage}>
              Next
              <span>
                <img src={Next} alt="Next" />
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AllScienceStories;

// //====old

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import Next from "../../Assets/Images/arrow-down.png";
// import pervious from "../../Assets/Images/arrow-up.png";
// import StoryCard from "./StoryCard";
// import {
//   AdventurefetchData,
//   Create_whole_copy,
//   FantasyfetchData,
//   HistoryfetchData,
//   MysteryfetchData,
//   SciencefetchData,
//   SportfetchData,
//   emptyFakeData,
// } from "../../store/Actions/storyActions";
// import { emptyLatestData } from "../../store/Slice/DragDropSlice";
// import {
//   SyncAlluser_Data_AdventureData,
//   SyncAlluser_Data_FantasyData,
//   SyncAlluser_Data_HistoryData,
//   SyncAlluser_Data_MysteryData,
//   SyncAlluser_Data_ScienceData,
//   SyncAlluser_Data_SportData,
// } from "../../store/Actions/Authactions";

// function AllScienceStories({ filteredBtnText, NoDataMessage }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [endPoints, setEndPoints] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = useSelector((state) => state.auth.user);
//   const FakeDataFetched = useSelector((state) => state.Story.FakeData);

//   console.log(FakeDataFetched, "---------------fakedata--------before");

//   const dataFetched = useSelector((state) => state.Story.data);
//   const [FakeData, setFakeData] = useState([]);

//   useEffect(() => {
//     console.log("emptyLatestData");
//     dispatch(emptyLatestData());
//     dispatch(emptyFakeData());
//   }, []);

//   // useEffect(() => {
//   //   if (
//   //     FakeDataFetched?.length > 0 &&
//   //     FakeDataFetched !== null &&
//   //     FakeDataFetched !== undefined
//   //   ) {
//   //     console.log(
//   //       "------------------- FakeData before FakeDataFetched ----",
//   //       FakeData
//   //     );
//   //     setFakeData(FakeDataFetched);
//   //   }
//   // }, [FakeDataFetched]);

//   useEffect(() => {
//     if (
//       FakeDataFetched?.length > 0 &&
//       FakeDataFetched !== null &&
//       FakeDataFetched !== undefined
//     ) {
//       console.log(
//         "------------------- FakeData before FakeDataFetched ----",
//         FakeData
//       );
//       setFakeData(FakeDataFetched);
//     }
//   }, [FakeDataFetched]);

//   useEffect(() => {
//     let validate = true;
//     const fetchData = () => {
//       switch (location.pathname) {
//         case "/ScienceFictionStories":
//           setEndPoints("/ScienceFictionStories");
//           dispatch(SciencefetchData());
//           dispatch(SyncAlluser_Data_ScienceData());
//           break;
//         case "/FantasyStories":
//           setEndPoints("/FantasyStories");
//           dispatch(FantasyfetchData());
//           dispatch(SyncAlluser_Data_FantasyData());
//           break;
//         case "/MysteryStories":
//           setEndPoints("/MysteryStories");
//           dispatch(MysteryfetchData());
//           dispatch(SyncAlluser_Data_MysteryData());
//           break;
//         case "/HistoryStories":
//           setEndPoints("/HistoryStories");
//           dispatch(HistoryfetchData());
//           dispatch(SyncAlluser_Data_HistoryData());
//           break;
//         case "/AdventureStories":
//           setEndPoints("/AdventureStories");
//           dispatch(AdventurefetchData());
//           dispatch(SyncAlluser_Data_AdventureData());
//           break;
//         case "/SportsStories":
//           setEndPoints("/SportsStories");
//           dispatch(SportfetchData());
//           dispatch(SyncAlluser_Data_SportData());
//           break;
//         default:
//           break;
//       }
//     };

//     fetchData();

//     return () => {
//       validate = false;
//     };
//   }, [dispatch, location]);

//   useEffect(() => {
//     console.log("---------------- FakeData ---", FakeData);
//     if (FakeData?.length > 0) {
//       const CopyData = {
//         Student_ID: user._id,
//         Data: FakeData,
//         pathname: location.pathname,
//       };

//       dispatch(Create_whole_copy(CopyData));
//       setFakeData([]);
//     }
//   }, [FakeData, dispatch]);

//   const loading = useSelector((state) => state.Story.loading);
//   const error = useSelector((state) => state.Story.error);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const itemsPerPage = 8;
//   const filteredStories = dataFetched
//     ? filteredBtnText
//       ? dataFetched.filter(
//           (dataFetched) => dataFetched.Status === filteredBtnText
//         )
//       : dataFetched
//     : [];

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentStories = filteredStories.slice(startIndex, endIndex);

//   console.log(filteredBtnText);

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   };

//   const handleStoryCardClick = (
//     id,
//     Brainquest,
//     Storyadvenure,
//     Wordexplore,
//     endPoints,
//     StoryTitle
//   ) => {
//     navigate(`/mainStory/${id}`, {
//       state: { Brainquest, Storyadvenure, Wordexplore, endPoints, StoryTitle },
//     });
//   };
//  console.log(user.Active_Plan);

//   return (
//     <div>
//       <div className="cardConatiner">
//         {currentStories && currentStories.length > 0 ? (
//           currentStories.map((item, index) => (
//             <StoryCard
//               key={index}
//               storyImg={item.Image[0]}
//               text={item.Title}
//               btnText={item.Status}
//               id={item._id}
//               onStoryTextClick={handleStoryCardClick}
//               Brainquest={item.Brainquest}
//               Storyadvenure={item.Storyadvenure}
//               Wordexplore={item.Wordexplore}
//               endPoints={endPoints}
//               StoryTitle={item.Title}
//             />
//           ))
//         ) : (
//           <div>
//             <p className=" font-Poetsen nodataMsg">{NoDataMessage}</p>
//           </div>
//         )}
//       </div>

//       {filteredBtnText === "Clear All" ? (
//         ""
//       ) : (
//         <div className="p-4 button-container">
//           {currentPage > 1 && (
//             <button className="previous-button" onClick={handlePreviousPage}>
//               <span>
//                 <img src={pervious} alt="Previous" />
//               </span>
//               Previous
//             </button>
//           )}
//           {currentStories.length === itemsPerPage && (
//             <button className="next-button" onClick={handleNextPage}>
//               Next
//               <span>
//                 <img src={Next} alt="Next" />
//               </span>
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default AllScienceStories;
