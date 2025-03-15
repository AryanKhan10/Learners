import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import apiConnector from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageDetail } from "../services/catalog";
import Course_Card from "../components/Catalog/Course_Card";
import CourseSlider from "../components/Catalog/CourseSlider";
function Catalog() {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId,setCategoryId] = useState(null);
    const [active, setActive] = useState(false)

    console.log(catalogName)
    console.log(catalogPageData)

    useEffect(()=>{
        const getCategorys = async () =>{
            const res= await apiConnector("GET", categories.CATEGORIES_API)
            console.log(res.data.allTag)
            const category_id = res?.data?.allTag?.filter((ct)=> ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id
            console.log(category_id)
            setCategoryId(category_id);
        }   
        getCategorys()
        
    },[catalogName])
    console.log(categoryId)

    useEffect(()=>{
        const getCatelogoryDetails = async () =>{
            try {
                const res = await getCatalogPageDetail(categoryId);
                setCatalogPageData(res);
            } catch (error) {
                console.log("error while getting course details ", error);
            }
        }
        if(categoryId){
        getCatelogoryDetails()

        }
    },[categoryId])
  return (
    <div className="text-white">
      <div>
        <p>{`Home/Catalog/`} <span>{catalogPageData?.data?.selectedCategory.name}</span> </p>
        <p>{catalogPageData?.data?.selectedCategory.name}</p>
        <p>{catalogPageData?.data?.selectedCategory.description}</p>
      </div>
      <div>
        {/* sec 1 */}
        <div>
          <div className="flex flex-col gap-x-3">
            <div>Courses to get you started</div>
            <div className="flex gap-1">
                <p className={`text-sm text-gray-400 ${!active? "text-yellow-300 border-b-[3px] border-yellow-500":""} cursor-pointer px-3 py-2`} onClick={()=>setActive(false)}>Most Popular</p>
                <p className={`text-sm text-gray-400 ${active? "text-yellow-300 border-b-[3px] border-yellow-500":""} cursor-pointer px-3 py-2`} onClick={()=>setActive(true)}>New</p>
            </div>
          </div>
          <div>
          <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses}/>
          </div>
        </div>
        {/* sec 2 */}
        <div>
          <p>Top Courses in {catalogPageData?.data?.selectedCategory.name}</p>
          <div>
            <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses} />
          </div>
        </div>
        {/* sec 3 */}
        <div>
            <p>Frequently Bought</p>
            <div className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {
                        catalogPageData?.data?.mostSellingCourse?.slice(0,4)
                        .map((course, index)=> (
                            <Course_Card course={course} key={index} Height={'h-400px'}/>
                        ))
                    }
                </div>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Catalog;
