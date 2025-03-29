import React, { useEffect, useState } from "react";
import { FaArrowDown, FaBackward } from "react-icons/fa";
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

  useEffect(() => {
    (() => {
      // if courseSectionData is not available, return
      if (!courseSectionData.length) return;

      // for hightlighting the active section and subsection using where we are currently on our UI
      const section = courseSectionData.findIndex(
        (section) => section._id === sectionId
      );
      const subSection = courseSectionData[section].subSection.findIndex(
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
    <div>
      {/* for button and heading */}
      <div>
        {/* for button */}
        <div>
          <button onClick={navigate(() => `/dashboard/enrolled-course`)}>
            <FaBackward />
            Back
          </button>
          <button onClick={() => setReviewModal(true)}>
            <MdReviews />
            Add Review
          </button>
        </div>
        {/* for headings */}
        <div>
          <p>{courseEntireData?.courseTitle}</p>
          <p>
            {completedLectures?.length}/ {totalNoOfLectures}
          </p>
        </div>
      </div>

      {/* for sections and subsec*/}
      <div>
        {courseSectionData.map((section, index) => (
          <div onClick={() => setActiveStatus(section._id)} key={section._id}>
            {/* sec  */}
            <div>
              <div>
                {section.sectionTitle}
                <FaArrowDown />
              </div>
            </div>
            {/* sub sec  */}
            <div>
              {activeStatus === section._id && (
                <div>
                  {section.subSection.map((subSection, index) => (
                    <div
                      className={`{videoActivebar === subSection._id ? 'active' : ''}`}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSection._id}`
                        );
                        setVedioActiveBar(subSection._id);
                      }}
                      key={subSection._id}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(subSection._id)}
                        onChange={() => {}}
                      />

                      <span>{subSection.subSectionTitle}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoSidbar;
