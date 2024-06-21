import React, { useState } from "react";
import image from '../../Assets/Images/faq.png';
import Heading from "../Heading";

const FAQItem = ({ question, answer, visible }) => (
  <>
    <div>
      <div className="mt-5 text-white max-md:max-w-full text-left font-Inter">{question}</div>
      {visible && (
        <div className="mt-5 text-base text-zinc-300 max-md:max-w-full text-left font-poppins border-b-[1px] pb-2 border-dotted border-slate-600">
          {answer}
        </div>
      )}
    </div>
  </>
);

const faqData = [
  {
    question: "What is Brainy Lingo?",
    answer:
      "Brainy Lingo is the brainchild of a group of dedicated parents and educators who navigated the challenges of the 11 Plus exam preparation with their children.",
  },
  {
    question: "How does Brainy Lingo work?",
    answer:
      "Brainy Lingo is the brainchild of a group of dedicated parents and educators who navigated the challenges of the 11 Plus exam preparation with their children.",
  },
  {
    question: "What scientific principles does Brainy Lingo use to enhance vocabulary learning?",
    answer:
      "Brainy Lingo is the brainchild of a group of dedicated parents and educators who navigated the challenges of the 11 Plus exam preparation with their children.",
  },

  {
    question: "Who can benefit from Brainy Lingo?",
    answer:"Any student preparing for the 11 Plus exam looking for an engaging and effective way to improve their vocabulary can benefit from Brainy Lingo. It's also a valuable tool for parents and tutors seeking to support their children's learning journey."
  },
  {
    question: "Is there a trial period?",
    answer:"Yes, Brainy Lingo offers a 7-day free trial for all new users. This allows you to explore the full range of features and see the impact on your vocabulary learning before committing to a subscription."
  },
  {
    question: "Can I use Brainy Lingo on my mobile device?",
    answer:"While Brainy Lingo is currently optimized for use on laptops and desktops via web browsers for the best learning experience, it is accessible on mobile browsers. We are planning to develop a mobile app in the future to provide even greater accessibility."

  },
  {
    question: "How does the leaderboard work",
    answer:"The leaderboard displays rankings of children based on the number of words learned and exercises completed, encouraging friendly competition and motivating students to practice more."   
  },
  {
    question: "Does using Brainy Lingo guarantee success in the 11 Plus exam?",
    answer:"Brainy Lingo uses science-based methods to boost vocabulary learning for the 11 Plus exam, but cannot guarantee exam success. Exam outcomes depend on individual effort and application. Our app aims to enhance crucial vocabulary skills and support students in reaching their full potential."
  }
];

function Faq() {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <section className="flex justify-between items-center px-16 sm:py-18 py-0 max-md:px-5">
      <div className="justify-between mt-16 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-8 max-md:flex-col max-md:gap-0">
          <div className="justify-center items-center  flex flex-col w-6/12 max-md:ml-0 max-md:w-full ">
            <img
              loading="lazy"
              src={image}
              alt="FAQ's"
              // style={{ maxWidth: '460px' }}
              className="aspect-[1.02] max-md:mt-10 max-md:max-w-full hideImage"
            />
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-xl font-medium max-md:mt-10 max-md:max-w-full">
              <div className="sm:text-left text-center">
                <Heading blueText=" FAQ'S" />
              </div>

              {faqData.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  visible={showAnswer || index === 0}
                />
              ))}

              {!showAnswer && (
                <div className="border-b-[1px] pb-2 border-dotted border-slate-600 text-left ">
                  <button onClick={() => setShowAnswer(true)} className="test-shadow text-left mt-5 font-bold font-Inter underline bg-clip-text bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)] max-md:max-w-full ">
                    Learn more
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
