import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createFantasy,
  imageUpload,
} from "../../../store/Actions/adminActions";
import { useNavigate } from "react-router-dom";

const AdminADDFantasy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialStoryadvenure = {
    Storyimage: [],
    Paragraph: [],
  };

  const initialBrainquest = {
    Question: "",
    Option: ["", "", "", ""],
    Answer: "",
  };

  const initialWordexplore = {
    Storytitle: "",
    Storyttext: "",
    Storyimage: [],
    Storyitext: "",
    Synonyms:"",
    Antonyms:"",
    Noun:""
  };

  const [formData, setFormData] = useState({
    Title: "",
    Image: [],
    Status: "",
    Wordexplore: [initialWordexplore],
    Storyadvenure: {
      Storytitle: "",
      content: [initialStoryadvenure],
    },
    Brainquest: [initialBrainquest],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "Title") {
      setFormData((prevData) => ({
        ...prevData,
        Title: value,
      }));
    } else if (name.startsWith("Wordexplore")) {
      const [_, field] = name.split(".");
      const updatedWordexplore = formData.Wordexplore.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [field]: value,
          };
        }
        return item;
      });
      setFormData((prevData) => ({
        ...prevData,
        Wordexplore: updatedWordexplore,
      }));
    } else if (name === "Storyadvenure.Storytitle") {
      setFormData((prevData) => ({
        ...prevData,
        Storyadvenure: {
          ...prevData.Storyadvenure,
          Storytitle: value,
        },
      }));
    } else if (name.startsWith("Brainquest.Option")) {
      const [__, _, optionIndex] = name.split(".");
      if (optionIndex >= 0 && optionIndex < 4) {
        const updatedOptions = [...formData.Brainquest[index].Option];
        updatedOptions[optionIndex] = value;
        setFormData((prevData) => ({
          ...prevData,
          Brainquest: prevData.Brainquest.map((item, i) => {
            if (i === index) {
              return {
                ...item,
                Option: updatedOptions,
              };
            }
            return item;
          }),
        }));
      }
    } else if (name.startsWith("Brainquest")) {
      const updatedBrainquest = formData.Brainquest.map((item, i) => {
        const [_, field] = name.split(".");
        if (i === index) {
          return {
            ...item,
            [field]: value,
          };
        }
        return item;
      });
      setFormData((prevData) => ({
        ...prevData,
        Brainquest: updatedBrainquest,
      }));
    }
  };

  const handleParagraphChange = (e, storyIndex, pIndex) => {
    const { value } = e.target;
    const updatedFormData = { ...formData };
    updatedFormData.Storyadvenure.content[storyIndex].Paragraph[pIndex] = value;
    setFormData(updatedFormData);
  };

  const handleAddWordexplore = () => {
    setFormData((prevData) => ({
      ...prevData,
      Wordexplore: [...prevData.Wordexplore, initialWordexplore],
    }));
  };

  const handleRemoveWordexplore = (index) => {
    if (formData.Wordexplore.length > 1) {
      const updatedWordexplore = [...formData.Wordexplore];
      updatedWordexplore.splice(index, 1);
      setFormData((prevData) => ({
        ...prevData,
        Wordexplore: updatedWordexplore,
      }));
    }
  };

  const handleAddStoryadvenure = () => {
    const updatedFormData = { ...formData };
    updatedFormData.Storyadvenure.content.push(initialStoryadvenure);
    setFormData(updatedFormData);
  };

  const handleRemoveStoryadvenure = (index) => {
    if (formData.Storyadvenure.content.length > 1) {
      const updatedFormData = { ...formData };
      updatedFormData.Storyadvenure.content.splice(index, 1);
      setFormData(updatedFormData);
    }
  };

  const handleAddParagraph = (index) => {
    const updatedFormData = { ...formData };
    updatedFormData.Storyadvenure.content[index].Paragraph.push("");
    setFormData(updatedFormData);
  };

  const handleRemoveParagraph = (storyIndex, paragraphIndex) => {
    const updatedFormData = { ...formData };
    updatedFormData.Storyadvenure.content[storyIndex].Paragraph.splice(
      paragraphIndex,
      1
    );
    setFormData(updatedFormData);
  };

  const handleAddBrainquest = () => {
    setFormData((prevData) => ({
      ...prevData,
      Brainquest: [...prevData.Brainquest, initialBrainquest],
    }));
  };

  const handleRemoveBrainquest = (index) => {
    if (formData.Brainquest.length > 1) {
      const updatedBrainquest = [...formData.Brainquest];
      updatedBrainquest.splice(index, 1);
      setFormData((prevData) => ({
        ...prevData,
        Brainquest: updatedBrainquest,
      }));
    }
  };

  const handleFileUpload = async (event, index) => {
    const image = event.target.files[0];
    const fieldName = event.target.name;
    // console.log(fieldName);
    if (fieldName === "images") {
      const uploadResult = await dispatch(imageUpload(image));
      setFormData({
        ...formData,
        Image: formData.Image?.length
          ? [...formData.Image, uploadResult.payload]
          : [uploadResult.payload],
      });
    } else if (fieldName === `Wordexplore[${index}].Storyimage`) {
      const uploadResult = await dispatch(imageUpload(image));
      const updatedWordexplore = [...formData.Wordexplore];
      if (updatedWordexplore[index]) {
        updatedWordexplore[index] = {
          ...updatedWordexplore[index],
          Storyimage: updatedWordexplore[index].Storyimage?.length
            ? [...updatedWordexplore[index].Storyimage, uploadResult.payload]
            : [uploadResult.payload],
        };
        setFormData((prevData) => ({
          ...prevData,
          Wordexplore: updatedWordexplore,
        }));
      } else {
        console.error("Invalid index:", index);
      }
    } else if (fieldName === `Storyadvenure.content[${index}].Storyimage`) {
      const uploadResult = await dispatch(imageUpload(image));
      const updatedStoryadvenure = [...formData.Storyadvenure.content];
      if (updatedStoryadvenure[index]) {
        updatedStoryadvenure[index] = {
          ...updatedStoryadvenure[index],
          Storyimage: updatedStoryadvenure[index].Storyimage?.length
            ? [...updatedStoryadvenure[index].Storyimage, uploadResult.payload]
            : [uploadResult.payload],
        };
        setFormData((prevData) => ({
          ...prevData,
          Storyadvenure: {
            ...prevData.Storyadvenure,
            content: updatedStoryadvenure,
          },
        }));
      } else {
        console.error("Invalid index:", index);
      }
    }
  };

  const handleImageRemoval = async (val, index, field) => {
    // console.log(field);
    if (field === "Image") {
      const filteredImages = formData.Image.filter((img, i) => i !== index);
      setFormData((prevData) => ({
        ...prevData,
        Image: filteredImages,
      }));
    } else if (field === `Wordexplore[${index}].Storyimage`) {
      const updatedWordexplore = [...formData.Wordexplore];
      updatedWordexplore[index] = {
        ...updatedWordexplore[index],
        Storyimage: updatedWordexplore[index].Storyimage.filter(
          (img) => img !== val
        ),
      };
      setFormData((prevData) => ({
        ...prevData,
        Wordexplore: updatedWordexplore,
      }));
    } else if (field === `Storyadvenure.content[${index}].Storyimage`) {
      const updatedStoryadvenure = [...formData.Storyadvenure.content];
      updatedStoryadvenure[index] = {
        ...updatedStoryadvenure[index],
        Storyimage: updatedStoryadvenure[index].Storyimage.filter(
          (img) => img !== val
        ),
      };
      setFormData((prevData) => ({
        ...prevData,
        Storyadvenure: {
          ...prevData.Storyadvenure,
          content: updatedStoryadvenure,
        },
      }));
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(createFantasy(formData));
    setFormData({
      Title: "",
      Image: [],
      Status: "",
      Wordexplore: [initialWordexplore],
      Storyadvenure: {
        Storytitle: "",
        content: [initialStoryadvenure],
      },
      Brainquest: [initialBrainquest],
    });
    navigate("/Admin/Admin-Fantasy");
  };

  return (
    // <div className=" w-full h-100 p-2 overflowdiv">
    //   <form className="w-100  mt-3 p-2" method="post" onSubmit={HandleSubmit}>
    //     <div className="Addteacherimage_box">
    //       {formData.Image?.map((md, index) => {
    //         return (
    //           <div
    //             className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2 "
    //             key={index}
    //           >

    //               <img
    //                 className="w-100 active"
    //                 src={"https://ik.imagekit.io/dev24/" + md}
    //                 alt={md}
    //               />

    //             <span
    //               className="badge bg-danger badge-pill badge-round ml-1"
    //               style={{ cursor: "pointer" }}
    //               onClick={() => handleImageRemoval(md, index, "Image")}
    //             >
    //               Delete
    //             </span>
    //           </div>
    //         );
    //       })}
    //     </div>
    //     {/* Image input Links */}
    //     {formData.Image?.length < 10 && (
    //       <div className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2">
    //         <div className="card-body">
    //           <p style={{ fontSize: "12px" }} className="card-text">
    //             Select image file to upload on the cover of the fanstasy.
    //           </p>
    //           <input
    //             className="form-control"
    //             encType="multipart/form-data"
    //             type="file"
    //             name="images"
    //             id="formFile"
    //             onChange={handleFileUpload}
    //           />
    //         </div>
    //       </div>
    //     )}

    //     <div className="d-flex w-100 bg-light justify-content-between mt-2">
    //       <input
    //         type="text"
    //         className="form-control w-25"
    //         id="Title"
    //         name="Title"
    //         placeholder="Title"
    //         value={formData.Title}
    //         onChange={handleChange}
    //         required
    //       />
    //       <div className="form-control w-25">
    //         <label htmlFor="Status">Select Status</label> &nbsp;&nbsp;
    //         <select
    //           name="Status"
    //           value={formData.Status}
    //           onChange={(e) =>
    //             setFormData((prevData) => ({
    //               ...prevData,
    //               Status: e.target.value,
    //             }))
    //           }
    //         >
    //           <option value="">Select Status</option>
    //           <option key="New" value={"New"}>
    //             New
    //           </option>
    //           <option key="Completed" value={"Completed"}>
    //             Completed
    //           </option>
    //           <option key="In Progress" value={"In Progress"}>
    //             In Progress
    //           </option>
    //         </select>
    //       </div>
    //     </div>
    //     {/* ---------------------------------------------------------------------------------------------------  Wordexplore  ------------------------------------ */}
    //     <h6 className="text-start mt-2 p-1">Wordexplore</h6>
    //     {formData.Wordexplore.map((wordexplore, index) => (
    //       <div className="mt-2" key={index}>
    //         <div className="Addteacherimage_box">
    //           {wordexplore.Storyimage?.map((md, imgIndex) => (
    //             <div
    //               className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2 "
    //               key={imgIndex}
    //             >

    //                 <img
    //                   className="w-100 active"
    //                   src={"https://ik.imagekit.io/dev24/" + md}
    //                   alt={md}
    //                 />

    //               <span
    //                 className="badge bg-danger badge-pill badge-round ml-1"
    //                 style={{ cursor: "pointer" }}
    //                 onClick={() =>
    //                   handleImageRemoval(
    //                     md,
    //                     index,
    //                     `Wordexplore[${index}].Storyimage`
    //                   )
    //                 }
    //               >
    //                 Delete
    //               </span>
    //             </div>
    //           ))}
    //         </div>
    //         {/* Image input Links */}
    //         {wordexplore.Storyimage?.length < 10 && (
    //           <div className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2">
    //             <div className="card-body">
    //               <p style={{ fontSize: "12px" }} className="card-text">
    //                 Select image file to upload on the Wordexplore Storyimage.
    //               </p>
    //               {/* Basic file uploader */}
    //               <input
    //                 className="form-control"
    //                 encType="multipart/form-data"
    //                 type="file"
    //                 name={`Wordexplore[${index}].Storyimage`}
    //                 onChange={(e) => handleFileUpload(e, index)}
    //               />
    //             </div>
    //           </div>
    //         )}
    //         <div className="d-flex w-100 bg-light justify-content-between mt-2">
    //           <input
    //             type="text"
    //             className="form-control w-25"
    //             name={`Wordexplore.Storytitle`}
    //             placeholder="Storytitle"
    //             value={formData.Wordexplore.Storytitle}
    //             onChange={(e) => handleChange(e, index)}
    //             required
    //           />
    //           <input
    //             type="text"
    //             className="form-control w-25 "
    //             id="Storyttext"
    //             name="Wordexplore.Storyttext" // Changed from 'Storytitle' to 'Wordexplore.Storytitle'
    //             placeholder="Storyttext"
    //             value={formData.Wordexplore.Storyttext}
    //             onChange={(e) => handleChange(e, index)}
    //             required
    //           />
    //           <input
    //             type="text"
    //             className="form-control w-25 "
    //             id="Storyitext"
    //             name="Wordexplore.Storyitext" // Changed from 'Storytitle' to 'Wordexplore.Storytitle'
    //             placeholder="Storyitext"
    //             value={formData.Wordexplore.Storyitext}
    //             onChange={(e) => handleChange(e, index)}
    //             required
    //           />
    //           {/* Delete button for removing the Wordexplore field */}
    //           {index !== 0 && ( // Only render if not the first Wordexplore field
    //             <button
    //               className="btn btn-outline-danger initialpadding"
    //               onClick={() => handleRemoveWordexplore(index)}
    //             >
    //               Delete Wordexplore
    //             </button>
    //           )}
    //         </div>
    //         {index === formData.Wordexplore.length - 1 && (
    //           <button
    //             className="btn btn-outline-primary mt-2 initialpadding"
    //             onClick={handleAddWordexplore}
    //           >
    //             Add More Wordexplore
    //           </button>
    //         )}
    //       </div>
    //     ))}
    //     {/* ---------------------------------------------------------------------------------------------------  Storyadvenure  ------------------------------------ */}
    //     <h6 className="text-start mt-2 p-1">Storyadvenure</h6>
    //     <div className="d-flex w-100 bg-light justify-content-between mt-2">
    //       <input
    //         type="text"
    //         className="form-control w-25"
    //         id="Storyadvenure.Storytitle"
    //         name="Storyadvenure.Storytitle"
    //         placeholder="Storytitle of the Storyadvenure"
    //         value={formData.Storyadvenure.Storytitle}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     {formData.Storyadvenure.content.map((storyadvenure, index) => (
    //       <div className="mt-2" key={index}>
    //         <div className="Addteacherimage_box">
    //           {storyadvenure?.Storyimage?.map((md, imgIndex) => (
    //             <div
    //               className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2 "
    //               key={imgIndex}
    //             >

    //                 <img
    //                   className="w-100 active"
    //                   src={"https://ik.imagekit.io/dev24/" + md}
    //                   alt={md}
    //                 />

    //               <span
    //                 className="badge bg-danger badge-pill badge-round ml-1"
    //                 style={{ cursor: "pointer" }}
    //                 onClick={() =>
    //                   handleImageRemoval(
    //                     md,
    //                     index,
    //                     `Storyadvenure.content[${index}].Storyimage`
    //                   )
    //                 }
    //               >
    //                 Delete
    //               </span>
    //             </div>
    //           ))}
    //         </div>
    //         {storyadvenure?.Storyimage?.length < 10 && (
    //           <div className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2">
    //             <div className="card-body">
    //               <p style={{ fontSize: "12px" }} className="card-text">
    //                 Select image file to upload on the Storyadvenure content
    //                 Storyimage.
    //               </p>
    //               <input
    //                 className="form-control"
    //                 encType="multipart/form-data"
    //                 type="file"
    //                 name={`Storyadvenure.content[${index}].Storyimage`}
    //                 onChange={(e) => handleFileUpload(e, index)}
    //               />
    //             </div>
    //           </div>
    //         )}
    //         {storyadvenure.Paragraph.map((paragraph, pIndex) => (
    //           <div
    //             className="d-flex w-100 bg-light justify-content-between mt-2"
    //             key={pIndex}
    //           >
    //             <input
    //               type="text"
    //               className="form-control w-25 "
    //               placeholder="Paragraph"
    //               value={paragraph}
    //               onChange={(e) => handleParagraphChange(e, index, pIndex)}
    //               required
    //             />
    //             {pIndex !== 0 && (
    //               <button
    //                 className="btn btn-outline-danger initialpadding"
    //                 onClick={() => handleRemoveParagraph(index, pIndex)}
    //               >
    //                 Delete Paragraph
    //               </button>
    //             )}
    //           </div>
    //         ))}
    //         <button
    //           className="btn btn-outline-primary mt-2 initialpadding"
    //           onClick={() => handleAddParagraph(index)}
    //         >
    //           Add More Paragraph
    //         </button>
    //         {index !== 0 && (
    //           <button
    //             className="btn btn-outline-danger initialpadding mt-2"
    //             onClick={() => handleRemoveStoryadvenure(index)}
    //           >
    //             Delete Wordexplore
    //           </button>
    //         )}
    //         {index === formData.Storyadvenure.content.length - 1 && (
    //           <button
    //             className="btn btn-outline-primary mt-2 initialpadding"
    //             onClick={handleAddStoryadvenure}
    //           >
    //             Add More Storyadvenure
    //           </button>
    //         )}
    //       </div>
    //     ))}
    //     {/* ---------------------------------------------------------------------------------------------------  Wordexplore  ------------------------------------ */}
    //     <h6 className="text-start mt-2 p-1">Brainquest</h6>
    //     {formData.Brainquest.map((brainquest, index) => (
    //       <div className="mt-2" key={index}>
    //         <input
    //           type="text"
    //           className="form-control w-25"
    //           id="Question"
    //           name="Brainquest.Question"
    //           placeholder="Question"
    //           value={formData.Brainquest.Question}
    //           onChange={(e) => handleChange(e, index)}
    //           required
    //         />
    //         <div className="d-flex w-100 bg-light justify-content-between mt-2">
    //           {formData.Brainquest[index].Option.map((option, optionIndex) => (
    //             <input
    //               type="text"
    //               className="form-control w-25 "
    //               id={`Brainquest.Option.${optionIndex}`}
    //               name={`Brainquest.Option.${optionIndex}`}
    //               placeholder="Option"
    //               value={option}
    //               onChange={(e) => handleChange(e, index)}
    //               required
    //             />
    //           ))}
    //         </div>
    //         <input
    //           type="text"
    //           className="form-control w-25 "
    //           id="Answer"
    //           name="Brainquest.Answer" // Changed from 'Storytitle' to 'Wordexplore.Storytitle'
    //           placeholder="Answer"
    //           value={formData.Brainquest.Answer}
    //           onChange={(e) => handleChange(e, index)}
    //           required
    //         />
    //         {/* Delete button for removing the Wordexplore field */}
    //         {index !== 0 && ( // Only render if not the first Wordexplore field
    //           <button
    //             className="btn btn-outline-danger initialpadding"
    //             onClick={() => handleRemoveBrainquest(index)}
    //           >
    //             Delete Brainquest
    //           </button>
    //         )}
    //         {index === formData.Brainquest.length - 1 && (
    //           <button
    //             className="btn btn-outline-primary mt-2 initialpadding"
    //             onClick={handleAddBrainquest}
    //           >
    //             Add More Brainquest
    //           </button>
    //         )}
    //       </div>
    //     ))}
    //     <button type="submit" className="btn btn-outline-success mt-4">
    //       Submit the Fantasy
    //     </button>
    //   </form>
    // </div>

    <div className="w-full h-100 p-2 overflow-y-auto">
      <form className="w-full mt-3 p-2" method="post" onSubmit={HandleSubmit}>
        <div className="flex flex-wrap -mx-2">
          {formData.Image?.map((md, index) => {
            return (
              <div
                className="w-full sm:w-1/2 lg:w-1/4 px-2 mt-2 mb-2"
                key={index}
              >
                <img
                  className="w-full active"
                  src={"https://ik.imagekit.io/xhdikl4j8/" + md}
                  alt={md}
                />
                <span
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 cursor-pointer"
                  onClick={() => handleImageRemoval(md, index, "Image")}
                >
                  Delete
                </span>
              </div>
            );
          })}
        </div>
        {/* Image input Links */}
        {formData.Image?.length < 10 && (
          <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mt-2 mb-2">
            <div className="card-body">
              <p className="text-sm">
                Select image file to upload on the cover of the fantasy.
              </p>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                encType="multipart/form-data"
                type="file"
                name="images"
                id="formFile"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        )}

        <div className="flex w-full bg-gray-200 justify-between items-center mt-2">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4"
            id="Title"
            name="Title"
            placeholder="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />
          <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4">
            <label htmlFor="Status">Select Status</label>
            <select
              name="Status"
              value={formData.Status}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  Status: e.target.value,
                }))
              }
            >
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
        </div>
        {/* Wordexplore */}
        <h6 className="text-start mt-2 p-1">Wordexplore</h6>
        {formData.Wordexplore.map((wordexplore, index) => (
          <div className="mt-2" key={index}>
            <div className="flex flex-wrap -mx-2">
              {wordexplore.Storyimage?.map((md, imgIndex) => (
                <div
                  className="w-full sm:w-1/2 lg:w-1/4 px-2 mt-2 mb-2"
                  key={imgIndex}
                >
                  <img
                    className="w-full active"
                    src={"https://ik.imagekit.io/xhdikl4j8/" + md}
                    alt={md}
                  />
                  <span
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 cursor-pointer"
                    onClick={() =>
                      handleImageRemoval(
                        md,
                        index,
                        `Wordexplore[${index}].Storyimage`
                      )
                    }
                  >
                    Delete
                  </span>
                </div>
              ))}
            </div>
            {/* Image input Links */}
            {wordexplore.Storyimage?.length < 10 && (
              <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mt-2 mb-2">
                <div className="card-body">
                  <p className="text-sm">
                    Select image file to upload on the Wordexplore Storyimage.
                  </p>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    encType="multipart/form-data"
                    type="file"
                    name={`Wordexplore[${index}].Storyimage`}
                    onChange={(e) => handleFileUpload(e, index)}
                  />
                </div>
              </div>
            )}
            <div className="flex w-full bg-gray-200 justify-between items-center mt-2">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4"
                name={`Wordexplore[${index}].Storytitle`}
                placeholder="Storytitle"
                value={formData.Wordexplore.Storytitle}
                onChange={(e) => handleChange(e, index)}
                required
              />
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4"
                id="Storyttext"
                name="Wordexplore.Storyttext"
                placeholder="Storyttext"
                value={formData.Wordexplore.Storyttext}
                onChange={(e) => handleChange(e, index)}
                required
              />
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4"
                id="Storyitext"
                name="Wordexplore.Storyitext"
                placeholder="Storyitext"
                value={formData.Wordexplore.Storyitext}
                onChange={(e) => handleChange(e, index)}
                required
              />
              {/* Synonyms */}
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4"
                id="Synonyms"
                name="Wordexplore.Synonyms"
                placeholder="Synonyms"
                value={formData.Wordexplore.Synonyms}
                onChange={(e) => handleChange(e, index)}
                required
              />
              {/* Antonyms */}
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4"
                id="Antonyms"
                name="Wordexplore.Antonyms"
                placeholder="Antonyms"
                value={formData.Wordexplore.Antonyms}
                onChange={(e) => handleChange(e, index)}
                required
              />
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4"
                name="Wordexplore.Noun"
                placeholder="Noun"
                value={formData.Wordexplore.Noun}
                onChange={(e) => handleChange(e, index)}
                required
              />
              {/* Delete button for removing the Wordexplore field */}
              {index !== 0 && (
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded initialpadding"
                  onClick={() => handleRemoveWordexplore(index)}
                >
                  Delete Wordexplore
                </button>
              )}
            </div>
            {index === formData.Wordexplore.length - 1 && (
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-2 initialpadding"
                onClick={handleAddWordexplore}
              >
                Add More Wordexplore
              </button>
            )}
          </div>
        ))}
        {/* Storyadvenure */}
        <h6 className="text-start mt-2 p-1">Storyadventure</h6>
        <div className="flex w-full bg-gray-200 justify-between items-center mt-2">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4"
            id="Storyadvenure.Storytitle"
            name="Storyadvenure.Storytitle"
            placeholder="Storytitle of the Storyadvenure"
            value={formData.Storyadvenure.Storytitle}
            onChange={handleChange}
            required
          />
        </div>
        {formData.Storyadvenure.content.map((storyadvenure, index) => (
          <div className="mt-2" key={index}>
            <div className="flex flex-wrap -mx-2">
              {storyadvenure?.Storyimage?.map((md, imgIndex) => (
                <div
                  className="w-full sm:w-1/2 lg:w-1/4 px-2 mt-2 mb-2"
                  key={imgIndex}
                >
                  <img
                    className="w-full active"
                    src={"https://ik.imagekit.io/xhdikl4j8/" + md}
                    alt={md}
                  />
                  <span
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 cursor-pointer"
                    onClick={() =>
                      handleImageRemoval(
                        md,
                        index,
                        `Storyadvenure.content[${index}].Storyimage`
                      )
                    }
                  >
                    Delete
                  </span>
                </div>
              ))}
            </div>
            {storyadvenure?.Storyimage?.length < 10 && (
              <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mt-2 mb-2">
                <div className="card-body">
                  <p className="text-sm">
                    Select image file to upload on the Storyadvenure content
                    Storyimage.
                  </p>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    encType="multipart/form-data"
                    type="file"
                    name={`Storyadvenure.content[${index}].Storyimage`}
                    onChange={(e) => handleFileUpload(e, index)}
                  />
                </div>
              </div>
            )}
            {storyadvenure.Paragraph.map((paragraph, pIndex) => (
              <div
                className="flex w-full bg-gray-200 justify-between items-center mt-2"
                key={pIndex}
              >
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4"
                  placeholder="Paragraph"
                  value={paragraph}
                  onChange={(e) => handleParagraphChange(e, index, pIndex)}
                  required
                />
                {pIndex !== 0 && (
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded initialpadding"
                    onClick={() => handleRemoveParagraph(index, pIndex)}
                  >
                    Delete Paragraph
                  </button>
                )}
              </div>
            ))}
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-2 initialpadding"
              onClick={() => handleAddParagraph(index)}
            >
              Add More Paragraph
            </button>
            {index !== 0 && (
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 mx-0.5 hover:border-blue-500 rounded initialpadding mt-2"
                onClick={() => handleRemoveStoryadvenure(index)}
              >
                Delete Storyadvenure
              </button>
            )}
            {index === formData.Storyadvenure.content.length - 1 && (
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-2 initialpadding"
                onClick={handleAddStoryadvenure}
              >
                Add More Storyadvenure
              </button>
            )}
          </div>
        ))}
        {/* Brainquest */}
        <h6 className="text-start mt-2 p-1">Brainquest</h6>
        {formData.Brainquest.map((brainquest, index) => (
          <div className="mt-2" key={index}>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4"
              id="Question"
              name="Brainquest.Question"
              placeholder="Question"
              value={formData.Brainquest.Question}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <div className="flex w-full bg-gray-200 justify-between items-center mt-2">
              {formData.Brainquest[index].Option.map((option, optionIndex) => (
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4"
                  id={`Brainquest.Option.${optionIndex}`}
                  name={`Brainquest.Option.${optionIndex}`}
                  placeholder="Option"
                  value={option}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              ))}
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4"
              id="Answer"
              name="Brainquest.Answer"
              placeholder="Answer"
              value={formData.Brainquest.Answer}
              onChange={(e) => handleChange(e, index)}
              required
            />
            {/* Delete button for removing the Wordexplore field */}
            {index !== 0 && (
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded initialpadding"
                onClick={() => handleRemoveBrainquest(index)}
              >
                Delete Brainquest
              </button>
            )}
            {index === formData.Brainquest.length - 1 && (
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-2 mx-0.5 initialpadding"
                onClick={handleAddBrainquest}
              >
                Add More Brainquest
              </button>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
        >
          Submit the Fantasy
        </button>
      </form>
    </div>
  );
};

export default AdminADDFantasy;
