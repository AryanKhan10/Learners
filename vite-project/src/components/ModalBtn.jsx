import React from 'react'

function ModalBtn({
    text,
    onclick,
    className,
    type,
}) {
  return (
    <button type={type} className={`${className} font-semibold px-4 py-3 hover:scale-95 transition-all duration-200`} onClick={onclick}>
        {text}
    </button>
  )
}

export default ModalBtn
