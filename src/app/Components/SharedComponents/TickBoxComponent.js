import React from 'react'

const TickBox = ({ label, ...props}) => {
  return (
    <div className='bg-white border border-input cursor-pointer rounded px-4 py-2 text-sm w-full'>
      {label}
    </div>
  )
}

export default TickBox
