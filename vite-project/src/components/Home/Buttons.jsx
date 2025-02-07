import { Link } from "react-router-dom"

function Buttons({ children, active, linkto, color }) {
  return (
    <Link to={linkto} className="w-full sm:w-auto">
      <div
        className={`
            text-center 
            text-sm sm:text-base md:text-lg 
            font-semibold 
            px-4 sm:px-6 
            py-2 sm:py-3 
            rounded-md 
            ${active ? "bg-yellow-300 text-slate-800" : "bg-slate-700"} 
            transition-all duration-200 
            hover:scale-95 
            ${color}
            w-full sm:w-auto
            whitespace-nowrap
        `}
      >
        {children}
      </div>
    </Link>
  )
}

export default Buttons

