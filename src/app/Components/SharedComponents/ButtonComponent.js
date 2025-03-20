import React from 'react'
import { Button } from 'primereact/button'
const ButtonComponent = ({ label, ...props }) => {
  return (
    <div>
      <Button label={label} {...props} className='bg-gradient-to-r from-primary to-secondary text-white shadow-2xl rounded-3xl px-8 py-3 text-sm w-full' />
    </div>
  )
}

export default ButtonComponent
