import React from "react";

import "../Styles/storyAdventure.css";
import Book from "../Components/Story Adventure/Book";

function StoryAdventure({ StoryAdventureData, Wordexplore }) {
  console.log(Wordexplore);
  console.log(StoryAdventureData ,".............bookdata")

  return (
    <div>
      {/* <div className='storyHd'>
      <Heading blueText={blueText}  whiteText={whiteText} />
      </div>
  
        <Tabs/> */}
      <Book
        StoryAdventureDataBook={StoryAdventureData}
        Wordexplore={Wordexplore}
      />
    </div>
  );
}

export default StoryAdventure;
