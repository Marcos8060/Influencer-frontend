import React from 'react'
import { Button } from 'primereact/button'
const ButtonComponent = ({ label, ...props }) => {
  return (
    <div>
      <Button label={label} {...props} className='bg-secondary text-white shadow-2xl rounded px-8 py-3 text-sm w-full' />
    </div>
  )
}

export default ButtonComponent
