
import React, { useState } from 'react';
import Completed from "../../Assets/Images/completed.png";
import New from "../../Assets/Images/new.png";
import Progress from "../../Assets/Images/progress.png";
import AllScienceStories from './AllScienceStories';

function StoriesTabs() {
  
    const [activeTab, setActiveTab] = useState("");
    const [filteredBtnText, setFilteredBtnText] = useState(""); 

    const handleTabClick = (index, btnText) => {
        setActiveTab(index);
        setFilteredBtnText(btnText);
    };

    return (
        <div className="flex flex-wrap justify-center content-start items-center font-semibold tracking-normal leading-5 text-white  tabsBg">
            <div className=" flex gap-4 sm:py-12 py-4 tabs-container">
             <div className=' flex gap-4 innerTabBox'>

             
                <div className={`flex flex-1 gap-2 justify-center items-center  scienceTabs ${activeTab === 0 ?'bg-[#145AAD]' :'bg-[#1C84FF]'} rounded-[1000px] max-md:px-5`} onClick={() => handleTabClick(0,'New')}>
                    <div className='tabimg'>
                        <img
                            alt='tabImg'
                            loading="lazy"
                            src={New}
                            // className="shrink-0 rounded-full aspect-square "
                        />
                    </div>
                    <div className="flex-auto my-auto">New</div>
                </div>

                <div className={`flex flex-1 gap-2 justify-center items-center  scienceTabs ${activeTab === 1 ? 'bg-[#B28616]' :'bg-[#FFBF1A]'} rounded-[1000px] max-md:px-5`} onClick={() => handleTabClick(1 ,"In Progress")}>
                    <div className='tabimg'>
                        <img
                            alt='tabImg'
                            loading="lazy"
                            src={Progress}
                            className="shrink-0 rounded-full aspect-square "
                        />
                    </div>
                    <div className="flex-auto my-auto">In Progress</div>
                </div>

                <div className={`flex flex-1 gap-2 justify-center items-center scienceTabs ${activeTab === 2 ? 'bg-[#10AF3C]' :'bg-[#1AFF5A]'} rounded-[1000px] max-md:px-5`} onClick={() => handleTabClick(2, "Completed")}>
                    <div className='tabimg'>
                        <img
                            alt='tabImg'
                            loading="lazy"
                            src={Completed}
                            className="shrink-0 rounded-full aspect-square "
                        />
                    </div>

                    <div className="flex-auto my-auto">Completed</div>
                </div>
                <div className={`flex flex-1 gap-2 justify-center items-center scienceTabs ${activeTab === 3 ? 'bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_50.14%)]' :'border-violet-700 border-solid bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)]'} : 'bg-white bg-opacity-10'} rounded-[1000px] max-md:px-5`} onClick={() => handleTabClick(3,"")}>
                  <div className="flex-auto my-auto">Clear All</div>
                </div>
                </div>
            </div>
            <div style={{ width: "100%" }} className='mt-4 sm:mt-32 storiesTabs'>
           {activeTab === "" && <AllScienceStories />}
           {/* {activeTab === "Clear All" && <AllScienceStories />} */}
                {activeTab !== "" && <AllScienceStories filteredBtnText={filteredBtnText} />} 
            </div>
        </div>
    );
}

export default StoriesTabs


