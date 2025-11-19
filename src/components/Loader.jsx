import React from 'react'

const Loader = ({prop}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='loader flex items-center justify-center w-[100px] h-[100px] gap-[6px]'>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      </div>
      <p>Loading {prop}...</p>
    </div>
  )
}

export default Loader