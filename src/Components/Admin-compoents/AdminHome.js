// import React, { useEffect } from "react";
// import fantasylogo from "../../image/fantasy.png";
// import Adventurelogo from "../../image/Adventure.png";
// import Mysterylogo from "../../image/Mystery.png";
// import Sciencelogo from "../../image/ScienceFiction.png";
// import Historicallogo from "../../image/historicalfiction.png";
// import Sportslogo from "../../image/Sports.png";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllAdventure,
//   fetchAllFantary,
//   fetchAllHistory,
//   fetchAllSport,
//   fetchAllmystery,
//   fetchAllscience,
// } from "../../store/Actions/storyActions";

// const   AdminHome = () => {
//   const dispatch = useDispatch();
//   const Fantasy = useSelector((state) => state.Story.AllFantary);
//   const Adventure = useSelector((state) => state.Story.AllAdventure);
//   const mystery = useSelector((state) => state.Story.Allmystery);
//   const science = useSelector((state) => state.Story.Allscience);
//   const History = useSelector((state) => state.Story.AllHistory);
//   const Sport = useSelector((state) => state.Story.AllSport);

//   // console.log(Sport.length);
//   useEffect(() => {
//     dispatch(fetchAllFantary());
//     dispatch(fetchAllAdventure());
//     dispatch(fetchAllmystery());
//     dispatch(fetchAllscience());
//     dispatch(fetchAllHistory());
//     dispatch(fetchAllSport());
//   }, []);

//   return (
//     <div className="w-100 h-100 rounded-start-5 overflowdiv p-3">
//       <div className="w-100 p-2 d-flex">
//         <div className="card d-flex justify-content-center align-items-center">
//           <img width={130} src={fantasylogo} alt={fantasylogo} />
//           <h4>Total Fantasy</h4>
//           <h6
//             style={{ color: "#0C2E56", fontWeight: "900", fontSize: "20px" }}
//             className="mt-3"
//           >
//             {Fantasy.length}
//           </h6>
//         </div>
//         <div className="card d-flex justify-content-center align-items-center">
//           <img width={130} src={Adventurelogo} alt={Adventurelogo} />
//           <h4>Total Adventure</h4>
//           <h6
//             style={{ color: "#0C2E56", fontWeight: "900", fontSize: "20px" }}
//             className="mt-3"
//           >
//             {Adventure.length}
//           </h6>
//         </div>
//         <div className="card d-flex justify-content-center align-items-center">
//           <img width={130} src={Mysterylogo} alt={Mysterylogo} />
//           <h4>Total Mystery</h4>
//           <h6
//             style={{ color: "#0C2E56", fontWeight: "900", fontSize: "20px" }}
//             className="mt-3"
//           >
//             {mystery.length}
//           </h6>
//         </div>
//         <div className="card d-flex justify-content-center align-items-center">
//           <img width={130} src={Sciencelogo} alt={Sciencelogo} />
//           <h4>Total Science</h4>
//           <h6
//             style={{ color: "#0C2E56", fontWeight: "900", fontSize: "20px" }}
//             className="mt-3"
//           >
//             {science.length}
//           </h6>
//         </div>
//         <div className="card d-flex justify-content-center align-items-center">
//           <img width={130} src={Historicallogo} alt={Historicallogo} />
//           <h4>Total Historical</h4>
//           <h6
//             style={{ color: "#0C2E56", fontWeight: "900", fontSize: "20px" }}
//             className="mt-3"
//           >
//             {History.length}
//           </h6>
//         </div>
//         <div className="card d-flex justify-content-center align-items-center">
//           <img width={130} src={Sportslogo} alt={Sportslogo} />
//           <h4>Total Sports</h4>
//           <h6
//             style={{ color: "#0C2E56", fontWeight: "900", fontSize: "20px" }}
//             className="mt-3"
//           >
//             {Sport.length}
//           </h6>
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default AdminHome;


import React, { useEffect } from "react";
import fantasylogo from "../../image/fantasy.png";
import Adventurelogo from "../../image/Adventure.png";
import Mysterylogo from "../../image/Mystery.png";
import Sciencelogo from "../../image/ScienceFiction.png";
import Historicallogo from "../../image/historicalfiction.png";
import Sportslogo from "../../image/Sports.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAdventure,
  fetchAllFantary,
  fetchAllHistory,
  fetchAllSport,
  fetchAllmystery,
  fetchAllscience,
} from "../../store/Actions/storyActions";

const AdminHome = () => {
  const dispatch = useDispatch();
  const Fantasy = useSelector((state) => state.Story.AllFantary);
  const Adventure = useSelector((state) => state.Story.AllAdventure);
  const mystery = useSelector((state) => state.Story.Allmystery);
  const science = useSelector((state) => state.Story.Allscience);
  const History = useSelector((state) => state.Story.AllHistory);
  const Sport = useSelector((state) => state.Story.AllSport);

  useEffect(() => {
    dispatch(fetchAllFantary());
    dispatch(fetchAllAdventure());
    dispatch(fetchAllmystery());
    dispatch(fetchAllscience());
    dispatch(fetchAllHistory());
    dispatch(fetchAllSport());
  }, []);

  return (
    <div className="w-full h-full rounded-start-5 overflow-y-auto p-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="card flex flex-col items-center justify-center">
          <img className="w-32" src={fantasylogo} alt="Fantasy" />
          <h4 className="text-center">Total Fantasy</h4>
          <h6 className="mt-3 text-blue-900 font-semibold text-xl">
            {Fantasy.length}
          </h6>
        </div>
        <div className="card flex flex-col items-center justify-center">
          <img className="w-32" src={Adventurelogo} alt="Adventure" />
          <h4 className="text-center">Total Adventure</h4>
          <h6 className="mt-3 text-blue-900 font-semibold text-xl">
            {Adventure.length}
          </h6>
        </div>
        <div className="card flex flex-col items-center justify-center">
          <img className="w-32" src={Mysterylogo} alt="Mystery" />
          <h4 className="text-center">Total Mystery</h4>
          <h6 className="mt-3 text-blue-900 font-semibold text-xl">
            {mystery.length}
          </h6>
        </div>
        <div className="card flex flex-col items-center justify-center">
          <img className="w-32" src={Sciencelogo} alt="Science" />
          <h4 className="text-center">Total Science</h4>
          <h6 className="mt-3 text-blue-900 font-semibold text-xl">
            {science.length}
          </h6>
        </div>
        <div className="card flex flex-col items-center justify-center">
          <img className="w-32" src={Historicallogo} alt="Historical" />
          <h4 className="text-center">Total Historical</h4>
          <h6 className="mt-3 text-blue-900 font-semibold text-xl">
            {History.length}
          </h6>
        </div>
        <div className="card flex flex-col items-center justify-center">
          <img className="w-32" src={Sportslogo} alt="Sports" />
          <h4 className="text-center">Total Sports</h4>
          <h6 className="mt-3 text-blue-900 font-semibold text-xl">
            {Sport.length}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

