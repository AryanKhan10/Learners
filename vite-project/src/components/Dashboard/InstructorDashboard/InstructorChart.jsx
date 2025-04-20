"use client"

import { useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)
function InstructorChart({ courses }) {
  const [currChart, setCurChart] = useState("students")

  // create random colors
  const getRandomColor = (nColors) => {
    const colors = []
    for (let i = 0; i < nColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  // Generate colors once to ensure they match
  const studentColors = getRandomColor(courses.length)
  const incomeColors = getRandomColor(courses.length)

  //create chart data for student
  const chartDataForStudents = {
    labels: courses.map((course) => course.courseTitle),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: studentColors,
        borderColor: studentColors, // Use the same colors for border
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  }

  //create chart data for income
  const chartDataForIncome = {
    labels: courses.map((course) => course.courseTitle),
    datasets: [
      {
        data: courses.map((course) => course.totalAmount),
        backgroundColor: incomeColors,
        borderColor: incomeColors, // Use the same colors for border
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-xl font-semibold text-white mb-3">Visualize</p>
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currChart === "students"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
            }`}
            onClick={() => setCurChart("students")}
          >
            Student
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currChart === "Income"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
            }`}
            onClick={() => setCurChart("Income")}
          >
            Income
          </button>
        </div>
        <div className="w-full h-64 md:h-80">
          <Pie data={currChart === "students" ? chartDataForStudents : chartDataForIncome} options={options} />
        </div>
      </div>
    </div>
  )
}

export default InstructorChart
