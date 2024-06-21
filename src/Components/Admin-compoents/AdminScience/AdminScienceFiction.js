import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllscience } from "../../../store/Actions/storyActions";
import { DeleteScienceFiction } from "../../../store/Actions/adminActions";

const AdminScienceFiction = () => {
  const fantasies = useSelector((state) => state.Story.Allscience);
  // console.log(fantasies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllscience());
  }, [dispatch]);

  const DeleteHandler = (id) => {
    dispatch(DeleteScienceFiction(id));
  };

  return (
    // <div className="w-100 rounded-start-5 overflowdiv">
    //   <div className="d-flex justify-content-between align-items-center p-3">
    //     <h6 className="text-dark">ScienceFiction Table</h6>
    //     <Link
    //       to="/Admin/Admin-ScienceFiction/Admin-ADDScienceFiction"
    //       className="btn btn-outline-success"
    //     >
    //       Add ScienceFiction
    //     </Link>
    //   </div>
    //   <div className="Meeting_list_style d-flex flex-wrap flex-row p-2">
    //     <table className="table table-hover table-responsive table-borderless">
    //       <thead>
    //         <tr>
    //           <th>Title</th>
    //           <th>Wordexplore Storytitle</th>
    //           <th>Wordexplore Storyitext</th>
    //           <th>Wordexplore Storyttext</th>
    //           <th>Status</th>
    //           <th>Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {fantasies.map((fantasy, index) => (
    //           <tr key={index}>
    //             <td>{fantasy.Title}</td>
    //             <td>
    //               {fantasy.Wordexplore.map((word, wordindex) => (
    //                 <span>
    //                   {`${word.Storytitle},`}
    //                   <br />
    //                 </span>
    //               ))}
    //             </td>
    //             <td>
    //               {fantasy.Wordexplore.map((word, wordindex) => (
    //                 <span>
    //                   {`${word.Storyitext},`}
    //                   <br />
    //                 </span>
    //               ))}
    //             </td>
    //             <td>
    //               {fantasy.Wordexplore.map((word, wordindex) => (
    //                 <span>
    //                   {`${word.Storyttext},`}
    //                   <br />
    //                 </span>
    //               ))}
    //             </td>
    //             <td>{fantasy.Status}</td>
    //             <td>
    //               <Link
    //                 to={`/Admin/Admin-ScienceFiction/Admin-EDITScienceFiction/${fantasy._id}`}
    //                 className="btn btn-primary"
    //               >
    //                 Edit
    //               </Link>
    //               <Link
    //                 onClick={() => DeleteHandler(fantasy._id)}
    //                 className="btn btn-outline-danger"
    //               >
    //                 Delete
    //               </Link>
    //               {/* You can add other action buttons as needed */}
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <div className="w-full rounded-start-5 overflow-y-auto">
      <div className="flex justify-between items-center p-3">
        <h6 className="text-dark">ScienceFiction Table</h6>
        <Link
          to="/Admin/Admin-ScienceFiction/Admin-ADDScienceFiction"
          className="bg-green-500 text-white px-4 py-2 rounded outline-none focus:outline-none hover:bg-green-600"
        >
          Add ScienceFiction
        </Link>
      </div>
      <div className="w-full flex flex-wrap flex-row p-2">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Wordexplore Storytitle</th>
              <th className="px-4 py-2">Wordexplore Storyitext</th>
              <th className="px-4 py-2">Wordexplore Storyttext</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fantasies.map((fantasy, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{fantasy.Title}</td>
                <td className="px-4 py-2">
                  {fantasy.Wordexplore.map((word, wordindex) => (
                    <span key={wordindex}>
                      {`${word.Storytitle},`}
                      <br />
                    </span>
                  ))}
                </td>
                <td className="px-4 py-2">
                  {fantasy.Wordexplore.map((word, wordindex) => (
                    <span key={wordindex}>
                      {`${word.Storyitext},`}
                      <br />
                    </span>
                  ))}
                </td>
                <td className="px-4 py-2">
                  {fantasy.Wordexplore.map((word, wordindex) => (
                    <span key={wordindex}>
                      {`${word.Storyttext},`}
                      <br />
                    </span>
                  ))}
                </td>
                <td className="px-4 py-2">{fantasy.Status}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/Admin/Admin-ScienceFiction/Admin-EDITScienceFiction/${fantasy._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded outline-none focus:outline-none hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => DeleteHandler(fantasy._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded outline-none focus:outline-none hover:bg-red-600"
                  >
                    Delete
                  </button>
                  {/* You can add other action buttons as needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminScienceFiction;
