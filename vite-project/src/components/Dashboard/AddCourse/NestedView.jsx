import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Trash2, Edit2, ChevronDown, PanelTopOpen, Plus} from 'lucide-react'
import { deleteSection, deleteSubSection } from '../../../services/section';
import { setCourse } from '../../../slices/course';
import SubSecModal from './SubSecModal';
function NestedView({handleEditSectionName}) {

    const dispatch = useDispatch();
    
    const {course} = useSelector( state=>state.course);
    const {token} = useSelector( state=>state.auth);
    
    // 3 flags, view, add n edit
    const [addSubsection, setAddSubSection] = useState(null);
    const [view, setView] = useState(null);
    const [edit, SetEdit] = useState(null);
    
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async(secId)=>{
        const result = await deleteSection(secId, token)
        // if(result){
        //     dispatch(setCourse(result))
        // }
        setConfirmationModal(null)
    }
    const handleDeleteSubSection = async(subSecId, secId)=>{
        const result = await deleteSubSection(subSecId, token)
        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }
  return (
    <div className='my-10'>
      <div className="rounded-lg bg-gray-500 p-10">
        {
            course?.courseContent?.map((section)=>(
                <details key={section._id} open>
                    <summary className='flex justify-between items-center border-b-2 border-black'>
                        <div className="">
                            <PanelTopOpen />
                            <p>{section.sectionName}</p>

                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleEditSectionName(section._id,section.sectionName)}>
                                <Edit2/>
                            </button>
                            <button
                                onClick={() => setConfirmationModal({
                                    text1:"Delete this Sectoin",
                                    text2:"All the lectures in this section will be deleted",
                                    btn1Text:"Delete",
                                    btn2Text:"Cancel",
                                    btn1Handler:()=>handleDeleteSection(section._id),
                                    btn2Handler:()=>setConfirmationModal(null)
                                })}>
                                <Trash2/>
                            </button>
                            <span>|</span>
                            <ChevronDown />
                        </div>
                    </summary>

                    <div className="">
                        {
                            section?.courseContent?.subSection((subSec)=>(
                                <div key={data?._id} className="">
                                    <div onClick={()=>setView(data)} className="">
                                        <PanelTopOpen />
                                        <p>{subSec.title}</p>
                                    </div>
                                    <div>
                                    <button
                                onClick={()=>SetEdit({...data,sectionId:section._id})}>
                                <Edit2/>
                            </button>
                            <button
                                onClick={() => setConfirmationModal({
                                    text1:"Delete this SubSectoin",
                                    text2:"All the lectures in this Subsection will be deleted",
                                    btn1Text:"Delete",
                                    btn2Text:"Cancel",
                                    btn1Handler:()=>handleDeleteSubSection(data._id,section._id),
                                    btn2Handler:()=>setConfirmationModal(null)
                                })}>
                                <Trash2/>
                            </button>
                                    </div>
                                </div>
                            ))
                        }
                        <button onClick={()=>setAddSubSection(section._id)}>
                            <Plus/>
                            Add Lecture
                        </button>
                    </div>
                </details>
            ))
        }


      </div>
      {
        addSubsection ? ( <SubSecModal modalData={addSubsection} setModalData={setAddSubSection} add={true}/> ) 
        : view ? ( <SubSecModal modalData={view} setModalData={setView} view={true}/> ) 
        : edit ? ( <SubSecModal modalData={edit} setModalData={SetEdit} edit={true}/> ) : ( <div></div> )

    }
    {
        confirmationModal && <confirmationModal modalData={confirmationModal} />
    }
    </div>
  )
}

export default NestedView;
