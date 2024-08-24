import React from 'react'
import { BsArrow90DegLeft } from 'react-icons/bs'

const ButtonBlack = ({destination='/  '}) => {
  return (
    <div className='flex'>
        <Link to={destination} className='bg bg-blue-600 text-white px-4 py-1 rounded-lg w-fit'>
        <BsArrow90DegLeft className='text-2xl'/>
        </Link>
      
    </div>
  )
}

export default ButtonBlack
