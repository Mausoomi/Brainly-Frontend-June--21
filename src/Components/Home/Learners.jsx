import * as React from "react";
// import leftArrow from "../../Assets/Images/Rectangle 13 (1).png";
// import rightArrow from "../../Assets/Images/Rectangle 13.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import map from "../../Assets/Images/map.png";
import Heading from "../Heading";



function Learners() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    {
      testimonial:"Reading stories on Brainy Lingo has introduced me to so many new genres and words. It's fun to learn how different words fit into different contexts, and it's helped me with my creative writing too!",
      name: "Mason",
      age: "11 years old",
    },
    {
      testimonial:
        "Before Brainy Lingo, I thought studying vocabulary was boring. But now, I can't wait to learn new words every day! The stories are so cool, and I love seeing my name go up on the leaderboard.",
        name: "Jamie",
      age: "10 years old",
    },
    {
      testimonial:"I used to get confused with harder words, but the games on Brainy Lingo made it easy to remember their meanings and how to use them. My scores have improved a lot, and I feel ready for my exam!",
      name: "Ava",
      age: "9 years old",
    },
    {
      testimonial:"The drag-and-drop exercises are my favorite! They're like playing a puzzle game, but I'm learning at the same time. Thanks to Brainy Lingo, my vocabulary has grown massively, and so has my confidence.",
      name: "Ethan",
      age: "11 years old",
    },
    {
      testimonial:
        "I always struggled with revision, especially remembering which words I got wrong before. The spaced repetition on Brainy Lingo is amazing—it reminds me just when I need to review, and now I hardly ever forget a word!",
        name: "Sophia",
      age: "10 years old",
    },
 ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative">
      <div className="flex overflow-hidden justify-center items-center   text-center text-white sm:min-h-[830px] min-h-[730px] max-md:px-5">
        <div className="relative flex flex-col max-w-full justify-center items-center">

          <Heading blueText="Hear It From " whiteText="Our Learners!" />


          <div className="absolute flex items-center   mt-16  gap-4 md:gap-20">
            <div className="containerBtn">
              <button
                className="  rounded-md bg-rotate"
                onClick={prevSlide}
                aria-label="Previous"
              >
                {/* <img src={leftArrow} alt="Previous" />  */}
                <span className="arrowBtn"><IoIosArrowBack /></span>
              </button>
            </div>

            <div className="flex flex-col items-center px-12 pt-10 pb-5  text-base rounded-xl border border-violet-700 border-solid shadow-2xl bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)] max-md:px-5 max-md:mt-10  learnerBox">
              <div className="self-stretch sm:text-xl text-sm leading-7 text-zinc-300 max-md:max-w-full font-DMSans font-normal text-sm ">
                {slides[currentSlide].testimonial}
              </div>
              <div className="mt-4 font-bold font-DMSans text-xs">{slides[currentSlide].name}</div>
              <div className="mt-3.5 leading-[181%] font-DMSans text-sm">
                {slides[currentSlide].age}
              </div>
            </div>

            <div className="containerBtn">
              <button
                className=" rounded-md bg-rotate"
                onClick={nextSlide}
                aria-label="Next"
              >
                {/* <img src={rightArrow} alt="Next" />  */}
                <span className="arrowBtn"><IoIosArrowForward /></span>
              </button>
            </div>

          </div>


          <div className="mapBg">
            <img src={map} alt="map" />
          </div>
          <div className=" flex justify-center mt-[-34px]">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`mx-1 w-4 h-4 rounded-full ${index === currentSlide ? "bg-white" : "bg-gray-600"
                  }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learners;
