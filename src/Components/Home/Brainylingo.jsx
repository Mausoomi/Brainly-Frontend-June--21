import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import homeImg2 from "../../Assets/Images/home-img-2.png";
import "../../Styles/Home.css";
import Button from "../Button";
import Heading from "../Heading";
import Paragraphs from "../Paragraphs";

function Brainylingo({ scrollToRef }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated)
  const user = useSelector((state) => state.auth.user);

console.log(user.buyPlan);

const handleClick = () => {
  if (isAuthenticated) {
    scrollToRef();
  }
};

  return (
    <div
      className="flex justify-between items-center px-4  max-md:px-5"
      style={{
        backgroundColor:
          "linear-gradient(180deg, #FFFFFF 0%, rgba(0, 0, 0, 0.18) 97.88%)",
      }}
    >
      <div className="justify-between sm:mt-8 mt-0 w-full  max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 items-center">
          <div className="flex flex-col p-0 sm:p-4 ">
            <img
              src={homeImg2}
              alt="home2"
              className=" aspect-square max-md:mt-10 hideImage"
            />
          </div>
          <div className="flex flex-col ml-5 w-[59%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-center self-stretch py-2.5 my-auto text-lg  max-md:max-w-full">
              <div className="sm:text-left text-center">
                <Heading blueText="WHY" whiteText="Brainylingo?" />
              </div>
              <Paragraphs para="Discover how Brainy Lingo is transforming vocabulary learning for 11 Plus exam preparation with its innovative approach. Designed by parents who mastered the exam prep journey, our app addresses common challenges with engaging, scientifically-backed solutions." />
              <div className="justify-center sm:self-start self-center  mt-10 font-semibold tracking-normal text-black  rounded-[1000px] ">
                {isAuthenticated ? (
                  <Link to={`${user?.buyPlan ? "/DashBoard" : ""}`}>
                    <Button
                      btnText="Get Started"
                      onClickFunction={handleClick}
                    />
                  </Link>
                ) : (
                  <Link to="/SignUpPage">
                    <Button btnText="Get Started" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brainylingo;
