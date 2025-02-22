import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Edit, Edit2, Edit2Icon, PanelTopOpen} from 'lucide-react'
function NestedView() {

    const dispatch = useDispatch();
    
    const {course} = useSelector( state=>state.course);
    const {token} = useSelector( state=>state.auth);
    
    // 3 flags, view, add n edid
    const [addSubsection, setAddSubSection] = useState(null);
    const [view, setView] = useState(null);
    const [edit, SetEdit] = useState(null);
    
    const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <div className='my-10'>
      <div className="rounded-lg bg-gray-500 p-10">
        {
            course.courseContent?.map((section)=>(
                <details key={section._id} open>
                    <summary className='flex justify-between items-center'>
                        <div className="">
                            <PanelTopOpen />
                            <p>{section.sectionName}</p>

                        </div>
                        <div className="">
                            <button>
                                <Edit2/>
                            </button>
                        </div>
                    </summary>
                </details>
            ))
        }
      </div>
    </div>
  )
}

export default NestedView;
