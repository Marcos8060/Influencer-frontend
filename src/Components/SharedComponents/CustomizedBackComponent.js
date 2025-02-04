import React from 'react'
import Link from 'next/link';
import { BsArrowLeft } from "react-icons/bs";


const CustomizedBackButton = ({ onClick }) => {
  return (
    <div onClick={onClick} className='flex items-center gap-2 text-link cursor-pointer'>
      <BsArrowLeft />
      <p>Go Back</p>
    </div>
  )
}

export default  CustomizedBackButton
