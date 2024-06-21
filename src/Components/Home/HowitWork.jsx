import * as React from "react";
import image2 from "../../Assets/Images/EFFECTIVE.png";
import image1 from "../../Assets/Images/hiw-2.png";
import image3 from "../../Assets/Images/hiw-3.png";
import image4 from "../../Assets/Images/hiw-4.png";
import How from "../../Assets/Images/hiw-1.png";
import "../../Styles/ourkey.css";
import Heading from "../Heading";
import Paragraphs from "../Paragraphs";
import Button from "../Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const HowitWork = ({ scrollToRef }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated)
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setbuyPlan(user?.buyPlan);
  }, [user]);

  const [buyPlan, setbuyPlan] = useState();

  return (
    <section className="flex bg-how-it-work flex-col items-center border border-none border-solid px-4  max-md:px-5 ">
      <div className="justify-between mt-5 w-full  max-md:max-w-full">
        <div className="flex gap-5 items-center max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full">
            <div className="flex text-center sm:text-left flex-col justify-center self-stretch py-2.5 my-auto text-lg mt-0 sm:mt-10 max-md:max-w-full">
              <div>
                <Heading blueText="How It" whiteText="Works?" />
              </div>

              <Paragraphs para="Our vocabulary learning is a four-step journey: Match words with images via drag-and-drop, read stories incorporating new vocabulary, take assessments on word meanings, and reinforce learning through spaced repetition. This streamlined process ensures effective, enjoyable vocabulary enhancement." />

              <div className="get-started-button">
                <div className="aboutUSBtn">
                  <Link
                    to={`${
                      isAuthenticated
                        ? buyPlan
                          ? "/DashBoard"
                          : ""
                        : "/SignUpPage"
                    }`}
                  >
                    <button
                      onClick={isAuthenticated ? () => scrollToRef() : ""}
                    >
                      <Button btnText="Get Started" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full ">
            <img alt="" loading="lazy" src={How} className="hideImage " />
          </div>
        </div>
      </div>
      <LearningSteps />
    </section>
  );
};

const LearningSteps = () => {
  const steps = [
    {
      title: "Interactive Learning",
      subtitle: "Learn the Meanings of Words",
      description:
        "Dive into vocabulary learning with our interactive drag-and-drop feature. Match words to their corresponding images and descriptions to understand meanings in a fun, engaging way. This hands-on approach ensures you not only see the word but connect it with a visual and contextual clue.",
      image: image1,
    },
    {
      title: "Engaging Stories",
      subtitle: "Read and Discover",
      description:
        "After mastering the meanings, immerse yourself in captivating stories crafted using the words you've just learned. Each story spans various genres, from Fantasy to Science Fiction, making reading an adventure and reinforcing your new vocabulary in exciting contexts.",
      image: image3,
    },
    {
      title: "Comprehensive Assessment",
      subtitle: "Test Your Knowledge",
      description:
        "Evaluate your understanding through assessments that challenge you on meanings, synonyms, and antonyms of the words learned. This step ensures you've grasped the vocabulary deeply, providing feedback and areas for improvement.",
      image: image4,
    },
    {
      title: "Effective Revision",
      subtitle: "Spaced Repetition for Mastery",
      description:
        "Our app employs spaced repetition algorithms to review words at optimal intervals, helping you solidify your vocabulary knowledge. This technique revisits words you've learned, focusing on those you found challenging, to ensure long-term retention and mastery.",
      image: image2,
    },
  ];

  return (
    <>
      <div className="flex justify-center flex-col">
        <div className="justify-between mt-0 sm:mt-12 w-full   max-md:max-w-full">
          <div className="flex  max-md:flex-col boxGaping">
            {steps.slice(0, 2).map((step, index) => (
              <LearningStep key={index} {...step} />
            ))}
          </div>
        </div>
        <div className="justify-between mt-0 sm:mt-12 w-full   max-md:max-w-full">
          <div className="flex  max-md:flex-col boxGaping">
            {steps.slice(2, 4).map((step, index) => (
              <LearningStep key={index} {...step} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const LearningStep = ({ title, subtitle, description, image }) => {
  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full max-w-[700px]">
      <div className="flex flex-col grow justify-center p-4  w-full bg-white bg-opacity-10 rounded-[100px] max-md:pr-5 max-md:mt-10 max-md:max-w-full  max-md:rounded-[40px]">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full justify-center items-center sm:items-left rounded-[50%]">
              <div>
                <img
                  loading="lazy"
                  src={image}
                  alt={title}
                  className="shrink-0 max-w-full aspect-[1.02] w-[127px] max-md:mt-0"
                  style={{ borderRadius: "50%" }}
                />
              </div>
            </div>
            <div className="flex flex-col  w-[76%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow font-medium tracking-normal max-md:mt-4 text-center sm:text-left  items-center sm:items-left items-baseline">
                <h3
                  style={{ marginTop: "0 !important" }}
                  className="text-center font-poppins font-bold sm:text-left w-[100%] text-3xl mt-0 test-shadow font-bold bg-clip-text bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)]"
                >
                  {title}
                </h3>
                <p className="mt-1.5 text-lg text-white text-center sm:text-left w-[100%] font-poppins">
                  {subtitle}
                </p>
                <p className="mt-0 text-xs sm:mt-2 font-poppins text-[#DCDCDC] pr-2 pb-2">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowitWork;
