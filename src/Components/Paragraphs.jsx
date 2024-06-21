import React from 'react'

function Paragraphs({ para }) {
  return (
    <div className="mt-8 font-medium tracking-normal text-zinc-300 max-md:max-w-full sm:text-left text-center font-poppins paraCommnFont text-[#DCDCDC] ">
      {para}
    </div>
  )
}

export default Paragraphs