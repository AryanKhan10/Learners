import React, { useState } from 'react'

function InstructorChart() {

    const [currChart, setCurChart] = useState("students")
    // create random colors
    const getRandomColor = (nColors)=>{
        const colors =[];
        for (let i=0; i<nColors; i++){
            const color= `rgb(${math.floor(Math.random *256)}, ${math.floor(Math.random *256)}, ${math.floor(Math.random *256)})`
            colors.push(color)
        }
        return colors;
    }

    //create chart data for student

    //create chart data for income
  return (
    <div>
      
    </div>
  )
}

export default InstructorChart
