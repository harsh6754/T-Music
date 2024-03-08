import React from 'react'
import { IoChevronDown } from 'react-icons/io5'

const FilterButtons = ({FilterData,flag}) => {
  return (
    <div className='border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400'>
       <p classNme="text-base tracking-wide text-textColor flex items-center gap-2">
           {flag}
           <IoChevronDown className={`text-base`}/>
       </p>
    </div>
  )
}

export default FilterButtons
