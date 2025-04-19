import Button from "./Buttons"
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from "react-type-animation"

function Code({ position, heading, subheading, btn1, btn2, code, gradient, codeColor }) {
  return (
    <div
      className={`flex ${position} flex-col items-center lg:flex-row my-10 lg:my-20 justify-between mx-auto w-full px-4 lg:w-[80%]`}
    >
      {/* sec 1 */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center gap-4 lg:gap-8 mb-8 lg:mb-0">
        <div className="text-2xl lg:text-3xl xl:text-4xl font-semibold">{heading}</div>
        <div className="text-slate-600 font-bold text-sm lg:text-base">{subheading}</div>

        <div className="flex flex-col sm:flex-row gap-4 lg:gap-7 mt-4 lg:mt-7">
          <Button active={btn1.active} linkto={btn1.linkto}>
            <div className="flex gap-2 items-center">
              {btn1.text}
              <FaArrowRight />
            </div>
          </Button>
          <Button active={btn2.active} linkto={btn2.linkto} color={"text-white"}>
            {btn2.text}
          </Button>
        </div>
      </div>

      {/* sec 2 */}
      <div className="w-full lg:w-[50%] h-fit flex flex-row justify-end text-[8px] sm:text-[10px] mt-8 lg:mt-0 py-4 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-lg shadow-xl overflow-hidden">
        {/* grad */}
        <div className="text-center flex flex-col w-[10%] text-slate-700 font-mono font-bold text-base">
          {[...Array(13)].map((_, index) => (
            <p key={index}>{index + 1}</p>
          ))}
        </div>
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} overflow-x-auto`}>
          <TypeAnimation
            sequence={[code, 5000, ""]}
            repeat={Number.POSITIVE_INFINITY}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              fontSize: "16px",
              sm: "14px",
              md: "16px",
              lg: "18.5px",
              marginLeft: "5px",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Code

