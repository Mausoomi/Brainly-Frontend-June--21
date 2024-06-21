// import { memo } from 'react'
// import { useDrop } from 'react-dnd'
// const style = {
//   // height: '12rem',
//   // width: '12rem',
//   // marginRight: '1.5rem',
//   // marginBottom: '1.5rem',
//   // color: 'white',
//   // padding: '1rem',
//   // textAlign: 'center',
//   // fontSize: '1rem',
//   // lineHeight: 'normal',
//   // float: 'left',
//   background: "#FFFFFF0F"
// }
// export const Dustbin = memo(function Dustbin({
//   accept,
//   onDrop,
//   text,
//   currentPage,
//   totalPages,
//   lastDroppedItem,
//   word,
//  meaning,
//  Antonyms,
//  Synonyms
// }) {
//   const [{ isOver, canDrop }, drop] = useDrop({
//     accept,
//     drop: onDrop,
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//       canDrop: monitor.canDrop(),

//     }),
//   })
//   const isActive = isOver && canDrop
//   let backgroundColor = '#FFFFFF0F'
//   if (isActive) {
//     backgroundColor = 'darkgreen'
//   } else if (canDrop) {
//     backgroundColor = 'darkkhaki'
//   }
//   return (

//     <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin" className='QuesCard'>


//         {lastDroppedItem ?
//           <div className='droppedItem'>
//             <div className='text-dropped h-[20%]'>
//               <div className='font-Inter flex items-center  text-[12px] font-medium'>
//               <p className='font-Inter dropWord'>{word}</p>
//               <p className=' justify-center'>(Noun)</p>
//                 </div>

//               <p className=' font-poppins dropMeaning'>{meaning}</p>

//             </div>
//             <div className='droppedImg  h-[50%]'>

//               <img src={lastDroppedItem} alt='box' style={{ width: "100%" }} />
//             </div>
//             <div className=' h-[10%]'>
//                 <p className='font-poppins font-normal Synonyms'>Synonyms: <span className='text-white'>hustle, free, joy, step forward</span></p>
//                 <p className='font-poppins font-normal  Antonyms'>Antonyms: <span className='text-white'>hustle, free, joy, step forward</span></p>
//               </div>
//           </div>
//           : <p className='questext'>{text}
//           </p>
//           }


//       {/* {lastDroppedItem && (
//         <>


//         </>
//       )} */}

//       {/* <p> {JSON.stringify(lastDroppedItem.)}</p> */}
//       {/* <div className='pageIndicater'>
//         <span>{currentPage}/{totalPages}</span>
//       </div> */}

//     </div>


//   )
// })



import { memo } from 'react'
import { useDrop } from 'react-dnd'
const style = {
  // height: '12rem',
  // width: '12rem',
  // marginRight: '1.5rem',
  // marginBottom: '1.5rem',
  // color: 'white',
  // padding: '1rem',
  // textAlign: 'center',
  // fontSize: '1rem',
  // lineHeight: 'normal',
  // float: 'left',
  background: "#FFFFFF0F"
}
export const Dustbin = memo(function Dustbin({
  accept,
  onDrop,
  text,
  currentPage,
  totalPages,
  lastDroppedItem,
  word,
  meaning,
  Antonyms,
  Synonyms,
  isMatched,
  matchedImg,
  Noun
}) 
{


  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),

    }),
  })
  const isActive = isOver && canDrop

  let backgroundColor = '#FFFFFF0F'

  if ( isActive) {
    // backgroundColor = 'darkgreen'
  } 
  else if (canDrop) {
    // backgroundColor = 'darkkhaki'
  }


  // console.log(lastDroppedItem , " ----------------------------------- dustbin");
  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor }}
      data-testid="dustbin"
      className="QuesCard"
    >
      <div className="droppedItem">
        <div className="text-dropped h-[20%]">
          <div className="font-Inter flex items-center  text-[12px] font-medium">
            <p className="font-Inter dropWord">{word}</p>
            <p className=" justify-center">{Noun}</p>
          </div>
          <p className=" font-poppins dropMeaning">{meaning}</p>
        </div>
        <div className="h-[70%]">
          <div className="droppedImg">
            {isMatched ? (
              <img
                src={`https://ik.imagekit.io/xhdikl4j8/${matchedImg}`}
                alt="box"
                className="imgLastDropped"
              />
            ) : lastDroppedItem ? (
              <img
                src={` https://ik.imagekit.io/xhdikl4j8/${lastDroppedItem}`}
                alt="box"
                className="imgLastDropped"
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className=" h-[10%]">
          <p className="font-poppins font-normal Synonyms">
            Synonyms: <span className="text-white">{Synonyms}</span>
          </p>
          <p className="font-poppins font-normal  Antonyms">
            Antonyms: <span className="text-white">{Antonyms}</span>
          </p>
        </div>
      </div>
      {/* : <p className='questext'>{text}
          </p> */}

      {/* {lastDroppedItem && (
        <>
        

        </>
      )} */}

      {/* {/ <p> {JSON.stringify(lastDroppedItem.)}</p> /} */}
    </div>
  );
})

