import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import HighlightText from "../components/Home/HighlightText"
import Buttons from "../components/Home/Buttons"
import Banner from "../assets/banner.mp4"
import Code from "../components/Home/Code"
import Footer from "../components/Footer"
import TimeLine from "../components/Home/TimeLine"
import InstructorSection from "../components/Home/InstructorSection"
import ExploreMore from "../components/Home/ExploreMore"
import ReviewSlider from "../components/ReviewSlider"
function HomePage() {
  return (
    <div className="w-full">
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-4xl justify-between items-center text-white">
        <Link to="/signup">
          <div className="mt-12 p-1 rounded-full bg-slate-950 text-slate-400 transition-all duration-200 hover:scale-95">
            <div className="flex items-center gap-2 px-4 sm:px-10 py-2 rounded-full transition-all duration-200 hover:scale-95">
              <p className="text-sm sm:text-base">Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-xl sm:text-2xl md:text-3xl font-semibold mt-6 text-center">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        <div className="text-slate-300 text-sm sm:text-md font-semibold w-full sm:w-[90%] mt-4 text-center">
        Our courses are designed to help you unlock your potential and excel in the tech industry. With hands-on learning and expert guidance, you'll gain the knowledge needed to tackle real-world challenges and thrive in a digital world.
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Buttons active={true} linkto={"/signup"}>
            Learn More
          </Buttons>
          <Buttons active={false} linkto={"/login"}>
            Book a demo
          </Buttons>
        </div>
      </div>

      <div className="w-full sm:w-[28rem] md:w-[35rem] lg:w-[43rem] xl:w-[800px] mx-auto my-10 mt-8 px-4">
        <video className="w-full shadow-[5px_5px_0px_0px_rgba(109,40,217)]" muted loop autoPlay>
          <source src={Banner} type="video/mp4" />
        </video>
      </div>

      {/* section 2 */}
      <div className="w-full px-4">
        <Code
          position={"lg:flex-row"}
          heading={
            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Unlock Your <HighlightText text={"coding potential"} /> with our online courses
            </div>
          }
          subheading={"Our courses are designed and taught by industry experts who have years of experience"}
          btn1={{
            text: "try it yourself",
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
      <div className="w-full px-4">
        <Code
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Unlock your <HighlightText text={"programming skills"} /> with our expert-led online courses
            </div>
          }
          subheading={"Our courses are crafted and delivered by seasoned professionals with extensive industry experience."}
          btn1={{
            text: "try it yourself",
            linkto: "/signup",
            active: true,
          }}
          btn2={{
            text: "learn more",
            linkto: "/login",
            active: false,
          }}
          code={`def add_task(task):
        tasks.append(task)
    print(f"Task '{task}' added.")
def remove_task(task):
    if task in tasks:
        tasks.remove(task)
        print(f"Task '{task}' removed.")
    else:
        print("Task not found.")
def display_tasks():
    print("Tasks:")
    for task in tasks:
        print(f"- {task}")`}
          codeColor={"text-orange-300"}
        />

        <ExploreMore />
      </div>
      {/* section 3 */}

      <div className="bg-zinc-100 text-gray-800 w-full">
        <div className="image h-[250px]">
          <div className="h-[120px]"></div>

          <div className="flex flex-col w-11/12 max-w-max items-center mx-auto gap-9">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Buttons linkto={"/signup"} active={true} color={"flex items-center gap-3"}>
                Explore full catalog
                <FaArrowRight />
              </Buttons>
              <Buttons linkto={"/signup"} active={false} color={"text-white"}>
                Learn more
              </Buttons>
            </div>
          </div>
        </div>

        <div className="mx-auto w-10/12 max-w-max flex flex-col items-center justify-between gap-6 my-10">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold w-full lg:w-[50%]">
              Get the Skills you need for a <HighlightText text={"Job that is in demand"} />
            </div>
            <div className="flex flex-col gap-4 items-start w-full lg:w-[50%]">
              <div className="text-base sm:text-lg md:text-[19px]">
              Our courses are tailored to provide you with the practical knowledge and expertise required to succeed in today's competitive job market. Start learning now and open doors to exciting career opportunities.
              </div>
              <Buttons active={true} linkto={"/signup"}>
                Learn more
              </Buttons>
            </div>
          </div>
        </div>

        <TimeLine />
        {/* <Languagesection/> */}
      </div>

      {/* section 4 */}
      <div className="w-11/12 mx-auto max-w-max overflow-hidden flex flex-col items-center justify-between gap-6 first-letter bg-slate-900 text-white">
        <InstructorSection />

        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mt-10">Review from Other Learners</h2>
      </div>
      {/* section 5 */}

      <h2 className="text-center text-gray-400 py-2 text-lg">Review from Other Learners</h2>

      <ReviewSlider/>
      <Footer />
    </div>
  )
}

export default HomePage

