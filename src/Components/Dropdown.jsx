import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import arrow3 from "../Assets/Images/arrow3.png";

const Dropdown = ({ setIsMenuOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    const generData = [
        {
            text: "Fantasy",
            link: "/FantasyStories",
            Title: "Fantasy Stories"
        },
        {
            text: "  Adventure",
            link: "/AdventureStories",
            Title: "Fantasy Stories"
        },
        {
            text: "mystery",
            link: "/MysteryStories",

            Title: "Fantasy Stories"
        },
        {
            text: "Science Fiction",
            link: "/ScienceFictionStories",
            Title: "Science Fiction Stories"
        },


        {
            text: "historical fiction",
            link: "/HistoryStories",
            Title: "Fantasy Stories"
        },
        {
            text: "Sports",
            link: "/SportsStories",
            Title: "Fantasy Stories"
        },


    ]


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = () => {
        setIsOpen(false);
        setIsMenuOpen(false)
    };

    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          className="flex items-center gap-2 "
          onClick={toggleDropdown}
        >
          <p className="genreBtn">Genre</p>

          <span>
            <img src={arrow3} alt="arrow" />
          </span>
        </button>

        {isOpen && (
          <div className="origin-top-right absolute z-10 right-0 mt-2 sm:w-56 w-40 rounded-md shadow-lg bg-slate-800  ring-1 ring-black ring-opacity-5 bg-slate-800">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {generData.map((item, id) => (
                <div key={id}>
                  <Link to={item.link}>
                    <div
                      className="block text-sm makeDropSelect "
                      role="menuitem"
                      onClick={handleOptionClick}
                    >
                      <p class="block px-4 py-2 ">{item.text}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
};

export default Dropdown;

