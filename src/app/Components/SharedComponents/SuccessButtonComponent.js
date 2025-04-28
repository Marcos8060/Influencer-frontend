import React from 'react'
import { Button } from 'primereact/button'
const SuccessButtonComponent = ({ label, ...props }) => {
  return (
    <div>
      <Button label={label} {...props} className='bg-green text-white shadow-2xl font-light rounded px-8 py-3 text-xs w-full' />
    </div>
  )
}

export default SuccessButtonComponent
