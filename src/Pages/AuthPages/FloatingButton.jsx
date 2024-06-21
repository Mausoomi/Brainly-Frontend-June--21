// // import "../../../Styles/FloatingButton.css";
// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";

// function FloatingButton() {
//   const [isTabOpen, setIsTabOpen] = useState(false);

//   const handleClick = () => {
//     setIsTabOpen(!isTabOpen);
//   };

//   const userId = "6656c6ec6ccf51e1f99a592d";
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companyName, setCompanyName] = useState("");

//   const [messages, setMessages] = useState([
//     { text: "Hello! How can I assist you today?", isUser: false },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const messagesEndRef = useRef(null);
//   const chatBotContainerRef = useRef(null);

//   const getImage = async () => {
//     console.log("getImage function called");
//     try {
//       const response = await axios.get(
//         `https://ai-backend-xoq0.onrender.com/image/${userId}`,
//         {}
//       );

//       const imageData = response.data.data; // Assuming your image API response structure
//       console.log(imageData);
//       setCompanyLogo(imageData.url);
//       setCompanyName(imageData.name);
//     } catch (error) {
//       console.error("Error fetching image:", error);
//     }
//   };

//   useEffect(() => {
//     console.log("useEffect triggered");
//     getImage();
//   }, []);

//   useEffect(() => {
//     if (isTabOpen) {
//       scrollToBottom();
//     }
//   }, [messages, isTabOpen]);

//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const sendMessage = async () => {
//     if (inputValue.trim() !== "") {
//       const userQuestion = inputValue.trim().toLowerCase();

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: userQuestion, isUser: true },
//       ]);

//       try {
//         const response = await axios.get(
//           `https://ai-backend-xoq0.onrender.com/search/${userId}?query=${userQuestion}`,
//           {}
//         );

//         const responseData = response.data;

//         if (responseData.answer) {
//           setMessages((prevMessages) => [
//             ...prevMessages,
//             { text: responseData.answer, isUser: false },
//           ]);
//         } else {
//           setShowForm(true);
//         }
//       } catch (error) {
//         console.error("Error fetching response from backend:", error);
//       }

//       setInputValue("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted", { userName, userEmail });
//     setShowForm(false);
//   };

//   return (
//     <div>
//       <button
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           width: "80px",
//           height: "80px",
//           padding: "12px",
//           backgroundColor: "#020a13",
//           color: "rgb(219, 185, 185)",
//           border: "7px solid #828282",
//           borderRadius: "50%",
//           boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           fontSize: "24px",
//           cursor: "pointer",
//           zIndex: 1000,
//           borderTopStyle: "dotted",
//           borderBottomStyle: "dotted",
//         }}
//         onClick={handleClick}
//       >
//         <img
//           src={"https://ik.imagekit.io/dev19/chat-icon-4_0QqljozYP.jpg"}
//           alt="Chat"
//         />
//       </button>
//       {isTabOpen && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "105px",
//             right: "65px",
//             width: "auto",
//             height: "auto",
//             backgroundColor: "transparent",
//             boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
//             zIndex: 999,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: "25px",
//           }}
//         >
//           <div>
//             <div>
//               <div ref={chatBotContainerRef}>
//                 <div
//                   style={{
//                     borderRadius: "25px 25px 0px 0px",
//                     backgroundColor: "#252525",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     padding: "10px 20px",
//                     borderLeft: "1px solid #828282",
//                     borderRight: "1px solid #828282",
//                     borderTop: "1px solid #828282",
//                   }}
//                 >
//                   <div>
//                     <img
//                       style={{
//                         width: "80px",
//                         height: "auto",
//                         borderRadius: "125px",
//                       }}
//                       src={companyLogo}
//                     />
//                   </div>
//                   <div
//                     style={{
//                       width: "100%",
//                       display: "flex",
//                       color: "white",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <h2>{companyName}</h2>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     padding: "25px",
//                     border: "1px solid #828282",
//                     backgroundColor: "#252525",
//                     padding: "25px",
//                     height: "40vh",
//                     overflow: "scroll",
//                     scrollbarWidth: "none",
//                     borderLeft: "1px solid #828282",
//                     BorderRight: "1px solid #828282",
//                   }}
//                 >
//                   {messages.map((message, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "flex-end",
//                         padding: "20px 0px",
//                         flexDirection: message.isUser ? "row" : "row-reverse",
//                       }}
//                     >
//                       <div
//                         style={{
//                           border: "1px solid #828282",
//                           borderRadius: "31px",
//                           backgroundColor: "#252525",
//                           color: "white",
//                           margin: "0 10px",
//                           padding: "10px 20px",
//                           fontSize: "16px",
//                         }}
//                       >
//                         <h3>{message.text}</h3>
//                       </div>
//                       <div>
//                         <img
//                           style={{ filter: "grayscale(1)" }}
//                           src={
//                             message.isUser
//                               ? "https://ik.imagekit.io/dev19/chat-bot-icon-2_3Em-YdU-d.png"
//                               : "https://ik.imagekit.io/dev19/chat-bot-icon-1_Y55JIso-j.png"
//                           }
//                           alt=""
//                         />
//                       </div>
//                     </div>
//                   ))}
//                   <div ref={messagesEndRef} />
//                 </div>
//                 <div
//                   style={{
//                     borderRadius: "0px 0px 0px 25px",
//                     borderLeft: "1px solid #828282",
//                     borderRight: "1px solid #828282",
//                     borderTop: "1px solid #828282",
//                     backgroundColor: "#252525",
//                   }}
//                   className="model-footer-s2"
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       padding: "5px 25px",
//                     }}
//                   >
//                     <input
//                       type="text"
//                       // className="chat-input"
//                       style={{
//                         width: "100%",
//                         height: "50px",
//                         padding: "15px",
//                         marginRight: "10px",
//                         color: "white",
//                         backgroundColor: "transparent",
//                       }}
//                       onFocus={(e) => (e.target.style.outline = "none")}
//                       onBlur={(e) => (e.target.style.outline = "none")}
//                       placeholder="Type your message..."
//                       value={inputValue}
//                       onChange={(e) => setInputValue(e.target.value)}
//                       onKeyPress={(e) => {
//                         if (e.key === "Enter") {
//                           sendMessage();
//                         }
//                       }}
//                     />
//                     <button
//                       style={{
//                         fontSize: "16px",
//                         width: "100%",
//                         maxWidth: "148px",
//                         height: "35px",
//                         background: "transparent",
//                         boxShadow: "none",
//                         outline: "none",
//                         border: "1px solid var(--border-color)",
//                         borderRadius: "35px",
//                         color: "white",
//                       }}
//                       className="dashboard-btn"
//                       onClick={sendMessage}
//                     >
//                       Send
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               {showForm && (
//                 <div className="form-container">
//                   <h3>
//                     We couldn't find an answer. Please provide your details
//                     below:
//                   </h3>
//                   <form onSubmit={handleSubmit}>
//                     <div>
//                       <label>Name:</label>
//                       <input
//                         type="text"
//                         value={userName}
//                         onChange={(e) => setUserName(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label>Email:</label>
//                       <input
//                         type="email"
//                         value={userEmail}
//                         onChange={(e) => setUserEmail(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <button type="submit">Submit</button>
//                   </form>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FloatingButton;
