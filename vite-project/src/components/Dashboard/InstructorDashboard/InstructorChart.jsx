import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
function InstructorChart({courses}) {

    const [currChart, setCurChart] = useState("students")
    // create random colors
    const getRandomColor = (nColors)=>{
        const colors =[];
        for (let i=0; i<nColors; i++){
            const color= `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random() *256)}, ${Math.floor(Math.random() *256)})`
            console.log(color)
            colors.push(color)
        }
        return colors;
    }

    //create chart data for student

    const chartDataForStudents ={
        labels: courses.map((course)=> course.courseTitle),
        datasets: [
            {
                data:courses.map((course)=> course.totalStudentsEnrolled), 
                backgroundColor:getRandomColor(courses.length),
                borderColor:getRandomColor(courses.length),
                borderWidth: 1,
                hoverOffset: 4,

            }
        ]
    }
    
    //create chart data for income
    const chartDataForIncome = {
        labels: courses.map((course)=> course.courseTitle),
        datasets: [
            {
                data:courses.map((course)=> course.totalAmount), 
                backgroundColor:getRandomColor(courses.length),
                borderColor:getRandomColor(courses.length),
                borderWidth: 1,
                hoverOffset: 4,
            }
        ]
    }
    console.log(chartDataForStudents)
    console.log(chartDataForIncome)
    const options ={

    };

  return (
    <div>
      <div>
        <p>Visualize</p>
        <div>
            <button
                onClick={()=> setCurChart("students")}>
                Student
            </button>
            <button
                onClick={()=>setCurChart("Income")}>
                Income
            </button>
        </div>
        <div>
            <Pie data={currChart === "students" ? chartDataForStudents : chartDataForIncome} options={options} />
        </div>
      </div>
    </div>
  )
}

export default InstructorChart
