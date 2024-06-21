import React from 'react';
import { useLocation } from 'react-router-dom';
import bgAdventure from "../Assets/Images/adv.png";
import bgFantancy from "../Assets/Images/fan.png";
import bgHisytory from "../Assets/Images/his.png";
import bgmystery from "../Assets/Images/mys.png";
import bgScience from "../Assets/Images/sci1.png";
import bgSports from "../Assets/Images/sport.png";


const Background = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/ScienceFictionStories') {
      document.body.style.backgroundImage = `url(${bgScience})`;
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize= "100% auto";
      // document.body.style.backgroundSize = 'cover';
      // document.body.style.height="50%"
    }
    else if (location.pathname === "/FantasyStories") {
      document.body.style.backgroundImage = `url(${bgFantancy})`;
      document.body.style.backgroundRepeat = 'no-repeat';
      // document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundSize= "100% auto";
    }
    else if (location.pathname === '/AdventureStories') {
      document.body.style.backgroundImage = `url(${bgAdventure})`;
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize= "100% auto";
    }
    else if (location.pathname === '/MysteryStories') {
      document.body.style.backgroundImage = `url(${bgmystery})`;
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize= "100% auto";
    }
    else if (location.pathname === '/HistoryStories') {
      document.body.style.backgroundImage = `url(${bgHisytory})`;
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize= "100% auto";
    }
    else if (location.pathname === '/SportsStories') {
      document.body.style.backgroundImage = `url(${bgSports})`;
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize= "100% auto";
    }
    else if (location.pathname === '/SignUpPage') {
      
      document.body.style.padding='0rem'
    }
    else {
      // document.body.style.background = '#03051B';
      // document.body.style.padding='1rem'

    }

    return () => {
      document.body.style.background = '';
      document.body.style.backgroundImage = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundSize = '';

    };
  }, [location]);

  return null;
};

export default Background;
