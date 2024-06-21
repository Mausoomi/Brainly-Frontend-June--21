import React, { useEffect } from 'react';
import Heading from './Heading';
import Tabs from './Tabs';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Get_Copied_Data } from '../store/Actions/storyActions';

function MainStory() {
    const { id } = useParams();
    const location = useLocation();
    const { state } = location;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const userID = user ? user._id : null;





    // useEffect(() => {
    //     if (state) {
    //         const { StoryTitle,  endPoints } = state;
    //         let formData = {
    //           Student_ID: userID,
    //           pathname:endPoints,
    //         };
    //         dispatch(Get_Copied_Data(formData));
    //     }
    // }, [state, userID, dispatch]);



    // useEffect(() => {

    //     let GetData = {
    //         userID: userID,
    //         StoryTitle: StoryTitle,
    //     };
    //     dispatch(Get_Drag_and_Drop_Data(GetData));
    // }, [dispatch]);


    if (!state) {
        return <div>No data available</div>;
    }

    const { Brainquest, Storyadvenure, Wordexplore, StoryTitle, endPoints } =
      state;

    // console.log('Brainquest:', Brainquest);
    console.log("Storyadvenure:", Storyadvenure);
    // console.log('Wordexplore:', Wordexplore);
    // console.log('StoryTitle:', StoryTitle);

    function countWords(str) {
        return str.trim().split(/\s+/).length;
    }

    const inputString = StoryTitle;

    const wordCount = countWords(inputString);
    const blueTextWordCount = Math.ceil(wordCount / 2);
    const wordsArray = inputString.trim().split(/\s+/);
    const blueText = wordsArray.slice(0, blueTextWordCount).join(" ");
    const whiteText = wordsArray.slice(blueTextWordCount).join(" ");

    return (
      <div>
        <div className="storyHd">
          <Heading blueText={blueText} whiteText={whiteText} />
        </div>
        <Tabs
          Brainquest={{
            data: Brainquest,
            endPoints: endPoints,
            StoryTitle: StoryTitle,
          }}
          Storyadvenure={Storyadvenure}
          Wordexplore={{
            data: Wordexplore,
            endPoints: endPoints,
            StoryTitle: StoryTitle,
          }}
        />
      </div>
    );
}

export default MainStory;
