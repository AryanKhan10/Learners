import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/Home/HighlightText";
import Buttons from "../components/Home/Buttons";
import Banner from "../assets/banner.mp4";
import Code from "../components/Home/Code";
import Footer from "../components/Footer"
import TimeLine from "../components/Home/TimeLine";
import Languagesection from "../components/Home/Languagesection";
import InstructorSection from "../components/Home/InstructorSection"
import ExploreMore from "../components/Home/ExploreMore";
function HomePage() {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-4xl justify-between items-center text-white">
        <Link to="/signup">
          <div className=" mt-12 p-1 rounded-full bg-slate-950 text-slate-400 transition-all duration-200 hover:scale-95">
            <div className="flex items-center gap-2 px-10 py-2 rounded-full transition-all duration-200 hover:scale-95">
              <p>Become and Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-3xl font-semibold mt-6 text-center">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        <div className=" text-slate-300 text-md font-semibold w-[90%]  mt-4 text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          fugit eveniet necessitatibus? Sit doloribus consequuntur quas? Illum
          quos quas ea facere esse officia.
        </div>

        <div className="flex gap-3 mt-6">
          <Buttons active={true} linkto={"/signup"}>
            Learn More
          </Buttons>
          <Buttons active={false} linkto={"/login"}>
            Book a demo
          </Buttons>
        </div>
      </div>

      <div className="w-[28rem] sm:w-[35rem] md:w-[43rem] lg:w-[800px] mx-auto my-10 mt-8">
        <video
          className=" shadow-[5px_5px_0px_0px_rgba(109,40,217)]"
          muted
          loop
          autoPlay
        >
          <source src={Banner} type="video/mp4" />
        </video>
      </div>
      {/* section 2 */}
      <div>
        <Code
          position={"lg:flex-row"}
          heading={
            <div className="text-4xl font-semibold text-white">
              Unlock Your <HighlightText text={"codeing potential"} /> with our
              online courses
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience"
          }
          btn1={{
            text: "try it youself",
            linkto: "/signup",
            active: true,
          }}
          btn2={{
            text: "learn more",
            linkto: "/login",
            active: false,
          }}
          code={`<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" href="/vite.svg" />
</head>
<body>
    <div class="card">
        <img src="#" alt="Image">
        <h2>/</h2>
        <p>description...</p>
    </div>
</body>
</html>`}
          codeColor={"text-yellow-300"}
        />
      </div>
      <div>
        <Code
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-4xl font-semibold text-white">
              Unlock Your <HighlightText text={"codeing potential"} /> with our
              online courses
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience"
          }
          btn1={{
            text: "try it youself",
            linkto: "/signup",
            active: true,
          }}
          btn2={{
            text: "learn more",
            linkto: "/login",
            active: false,
          }}
          code={`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <link rel="icon" href="/vite.svg" />
                </head>
                <body>
                    <div class="card">
                        <img src="#" alt="Image">
                        <h2>/</h2>
                        <p>description...</p>
                    </div>
                </body>
                </html>`
            }
          codeColor={"text-yellow-300"}
        />

<ExploreMore/>

      </div>
      {/* section 3 */}

      <div className="bg-zinc-100 text-gray-800">
        <div className="image h-[250px]">
            <div className="h-[120px]"></div>

            <div className="flex flex-col w-11/12 max-w-max items-center mx-auto gap-9">
            <div className="flex gap-4 justify-center">
                <Buttons linkto={"/signup"} active={true} color={"flex items-center gap-3"}>
                    Explore full catalog
                    <FaArrowRight/>
                </Buttons>
                <Buttons linkto={"/signup"} active={false} color={"text-white"} >
                    Learn more
                </Buttons>
            </div>
            </div>
        </div>
        
        <div className="mx-auto w-10/12 max-w-max flex flex-col items-center justify-between gap-6 my-10">
            <div className="flex gap-4">
                <div className="text-3xl font-semibold w-[50%]">
                    Get the Skills you need for a  {" "}                    <HighlightText text={"Job that is in demand"} />
                </div>
                <div className="flex flex-col gap-4 items-start">
                    <div className="text-[19px]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quia laboriosam sint maxime rem dolor. Est iste quas dolore nemo?
                    </div>
                    <Buttons active={true} linkto={"/signup"}>
                        Learn more
                    </Buttons>
                </div>
            </div>
        </div>

            <TimeLine/>
            {/* <Languagesection/> */}
      </div>

      {/* section 4 */}
      <div className="w-11/12 mx-auto max-w-max overflow-hidden flex flex-col items-center justify-between gap-6 first-letter bg-slate-900 text-white">
            <InstructorSection/>

            <h2 className="text-center text-4xl font-semibold mt-10">review from Other Learners</h2>
      </div> 
      {/* section 5 */}
             <Footer/>
    </div>
  );
}

export default HomePage;
