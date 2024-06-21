import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo2 from "../Assets/Images/logo2.png";
import Button from "../Components/Button";
import Dropdown from "../Components/Dropdown";
import "../Styles/NavBar.css";
import { useDispatch } from "react-redux";
import { async_removeuser } from "../store/Actions/Authactions";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import ContactUs from "../Components/contactUs";

function NavBar({ scrollToRef }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [SignOutBtnDfrnt, setSignOutBtnDfrnt] = useState(null);
  const [SignBtnBg, setSignBtnBg] = useState(false);
  const [navBgChng, setNavBgChng] = useState(false);
  const [textNavItem, setTextNavItem] = useState(false);
  const [openSettingMenu, setOpenSettingMenu] = useState(false);
  const [openContactUs, setOpenContactUs] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const LoggedIn = isAuthenticated;
  const dropdownRef = useRef(null);

const [buyPlan , setbuyPlan] = useState("") 

useEffect(() => {
  setbuyPlan(user?.buyPlan)
},[user])

  console.log(user , "at Navbar Component ");
  const capitalizeFirstLetter = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  const handleSettingMenu = () => {
    setOpenSettingMenu((openSettingMenu) => !openSettingMenu);
  };
  console.log(openSettingMenu);

  function SignOutBtnPage() {

    return (
      <>
        <div style={{ width: "179px" }}>
          <Button
            btnText={capitalizeFirstLetter(user?.Children_Name)}
            onClickFunction={handleSettingMenu}
          />
        </div>
      </>
    );
  }

  React.useEffect(() => {
    if (location.pathname === "/ScienceFictionStories") {
      setSignOutBtnDfrnt(
        SignOutBtnPage,
        setNavBgChng(false),
        setTextNavItem(false)
      );
    } else if (location.pathname === "/FantasyStories") {
      // setSignOutBtnDfrnt(SignOutBtnPage, setLoggedIn(true),setNavBgChng(false), setTextNavItem(false))
      setSignOutBtnDfrnt(
        SignOutBtnPage,
        setNavBgChng(false),
        setTextNavItem(false)
      );
    } else if (location.pathname === "/AdventureStories") {
      setSignOutBtnDfrnt(
        SignOutBtnPage,
        setNavBgChng(false),
        setTextNavItem(false)
      );
    } else if (location.pathname === "/MysteryStories") {
      setSignOutBtnDfrnt(
        SignOutBtnPage,
        setNavBgChng(false),
        setTextNavItem(false)
      );
    } else if (location.pathname === "/HistoryStories") {
      setSignOutBtnDfrnt(
        SignOutBtnPage,
        setNavBgChng(false),
        setTextNavItem(false)
      );
    } else if (location.pathname === "/SportsStories") {
      setSignOutBtnDfrnt(
        SignOutBtnPage,
        setNavBgChng(false),
        setTextNavItem(false)
      );
    } else if (location.pathname === "/SignUpPage") {
      setNavBgChng(true);
      setTextNavItem(true);
    } else if (location.pathname === "/SignInPage") {
      setNavBgChng(true);
      setTextNavItem(true);
    } else {
      setSignOutBtnDfrnt(
        <>
          <div style={{ width: "179px" }}>
            <button
              className="font- poppins font-medium bg-white bg-opacity-10 SignOutBtn text-[#F3F3F4]"
              onClick={handleSettingMenu}
            >
              {capitalizeFirstLetter(user?.Children_Name)}
           
            </button>
          </div>
        </>
      );
      setNavBgChng(false);
      setTextNavItem(false);
    }

    return () => {
      // setLoggedIn(false)
      document.body.style.background = "";
      document.body.style.backgroundImage = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundSize = "";
    };
  }, [location,user]);

  const navItems = [
    {
      text: "Home",
      link: "",
      to: "revolutionize",
    },
    {
      text: "Why Brainylingo",
      link: "",
      to: "brainylingo",
    },
    {
      text: "How It Works",
      link: "",
      to: "howitWork",
    },
    {
      text: "Testimonials",
      link: "",
      to: "learners",
    },
    {
      text: "About Us",
      link: "",
      to: "aboutUs",
    },
    {
      text: "Pricing ",
      link: "",

      to: "selectPlan",
    },
    {
      text: "Contact Us",
      link: "",
      // to: "faq",
    },
    {
      text: "FAQ's",
      link: "",
      to: "faq",
    },
  ];

  const navLoginItems = [
    {
      text: "Home",
      link: "/loggedInHome",
    },

    {
      text: "Dashboard",
      link: "/DashBoard",
    },
    {
      text: "Leaderboard",
      link: "/LeaderBoard",
    },
    {
      text: "Daily Quiz",
      link: "/DailyQuiz",
    },
    {
      text: "Genre",
    },
  ];

  const handleSignUp = () => {
    navigate("/SignUpPage");
    setSignBtnBg(true);
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    // setLoggedIn(!LoggedIn)
    setIsMenuOpen(false);
    navigate("/SignInPage");

    setSignBtnBg(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenSettingMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.setItem("hasVisited", "");

    setIsMenuOpen(false);
    navigate("/");

    dispatch(async_removeuser());
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const ProfileSetting = () => {
    setOpenSettingMenu(false);
  };

  const HandleOpenContactUs = () => {
    setOpenContactUs(!openContactUs);
  };

  return (
    <>
      <div>
        <nav
          className={`flex items-center justify-between flex-wrap p-4 ${
            navBgChng ? "navBg" : ""
          } `}
        >
          <Link to="/loggedInHome">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <img
                loading="lazy"
                src={Logo2}
                alt="logo"
                className="shrink-0 my-auto w-10 aspect-square mr-4"
              />

              <span
                className={`text-xl tracking-tight font-kanit font-normal ${
                  textNavItem ? "text-black" : "text-white"
                }`}
              >
                BrainyLingo
              </span>
            </div>
          </Link>
          <div className={`block lg:hidden`}>
            <button
              className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
              onClick={toggleMenu}
            >
              <svg
                className={` ${
                  textNavItem ? "fill-black" : "fill-white"
                } h-5 w-5 " viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg`}
              >
                <title>Menu</title>
                <path
                  d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                  className=" w-[25px]"
                />
              </svg>
            </button>
          </div>
          <div
            className={`w-full ${
              isMenuOpen ? "block" : "hidden"
            }  flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div class="text-sm lg:flex-grow">
              {LoggedIn && buyPlan
                ? navLoginItems.map((item, id) => (
                    <div
                      key={id}
                      className={`block mt-4 lg:inline-block lg:mt-0   sm:mr-4 mr-0 font-poppins font-medium navItemsColor ${
                        textNavItem ? "" : "text-[#F3F3F4]"
                      }`}
                    >
                      <Link
                        to={item.link}
                        onClick={item.text === "Genre" ? "" : handleMenuClose}
                      >
                        {/* {item.text === "Genre" ? <Gener /> : item.text} */}
                        {item.text === "Genre" ? (
                          <Dropdown setIsMenuOpen={setIsMenuOpen} />
                        ) : (
                          item.text
                        )}
                      </Link>
                    </div>
                  ))
                : navItems.map((item, id) => (
                    <div
                      key={id}
                      className={`block mt-4 lg:inline-block lg:mt-0  sm:mr-4 mr-0font-poppins font-medium ${
                        textNavItem ? "" : "text-[#F3F3F4]"
                      }`}
                    >
                      <button
                        smooth={true}
                        duration={500}
                        onClick={() => scrollToRef(item.to)}
                      >
                        {item.text === "Contact Us" ? <ContactUs /> : item.text}
                      </button>
                    </div>
                  ))}
            </div>
            {/* <div className='flex flex-col sm:flex-row items-center gap-2 '> */}
            <div className="signAline">
              <div>
                {LoggedIn ? (
                  ""
                ) : SignBtnBg ? (
                  <div className="text-white w-[179px] mx-auto ">
                    <Button btnText="Sign Up" />
                  </div>
                ) : (
                  <button
                    className={`font-poppins font-normal mt-2 ${
                      navBgChng ? "text-black" : "text-[#F3F3F4]"
                    }`}
                    onClick={handleSignUp}
                  >
                    {" "}
                    Sign Up
                  </button>
                )}
              </div>

              <div>
                {LoggedIn ? (
                  <>
                    <div>
                      <div className="ProfileDetails">
                        <div className="profilrIcon"></div>
                        {SignOutBtnDfrnt}
                      </div>
                      {openSettingMenu ? (
                        <>
                          <div
                            className="  bg-[#03051B] bg-opacity-50  SettingBox"
                            ref={dropdownRef}
                          >
                            <p
                              onClick={ProfileSetting}
                              className="cursor-pointer"
                            >
                              <Link to="/ProfileDetails">
                                Profile & Setting
                              </Link>
                            </p>
                            <hr />
                            <p
                              onClick={ProfileSetting}
                              className="cursor-pointer"
                            >
                              <Link to="/PlanDetails">Plan Details</Link>
                            </p>
                            <hr />
                            <p className="cursor-pointer">
                              <ContactUs />
                            </p>
                            <hr />
                            <p
                              onClick={handleSignOut}
                              className="cursor-pointer"
                            >
                              Sign Out{" "}
                            </p>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : SignBtnBg ? (
                  <button
                    className={`font-poppins font-normal mt-2 ${
                      navBgChng ? "text-black" : "text-[#F3F3F4]"
                    }`}
                    onClick={handleLogin}
                  >
                    Sign In
                  </button>
                ) : (
                  <div className="text-white w-[179px] mx-auto ">
                    <Button btnText="Sign In" onClickFunction={handleLogin} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
