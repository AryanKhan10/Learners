import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getEnrolledCourses } from '../../services/profile';
function Enrolled() {
    const {token} = useSelector(state=>state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getCourses = async()=>{
        const resp = await getEnrolledCourses(token);
        setEnrolledCourses(resp)

    }
    useEffect(()=>{
        getCourses()
        console.log(enrolledCourses)

    },[])
  return (
     <div className="min-h-screen bg-background p-8">
     <div className="max-w-6xl mx-auto space-y-8">
       <h1 className="text-2xl font-bold">Enrolled Courses</h1>

       {!enrolledCourses ? (
         <div className="flex items-center justify-center h-64 bg-card rounded-lg">
           <div className="text-muted-foreground">Loading...</div>
         </div>
       ) : !enrolledCourses.length ? (
         <div className="flex items-center justify-center h-64 bg-card rounded-lg">
           <div className="text-muted-foreground">You have not enrolled in any course yet</div>
         </div>
       ) : (
         <div className="space-y-6">
           <div className="grid grid-cols-12 px-6 py-3 bg-muted rounded-lg text-sm font-medium">
             <div className="col-span-6">Course Name</div>
             <div className="col-span-3 text-center">Duration</div>
             <div className="col-span-3 text-center">Progress</div>
           </div>

           <div className="space-y-4">
             {enrolledCourses.map((course, index) => (
               <div
                 key={index}
                 className="bg-card rounded-lg shadow-sm"
               >
                 <div className="grid grid-cols-12 gap-4 p-4 items-center">
                   <div className="col-span-6 flex space-x-4">
                     <img
                       src={course.thumbnail}
                       alt={`${course.name} thumbnail`}
                       className="w-24 h-16 object-cover rounded-md"
                     />
                     <div className="space-y-1">
                       <h3 className="font-medium">
                         {course.name}
                       </h3>
                       <p className="text-sm text-muted-foreground line-clamp-2">
                         {course.description}
                       </p>
                     </div>
                   </div>

                   <div className="col-span-3 text-center">
                     <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-secondary">
                       {course.totalDuration}
                     </div>
                   </div>

                   <div className="col-span-3 space-y-2">
                     <div className="flex justify-between items-center text-sm px-1">
                       <span>Progress</span>
                       <span>{course.progressPercentage||0}%</span>
                     </div>
                     <ProgressBar 
                                            completed={course.progressPercentage || 0}
                                            height='8px'
                                            isLabelVisible={false}/>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       )}
     </div>
   </div>
  )
}

export default Enrolled
