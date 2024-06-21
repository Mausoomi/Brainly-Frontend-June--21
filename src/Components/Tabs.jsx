import React, { useState } from 'react';
import img2 from "../Assets/Images/Ellipse 13 (1).png";
import img3 from "../Assets/Images/Ellipse 13 (2).png";
import img1 from "../Assets/Images/Ellipse 13.png";
import StoryAdventure from '../Pages/StoryAdventure';
import WordExplorer from '../Pages/WordExplorer';
import BrainQuest from '../Pages/BrainQuest';

function Tabs({Brainquest ,Storyadvenure ,Wordexplore}) {
    const [activeTab, setActiveTab] = useState(0);

    console.log(Storyadvenure,"...../tab story");
    // console.log(Brainquest ,Storyadvenure ,"tab")
    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
      <div className="flex flex-wrap justify-center content-start items-center font-semibold tracking-normal leading-5 text-white  tabsBg">
        <div className=" flex gap-4  tabs-container">
          <div className=" flex gap-4 innerTabBox">
            <div
              className={`flex flex-1 gap-2 justify-center items-center  tabs ${
                activeTab === 0
                  ? "border-violet-700 border-solid bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)]"
                  : "bg-white bg-opacity-10"
              } rounded-[1000px] max-md:px-5`}
              onClick={() => handleTabClick(0)}
            >
              <div className="tabimg">
                <img
                  alt="tabImg"
                  loading="lazy"
                  src={img1}
                  // className="shrink-0 rounded-full aspect-square "
                />
              </div>
              <div className="flex-auto my-auto">Word Explorer</div>
            </div>

            <div
              className={`flex flex-1 gap-2 justify-center items-center  tabs ${
                activeTab === 1
                  ? "border-violet-700 border-solid bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)]"
                  : "bg-white bg-opacity-10"
              } rounded-[1000px] max-md:px-5`}
              onClick={() => handleTabClick(1)}
            >
              <div className="tabimg">
                <img
                  alt="tabImg"
                  loading="lazy"
                  src={img2}
                  className="shrink-0 rounded-full aspect-square "
                />
              </div>
              <div className="flex-auto my-auto">Story Adventure</div>
            </div>

            <div
              className={`flex flex-1 gap-2 justify-center items-center tabs ${
                activeTab === 2
                  ? "border-violet-700 border-solid bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)]"
                  : "bg-white bg-opacity-10"
              } rounded-[1000px] max-md:px-5`}
              onClick={() => handleTabClick(2)}
            >
              <div className="tabimg">
                <img
                  alt="tabImg"
                  loading="lazy"
                  src={img3}
                  className="shrink-0 rounded-full aspect-square "
                />
              </div>

              <div className="flex-auto my-auto">Brain Quest</div>
            </div>
          </div>
        </div>
        <div
          style={{ marginTop: "3rem", width: "100%" }}
          className="sm:px-4 px-0"
        >
          {activeTab === 0 && <WordExplorer Wordexplore={Wordexplore} />}
          {activeTab === 1 && (
            <StoryAdventure
              StoryAdventureData={Storyadvenure}
              Wordexplore={Wordexplore}
            />
          )}
          {activeTab === 2 && (
            <BrainQuest
              questionsData={Brainquest}
              // StoryTitle={WordexploreStoryTitle}
            />
          )}
        </div>
      </div>
    );
}
export default Tabs