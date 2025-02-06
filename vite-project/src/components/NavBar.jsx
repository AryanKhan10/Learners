import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import apiConnector from "../services/apiConnector";
import { categories } from "../services/apis.js";
import { IoIosArrowDown } from "react-icons/io";

function NavBar() {
  const location = useLocation();
  const {token} = useSelector(state=>state.auth);
  const {user} = useSelector(state=>state.profile);
  const {cartItems} = useSelector(state=>state.cart);

  const[catalogLinks, setCatalogLinks] = useState([])
  const fetchLinks = async()=>{
    try {
        const result = await apiConnector('GET', categories.CATEGORIES_API)
        // console.log("categories data ",result.data.allTag)
        setCatalogLinks(result.data.allTag)
        console.log(catalogLinks)

    } catch (error) {
        console.log("Error while fetching Categories: ",error);
    }
}
  useEffect(()=>{
       fetchLinks();
  },[])
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

  return (
    <div className="flex w-full justify-evenly text-white mt-5 border-b-[1px] border-gray-700 pb-2">
      <div className="flex justify-between gap-10 w-5/12">
        <div className="">Logo</div>
        <nav className="">
          <ul className="flex justify-between gap-7 items-start text-white font-semibold">
            {navLinks.map((item, index) => (
              item.title === "Catalog" ? ( 
              <div key={index} className="relative group cursor-pointer pb-2">
                    <p className="flex items-center gap-1">{item.title}
                        <IoIosArrowDown className="pt-1"/>
                    </p>
                    <div className="lg:w-[120px] bg-white rounded-lg absolute left-[-40%] translate-y-[7%]
                    invisible group-hover:visible group-hover:opacity-100 flex flex-col items-center gap-2 z-10 py-2">
                        <div className="w-6 h-6 bg-white absolute left-[72%] rotate-45 -translate-y-[50%]"></div>
                        {
                            catalogLinks.length ? (
                                catalogLinks.map((element, index)=>{
                                    console.log(element.name)
                                    return <Link to={`/categories/${element.name}`} 
                                                className="text-sm text-black ">
                                            {element.name}
                                            </Link>
                                    // <p key={index} className="text-sm text-black">{element.name}</p>
                                })
                            ) : ( <div></div> )
                        }
                    </div>
              </div> ) : (
                <Link key={index} to={item.link}>
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
            ))}
          </ul>
        </nav>
      </div>
      <div className="">
        
            {user && user?.accountType !== "Instructor" && (
                <Link to={'/dashboard/cart'}>
                    <CiShoppingCart/>
                    {
                        cartItems > 0 && <span>{cartItems}</span>
                        
                    }
                </Link>
            )}

            {token === null && (
                <Link to={'/login'}>
                    <button className="bg-gray-800 border-[.1px] border-gray-700 hover:scale-95 transition-all duration-200 px-2 py-1 mx-2 rounded-md">
                        Log In
                    </button>
                </Link>
            )}
            {token === null && (
                <Link to={'/signup'}>
                    <button className="bg-gray-800 border-[.1px] border-gray-700 hover:scale-95 transition-all duration-200 px-2 py-1 mx-2 rounded-md">
                        Sign Up
                    </button>
                </Link>
            )}
        
      </div>
    </div>
  );
}

export default NavBar;
