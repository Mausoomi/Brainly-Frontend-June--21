import React from 'react'
import "../Styles/heading.css"

function Heading({ blueText, whiteText }) {
    return (

        <div className="text-6xl font-black bg-clip-text bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)] leading-[83px] text-neutral-200 max-md:text-4xl  font-Nunito font-black hdFont">

            {/* The Lost City of <span className="text-neutral-200">Future Earth</span> */}
            <h1 >

               <span className="colorBlue">{blueText}</span> 
                <span className='colorWhite'> {whiteText}</span>
            </h1>

        </div>
        // <div className='hd-main'>
        //     <h1 >

        //         <span className="colorBlue">{blueText}</span>
        //         <span className='colorWhite'> {whiteText}</span>
        //     </h1>
        // </div>

    )
}

export default Heading