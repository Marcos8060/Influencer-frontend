import React from 'react'
import { Button } from 'primereact/button'
const ErrorButtonComponent = ({ label, ...props }) => {
  return (
    <div>
      <Button label={label} {...props} className='bg-red/80 text-white shadow-2xl font-light rounded px-8 py-3 text-xs w-full' />
    </div>
  )
}

export default ErrorButtonComponent
