import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Trash2, Edit2, ChevronDown, PanelTopOpen, Plus } from "lucide-react"
import { deleteSection, deleteSubSection } from "../../../services/section"
import { setCourse } from "../../../slices/course"
import SubSecModal from "./SubSecModal"
import ConfirmationModal from "../../ConfirmationModal"

function NestedView({ handleEditSectionName }) {
  const dispatch = useDispatch()
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)

  const [addSubsection, setAddSubSection] = useState(null)
  const [view, setView] = useState(null)
  const [edit, setEdit] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(sectionId, course._id, token)
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSecId, secId) => {
    const result = await deleteSubSection(subSecId, token)
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  return (
    <div className="my-10">
      <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open className="mb-4 border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
            <summary className="flex justify-between items-center cursor-pointer">
              <div className="flex items-center space-x-2">
                <PanelTopOpen className="text-gray-400" />
                <p className="text-lg font-medium text-white">{section.sectionName}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleEditSectionName(section._id, section.sectionName)
                  }}
                  className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setConfirmationModal({
                      text1: "Delete this Section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }}
                  className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </summary>

            <div className="mt-4 pl-6 space-y-2">
              {section?.courseContent?.subSection?.map((subSec) => (
                <div
                  key={subSec._id}
                  className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
                >
                  <div onClick={() => setView(subSec)} className="flex items-center space-x-2 cursor-pointer">
                    <PanelTopOpen className="w-4 h-4 text-gray-400" />
                    <p className="text-white">{subSec.title}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEdit({ ...subSec, sectionId: section._id })}
                      className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Subsection",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteSubSection(subSec._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                      className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setAddSubSection(section._id)}
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Lecture</span>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubsection && <SubSecModal modalData={addSubsection} setModalData={setAddSubSection} add={true} />}
      {view && <SubSecModal modalData={view} setModalData={setView} view={true} />}
      {edit && <SubSecModal modalData={edit} setModalData={setEdit} edit={true} />}
      {confirmationModal && <ConfirmationModal data={confirmationModal} />}
    </div>
  )
}

export default NestedView

