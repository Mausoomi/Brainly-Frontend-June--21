import React from 'react'
import Heading from '../Components/Heading'
import ScienceTab from '../Components/ScienceStories/ScienceTab'

function SportsStories() {
    return (
        <div>
               <div  className='text-[42px] sm:pb-4 pd-0'>
                <Heading  whiteText="Sport Stories" />
            </div>
            <div className=" sm:pt-8 pt-0">
                <ScienceTab/>
            </div>
        </div> 
      )
}

export default SportsStories