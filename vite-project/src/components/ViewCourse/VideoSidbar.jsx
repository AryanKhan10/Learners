import React, { useEffect, useState } from "react";
import { RiArrowUpWideFill } from "react-icons/ri";
import { IoCaretBack } from "react-icons/io5";
import { MdReviews } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
function VideoSidbar({ setReviewModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const [activeStatus, setActiveStatus] = useState("");
  const [videoActivebar, setVedioActiveBar] = useState("");
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);
  console.log(courseSectionData)
  useEffect(() => {
    (() => {
      // if courseSectionData is not available, return
      if (!courseSectionData.length) return;

      // for hightlighting the active section and subsection using where we are currently on our UI
      const section = courseSectionData?.findIndex(
        (section) => section._id === sectionId
      );
      const subSection = courseSectionData[section]?.subSection?.findIndex(
        (subSection) => subSection._id === subSectionId
      );
      const activeSubSecId =
        courseSectionData[section]?.subSection[subSection]?._id;

      //set active sec
      setActiveStatus(courseSectionData[section]?._id);
      //set active sub sec/vedio
      setVedioActiveBar(activeSubSecId);
    })();
  }, [
    sectionId,
    subSectionId,
    location.pathname,
    courseSectionData,
    courseEntireData,
  ]);
  return (
    <div className="min-h-screen bg-gray-900 overflow-y-auto text-white p-4">
      {/* Header buttons */}
      <div className="flex justify-between gap-2 items-center mb-6">
        <button 
          onClick={() => navigate(`/dashboard/enrolled-courses`)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
        >
          <IoCaretBack className="text-sm" />
          <span>Back</span>
        </button>
        <button 
          onClick={() => setReviewModal(true)}
          className="flex items-center gap-2 px-4 py-2  justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 cursor-pointer h-10 min-w-[120px] sm:min-w-40 relative overflow-hidden bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700 transition-colors duration-300 touch-none"
        >
          <MdReviews className="text-sm" />
          <span>Add Review</span>
        </button>
      </div>

      {/* Course info */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">{courseEntireData?.courseTitle}</h2>
        <p className="text-gray-400">
          Progress: {completedLectures?.length} / {totalNoOfLectures}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {courseSectionData.map((section) => (
          <div key={section._id} className="border border-gray-700 rounded-lg">
            <div 
              onClick={activeStatus === section._id ? () => setActiveStatus(''):() => setActiveStatus(section._id)}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800 rounded-t-lg"
            >
              <div className="font-medium">{section.sectionName}</div>
              <RiArrowUpWideFill className={`transform transition-transform ${
                activeStatus === section._id ? 'rotate-180' : 'rotate-0'
              }`} />
            </div>

            {/* Subsections */}
            {activeStatus === section._id && (
              <div className="border-t border-gray-700 p-2">
                {section.subSection.map((subSection) => (
                  <div
                    key={subSection._id}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSection._id}`
                      );
                      setVedioActiveBar(subSection._id);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                      videoActivebar === subSection._id
                        ? 'bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700 transition-colors duration-300 touch-none'
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(subSection._id)}
                      onChange={() => {}}
                      className="w-4 h-4 rounded border-gray-600"
                    />
                    <span className="text-sm">{subSection.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
  );
}

export default VideoSidbar;
