import React from 'react'
import Buttons from './Home/Buttons';
import ModalBtn from './ModalBtn';
function ConfirmationModal({data}) {
  return (
    <div className="h-screen fixed left-0 top-0 z-50 w-full bg-black/10 backdrop-blur-md flex justify-center items-center">
  <div className="flex flex-col px-12 py-8 gap-4 border-[.4px] border-gray-800 bg-[#0e172f] rounded-xl">
    <div className="text-3xl text-gray-100 font-bold">{data.text1}</div>
    <p className="text-gray-400 text-sm">{data.text2}</p>

    <div className="flex gap-2">
      <ModalBtn
        text={data.btn1Text}
        onclick={data.btn1Handler}
        className="text-sm rounded-lg text-black bg-yellow-500"
      />
      <ModalBtn
        text={data.btn2Text}
        onclick={data.btn2Handler}
        className="text-sm rounded-lg text-gray-100 bg-gray-700"
      />
    </div>
  </div>
</div>

  )
}

export default ConfirmationModal;
