import React from 'react'

const CustomizedTickBoxComponent = ({label, description}) => {
  return (
    <div className='bg-white border border-input cursor-pointer rounded px-4 py-2 space-y-1'>
      <p className='text-sm font-semibold'>{label}</p>
      <p className='text-gray text-xs'>{description}</p>
    </div>
  )
}

export default CustomizedTickBoxComponent
