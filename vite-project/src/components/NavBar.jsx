import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { Menu, X } from "lucide-react";
import apiConnector from "../services/apiConnector";
import { categories } from "../services/apis.js";
import { IoIosArrowDown } from "react-icons/io";
import LoginDropDown from "./LoginDropDown.jsx";
import logo from '../assets/logo.png'
import Avatar from 'react-avatar';

function NavBar() {

  const location = useLocation();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  console.log(totalItems)
  // console.log(total)
  // console.log(cart)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // console.log("cart ", totalIems);
  // console.log(user);
  const [catalogLinks, setCatalogLinks] = useState([]);
  const fetchLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setCatalogLinks(result.data.allTag);
      console.log(res);
    } catch (error) {
      console.log("Error while fetching Categories: ", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const navLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Catalog",
      // link:"/"
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed -top-6 left-0 right-0 z-50 pt-2 bg-gray-900 flex flex-col lg:flex-row w-full justify-evenly text-white mt-5 border-b-[1px] border-gray-700 pb-2">
      <div className="flex justify-between items-center px-4 lg:px-0 lg:w-5/12">
        {/* <div className="">Logo</div> */}
        {/* <img className="w-[60px] h-[60px] rounded-full" src={logo} alt="learner" loading="lazy"/> */}
        <div className="flex flex-col">
        <p className="font-lobster text-xl font-bold text-purple-600">Learner</p>
        <div className="flex items-center gap-2">
        <div className=" bg-purple-600 w-[56px] h-[4px] rounded-sm"> </div>
        <div className="bg-purple-600 w-[4px] h-[4px] rounded-full"></div>
        </div>
        </div>
        {/* Hamburger Menu Button */}
        <button
          className="lg:hidden p-2 hover:bg-gray-800 rounded-md"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } lg:flex absolute lg:relative top-full lg:top-0 left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent lg:mx-2 lg:mt-0 py-4 lg:py-0 z-50`}
        >
          <ul className="flex flex-col lg:flex-row w-full lg:w-auto justify-between gap-4 lg:gap-7 items-center lg:items-start text-white font-semibold">
            {navLinks.map((item, index) =>
              item.title === "Catalog" ? (
                <div key={index} className="relative group cursor-pointer pb-2">
                  <p className="flex items-center gap-1">
                    {item.title}
                    <IoIosArrowDown className="pt-1" />
                  </p>
                  <div
                    className="w-[140px] bg-white rounded-lg absolute left-1/2 lg:left-[-40%] -translate-x-1/2 lg:translate-x-0 translate-y-[7%]
                     invisible group-hover:visible group-hover:opacity-100 flex flex-col z-[1000] "
                  >
                    <div className="w-6 h-6 bg-white absolute left-[62%] rotate-45 -translate-y-[50%] z-[-1000]"></div>
                    {catalogLinks?.length ? (
                      catalogLinks.map((element, index) => {
                        return (
                          <Link
                            key={index}
                            to={`/catalog/${element?.name?.split(" ").join("-").toLowerCase()}`}
                            className="text-sm text-black hover:bg-purple-600/40 px-4 py-3 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {element.name}
                          </Link>
                        );
                      })
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={item.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <li
                    className={`cursor-pointer ${
                      location.pathname === item.link
                        ? "text-purple-800"
                        : "text-white"
                    } hover:text-purple-600 transition-all duration-200 hover:scale-95`}
                  >
                    {item.title}
                  </li>
                </Link>
              )
            )}
          </ul>
        </nav>
      </div>

      {/* Auth Buttons and Cart */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } lg:flex flex-row justify-end lg:items-center gap-2 mx-12 lg:mx-0 mt-4 lg:mt-0 pb-4 lg:pb-0`}
      >
        {user && user?.accountType !== "Instructor" && (
          <Link to={"/dashboard/cart"} onClick={() => setIsMenuOpen(false)}>
            <div className="relative">
              <CiShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        )}

        {token === null && (
          <>
            <Link to={"/login"} onClick={() => setIsMenuOpen(false)}>
              <button className="w-[80px] bg-gray-800 border-[.1px] border-gray-700 hover:scale-95 transition-all duration-200 py-2 rounded-md">
                Log In
              </button>
            </Link>
            <Link to={"/signup"} onClick={() => setIsMenuOpen(false)}>
              <button className="w-[80px] bg-gray-800 border-[.1px] border-gray-700 hover:scale-95 transition-all duration-200 py-2 rounded-md">
                Sign Up
              </button>
            </Link>
          </>
        )}
        {token && (
          <>
            <div className="relative group cursor-pointer pb-2">
              <p className="flex items-center gap-1">
                
                { user.image ? (
                            <img 
                            className="rounded-full w-[35px] object-cover h-[35px] bg-orange-500"
                            src={user?.image} 
                            alt={`profile ${user?.firstName}`}
                        />):(
                            <Avatar color={Avatar.getRandomColor('sitebase', ['green', 'orange','red'])} name={`${user.firstName} ${user.lastName}`} size="40" round={true} />
                        )
                        }
                
                <IoIosArrowDown className="pt-1" />
              </p>
              <div
                className="lg:w-[120px]  rounded-lg lg:absolute left-12 lg:left-[-40%] -translate-x-1 lg:translate-x-0 translate-y-[%]
                    invisible group-hover:visible group-hover:opacity-100 flex flex-col items-center gap-2  py-2"
              >
                {
                  <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
                    <LoginDropDown />
                  </Link>
                }
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
