
import React,{useState} from 'react';
import Next from "../../Assets/Images/arrow-down.png";
import pervious from "../../Assets/Images/arrow-up.png";

import StoryCard from './StoryCard';


function StoriesBox({ filteredBtnText }) {


    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredStories = filteredBtnText ? ScienceStryData.filter(ScienceStryData => ScienceStryData.btnText === filteredBtnText) : ScienceStryData;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentStories = filteredStories.slice(startIndex, endIndex);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

console.log(currentStories);
    return (
      <div>
        <div className="cardConatiner">
          {currentStories.map((item, id) => (
            <StoryCard
              key={id}
              storyImg={item.Image[0]}
              text={item.text}
              btnText={item.btnText}
            />
          ))}
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

export default StoriesBox