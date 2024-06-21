import React from 'react'
import "../Styles/button.css"

function Button({btnText,onClickFunction}) {
  return (
    <div style={{width:"100%"}}>
        {/* <button className="justify-center px-12 py-6 border-violet-700 border-solid bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)] border-[3px] rounded-[1000px] max-md:px-5" >cfhgfg</button>
        */}
        {/* <div className="justify-center px-12 py-6 border-violet-700 border-solid bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)] border-[3px] rounded-[1000px] max-md:px-5">
          Sign In
        </div>  */}
        <button className='font- poppins font-semibold commonBtn' onClick={onClickFunction}>{btnText}</button>
        
    </div>
  )
}

export default Button