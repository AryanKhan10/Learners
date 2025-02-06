import React from "react";
import HighlighText from "./HighlightText";
import Button from "./Buttons";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
function Code({
  position,
  heading,
  subheading,
  btn1,
  btn2,
  code,
  gradient,
  codeColor,
}) {
  return (
    <div className={`flex ${position} flex-col items-center lg:flex-row my-20 lg:justify-between  mx-auto w-[80%]`}>
      {/* sec 1 */}
      <div className="w-[50%] flex flex-col justify-center gap-8">
        {heading}
        <div className="text-slate-600 font-bold">{subheading}</div>

        <div className="flex gap-5 lg:gap-7 mt-7">
          <Button active={btn1.active} linkto={btn1.linkto}>
            <div className="flex gap-2 items-center">
              {btn1.text}
              <FaArrowRight />
            </div>
          </Button>
          <Button
            active={btn2.active}
            linkto={btn2.linkto}
            color={"text-white"}
          >
            {btn2.text}
          </Button>
        </div>
      </div>

      {/* sec 2 */}
      <div className="w-[59%] h-fit flex flex-row justify-end text-[10px] mt-8 lg:mt-0 py-4  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-lg shadow-xl">
        {/* grad */}

        <div className="text-center flex flex-col w-[10] text-slate-700 font-mono font-bold text-xl">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor}`}
        >
          <TypeAnimation
            sequence={[code, 5000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              fontSize: "18.5px",
              marginLeft: "5px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Code;
