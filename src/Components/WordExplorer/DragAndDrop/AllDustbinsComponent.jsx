import React from "react";

function AllDustbinsComponent({ dustbins }) {
  // console.log(dustbins)
  return (
    <div className="all-dustbins-container">
      {/* {dustbins.map((dustbin, index) => (
        <div key={index} className="all-dustbin">

          <p>{dustbin.word}</p>
          {dustbin.lastDroppedItem && (
            <img src={dustbin.lastDroppedItem} alt={`Box dropped in Dustbin ${index + 1}`} />
          )}
        </div>
      ))} */}
      {dustbins.map((dustbin, index) => (
        <div key={index} className="all-dustbin">
          <div className="text-dropped h-[20%]">
            <div className="font-Inter flex items-center  text-[12px] font-medium">
              <p className="font-Inter dropWord">{dustbin.Storytitle}</p>
              <p className=" justify-center">{dustbin.Noun}</p>
            </div>

            <p className=" font-poppins dropMeaning">{dustbin.Storyttext}</p>
          </div>
          <div className="">
            <div className="droppedImg">
              <img
                src={`https://ik.imagekit.io/xhdikl4j8/${dustbin.Storyimage}`}
                alt={`Box dropped in Dustbin ${index + 1}`}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

          <div className=" h-[10%]">
            <p className="font-poppins font-normal Synonyms">
              Synonyms: <span className="text-white">{dustbin.Synonyms}</span>
            </p>
            <p className="font-poppins font-normal  Antonyms">
              Antonyms: <span className="text-white">{dustbin.Antonyms}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllDustbinsComponent;
