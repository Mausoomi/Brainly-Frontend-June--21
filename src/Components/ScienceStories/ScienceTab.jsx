import React, { useState } from "react";
import Completed from "../../Assets/Images/completed.png";
import New from "../../Assets/Images/new.png";
import Progress from "../../Assets/Images/progress.png";
import AllScienceStories from "./AllScienceStories";

function ScienceTab() {
  //    console.log(storiesData)
  const [activeTab, setActiveTab] = useState("");
  const [filteredBtnText, setFilteredBtnText] = useState("");
  const [ShowOptions, setShowOptions] = useState(false);
  const [filterName , setFilterName] = useState("New")
  const [NoDataMessage, setnoDataMessage] = useState("");

  const handleTabClick = (index, btnText) => {
    setActiveTab(index);
    setFilteredBtnText(btnText);
    setShowOptions(false);
    setFilterName(btnText)
    if(index === 3){
      setFilterName("Clear All");
       setnoDataMessage(
         "No new stories at the moment. Please check back later. Thank you."
       );
    }
    if(btnText==='New'){
      setnoDataMessage(
        "No new stories at the moment. Please check back later. Thank you."
      );
    }
     if (btnText === "In Progress") {
       setnoDataMessage("No stories in progress at the moment. Thank you!");
     }
      if (btnText === "Completed") {
        setnoDataMessage(
          "No stories with the status Completed at the moment. Thank you!"
        );
      }
  };

  const handleFilter = () => {
    setShowOptions(!ShowOptions);
  };

  return (
    // <div className="flex flex-wrap justify-center content-start items-center font-semibold tracking-normal leading-5 text-white  tabsBg">
    <div className="flex flex-wrap justify-center content-start items-center font-semibold tracking-normal leading-5 text-white  tabsBg">
      <div className="FilterBox">
        <div class="relative inline-block text-left">
          <div>
            <button
              type="button"
              onClick={() => handleFilter()}
              className="  flex-1 gap-2 items-center rounded-[1000px] scienceTabsbtns border-violet-700 bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)] "
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              {filterName}
              <svg
                class="-mr-1 h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            class={`${
              ShowOptions ? "flex" : "hidden"
            } absolute right-0 z-10 mt-2 py-4 origin-top-right rounded-[36px] bg-[#17141E] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none gap-2`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div class="py-1" role="none">
              <a>
                <div
                  className={`flex flex-1 gap-2 p-4 justify-center items-center cursor-pointer  scienceTabsbtns ${
                    activeTab === 0 ? "bg-[#1C84FF]" : ""
                  } rounded-[1000px] max-md:px-5`}
                  onClick={() => handleTabClick(0, "New")}
                >
                  <div className="tabimg">
                    <img
                      alt="tabImg"
                      loading="lazy"
                      src={New}
                      // className="shrink-0 rounded-full aspect-square "
                    />
                  </div>
                  <div className="flex-auto my-auto">New</div>
                </div>
              </a>
              <a>
                <div
                  className={`flex flex-1 gap-2 justify-center items-center cursor-pointer p-4 scienceTabsbtns ${
                    activeTab === 1 ? "bg-[#FFBF1A]" : ""
                  } rounded-[1000px] max-md:px-5`}
                  onClick={() => handleTabClick(1, "In Progress")}
                >
                  <div className="tabimg">
                    <img
                      alt="tabImg"
                      loading="lazy"
                      src={Progress}
                      className="shrink-0 rounded-full aspect-square "
                    />
                  </div>
                  <div className="flex-auto my-auto">In Progress</div>
                </div>
              </a>
              <a>
                <div
                  className={`flex flex-1 gap-2 justify-center items-center cursor-pointer p-4 scienceTabsbtns ${
                    activeTab === 2 ? "bg-[#1AFF5A]" : ""
                  } rounded-[1000px] max-md:px-5`}
                  onClick={() => handleTabClick(2, "Completed")}
                >
                  <div className="tabimg">
                    <img
                      alt="tabImg"
                      loading="lazy"
                      src={Completed}
                      className="shrink-0 rounded-full aspect-square "
                    />
                  </div>

                  <div className="flex-auto my-auto">Completed</div>
                </div>
              </a>
              <a>
                <div
                  className={`flex flex-1 gap-2 justify-center items-center text-center p-4 cursor-pointer scienceTabsbtns ${
                    activeTab === 3
                      ? "border-violet-700 border-solid bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)]"
                      : ""
                  } : 'bg-white bg-opacity-10'} rounded-[1000px] max-md:px-5`}
                  onClick={() => handleTabClick(3, "")}
                >
                  <div className="flex-auto my-auto">Clear All</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <div className=" flex gap-4  tabs-container">
        <div className=" flex gap-4 innerTabBox">
          <div
            className={`flex flex-1 gap-2 justify-center items-center  scienceTabs ${
              activeTab === 0 ? "bg-[#145AAD]" : "bg-[#1C84FF]"
            } rounded-[1000px] max-md:px-5`}
            onClick={() => handleTabClick(0, "New")}
          >
            <div className="tabimg">
              <img
                alt="tabImg"
                loading="lazy"
                src={New}
                // className="shrink-0 rounded-full aspect-square "
              />
            </div>
            <div className="flex-auto my-auto">New</div>
          </div>

          <div
            className={`flex flex-1 gap-2 justify-center items-center  scienceTabs ${
              activeTab === 1 ? "bg-[#B28616]" : "bg-[#FFBF1A]"
            } rounded-[1000px] max-md:px-5`}
            onClick={() => handleTabClick(1, "In Progress")}
          >
            <div className="tabimg">
              <img
                alt="tabImg"
                loading="lazy"
                src={Progress}
                className="shrink-0 rounded-full aspect-square "
              />
            </div>
            <div className="flex-auto my-auto">In Progress</div>
          </div>

          <div
            className={`flex flex-1 gap-2 justify-center items-center scienceTabs ${
              activeTab === 2 ? "bg-[#10AF3C]" : "bg-[#1AFF5A]"
            } rounded-[1000px] max-md:px-5`}
            onClick={() => handleTabClick(2, "Completed")}
          >
            <div className="tabimg">
              <img
                alt="tabImg"
                loading="lazy"
                src={Completed}
                className="shrink-0 rounded-full aspect-square "
              />
            </div>

            <div className="flex-auto my-auto">Completed</div>
          </div>
          <div
            className={`flex flex-1 gap-2 justify-center items-center scienceTabs ${
              activeTab === 3
                ? "bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_200.14%)]"
                : "border-violet-700 border-solid bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)]"
            } : 'bg-white bg-opacity-10'} rounded-[1000px] max-md:px-5`}
            onClick={() => handleTabClick(3, "")}
          >
            <div className="flex-auto my-auto">Clear All</div>
          </div>
        </div>
      </div> */}
      <div style={{ width: "100%" }} className="storiesTabs">
        {activeTab === "" && (
          <AllScienceStories
            filteredBtnText="New"
            NoDataMessage="No new stories at the moment. Please check back later. Thank you."
          />
        )}
        {/* {activeTab === "Clear All" && <AllScienceStories />} */}
        {activeTab !== "" && (
          <AllScienceStories
            filteredBtnText={filteredBtnText}
            NoDataMessage={NoDataMessage}
          />
        )}
      </div>
    </div>
  );
}

export default ScienceTab;

// import React, { useState } from 'react';
// import Completed from "../../Assets/Images/completed.png";
// import New from "../../Assets/Images/new.png";
// import Progress from "../../Assets/Images/progress.png";
// import AllScienceStories from './AllScienceStories';

// function ScienceTab() {

//     const [activeTab, setActiveTab] = useState("");
//     const [filteredBtnText, setFilteredBtnText] = useState("");

//     const handleTabClick = (index, btnText) => {
//         setActiveTab(index);
//         setFilteredBtnText(btnText);
//     };

//     return (
//         <div className="flex flex-wrap justify-center content-start items-center font-semibold tracking-normal leading-5 text-white  tabsBg">
//             <div className=" flex gap-4  tabs-container">
//              <div className=' flex gap-4 innerTabBox'>

//                 <div className={`flex flex-1 gap-2 justify-center items-center  scienceTabs ${activeTab === 0 ? 'border-violet-700 border-solid bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)]' : 'bg-white bg-opacity-10'} rounded-[1000px] max-md:px-5`} onClick={() => handleTabClick(0,'New')}>
//                     <div className='tabimg'>
//                         <img
//                             alt='tabImg'
//                             loading="lazy"
//                             src={New}
//                             // className="shrink-0 rounded-full aspect-square "
//                         />
//                     </div>
//                     <div className="flex-auto my-auto">New</div>
//                 </div>

//                 <div className={`flex flex-1 gap-2 justify-center items-center  scienceTabs ${activeTab === 1 ? 'border-violet-700 border-solid bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)]' : 'bg-white bg-opacity-10'} rounded-[1000px] max-md:px-5`} onClick={() => handleTabClick(1 ,"In Progress")}>
//                     <div className='tabimg'>
//                         <img
//                             alt='tabImg'
//                             loading="lazy"
//                             src={Progress}
//                             className="shrink-0 rounded-full aspect-square "
//                         />
//                     </div>
//                     <div className="flex-auto my-auto">In Progress</div>
//                 </div>

//                 <div className={`flex flex-1 gap-2 justify-center items-center scienceTabs ${activeTab === 2 ? 'border-violet-700 border-solid bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)]' : 'bg-white bg-opacity-10'} rounded-[1000px] max-md:px-5`} onClick={() => handleTabClick(2, "Completed")}>
//                     <div className='tabimg'>
//                         <img
//                             alt='tabImg'
//                             loading="lazy"
//                             src={Completed}
//                             className="shrink-0 rounded-full aspect-square "
//                         />
//                     </div>

//                     <div className="flex-auto my-auto">Completed</div>
//                 </div>
//                 <div className={`flex flex-1 gap-2 justify-center items-center scienceTabs ${activeTab === 3 ? 'border-violet-700 border-solid bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)]' : 'bg-white bg-opacity-10'} rounded-[1000px] max-md:px-5`} onClick={() => handleTabClick(3,"")}>
//                   <div className="flex-auto my-auto">Clear All</div>
//                 </div>
//                 </div>
//             </div>
//             <div style={{ marginTop: "3rem", width: "100%" }}>
//            {activeTab === "" && <AllScienceStories />}
//            {/* {activeTab === "Clear All" && <AllScienceStories />} */}
//                 {activeTab !== "" && <AllScienceStories filteredBtnText={filteredBtnText} />}
//             </div>
//         </div>
//     );
// }

// export default ScienceTab
