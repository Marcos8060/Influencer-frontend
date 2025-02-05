import React from 'react'
import Link from 'next/link';
import { BsArrowLeft } from "react-icons/bs";


const BackComponent = ({ href }) => {
  return (
    <Link href={href} className='flex items-center gap-2 text-link'>
      <BsArrowLeft />
      <p>Go Back</p>
    </Link>
  )
}

export default BackComponent
