import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import apiConnector from "../services/apiConnector"
import { categories } from "../services/apis"
import { getCatalogPageDetail } from "../services/catalog"
import Course_Card from "../components/Catalog/Course_Card"
import CourseSlider from "../components/Catalog/CourseSlider"
import { useDispatch, useSelector } from "react-redux"
import { setCatalogPageData } from "../slices/course"

function Catalog() {
  const { catalogName } = useParams()
  const dispatch = useDispatch()
  const {catalogPageData} = useSelector( state=> state.course)
  // const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [active, setActive] = useState(false)
console.log(catalogPageData)
  useEffect(() => {
    const getCategorys = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API)
      const category_id = res?.data?.allTag?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName,
      )[0]._id
      setCategoryId(category_id)
    }
    getCategorys()
  }, [catalogName])

  useEffect(() => {
    console.log(categoryId)
    const getCatelogoryDetails = async () => {
      try {
        const res = await getCatalogPageDetail(categoryId)
        dispatch(setCatalogPageData(res))
      } catch (error) {
        console.log("error while getting course details ", error)
      }
    }
    if (categoryId) {
      getCatelogoryDetails()
    }
  }, [categoryId])

  return (
    <div className="min-h-screen bg-gradient-to-b text-white">
      {/* Breadcrumb and Category Header */}
      <div className="container mx-auto pl-4 pe-8 py-8">
        <div className="mb-12 rounded-2xl p-8 backdrop-blur-sm">
          <p className="mb-4 text-sm font-medium text-sky-300/70">
            <span className="hover:text-sky-300 cursor-pointer transition-colors">Home</span>
            {" / "}
            <span className="hover:text-sky-300 cursor-pointer transition-colors">Catalog</span>
            {" / "}
            <span className="text-cyan-400">{catalogPageData?.data?.selectedCategory?.name}</span>
          </p>
          <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>
          <p className="max-w-3xl text-sky-100/80">{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        <div className="space-y-16">
          {/* Section 1: Courses to get you started */}
          <div className="rounded-xl border border-sky-700/30 p-6 backdrop-blur-sm">
            <div className="mb-6 flex flex-col gap-x-3">
              <div className="mb-4 text-xl font-bold text-white md:text-2xl">Courses to get you started</div>
              <div className="flex border-b border-sky-800/50">
                <p
                  className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
                    !active ? "border-b-2 border-cyan-400 text-cyan-400" : "text-sky-300/70 hover:text-sky-200"
                  }`}
                  onClick={() => setActive(false)}
                >
                  Most Popular
                </p>
                <p
                  className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
                    active ? "border-b-2 border-cyan-400 text-cyan-400" : "text-sky-300/70 hover:text-sky-200"
                  }`}
                  onClick={() => setActive(true)}
                >
                  New
                </p>
              </div>
            </div>
            <div className="py-4">
              <CourseSlider courses={catalogPageData?.data?.mostSellingCourse} />
            </div>
          </div>

          {/* Section 2: Top Courses */}
          <div className="rounded-xl border border-sky-700/30 p-6 backdrop-blur-sm">
            <p className="mb-6 text-xl font-bold text-white md:text-2xl">
              Top Courses in {catalogPageData?.data?.selectedCategory?.name}
            </p>
            <div className="py-4">
              <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses} />
            </div>
          </div>

          {/* Section 3: Frequently Bought */}
          <div className="rounded-xl border border-sky-700/30 p-6 backdrop-blur-sm">
            <p className="mb-6 text-xl font-bold text-white md:text-2xl">Frequently Bought</p>
            <div className="py-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 place-content-center place-items-center">
                {catalogPageData?.data?.mostSellingCourse?.slice(0, 4).map((course, index) => (
                  <Course_Card course={course} key={index} Height={"h-[250px]"} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with some spacing */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  )
}

export default Catalog

