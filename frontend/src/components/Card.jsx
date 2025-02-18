import { motion } from 'framer-motion';
import React, { useState } from 'react';
import BlobButton from './BlobButton';
// const Card = () => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleClick = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className={`card ${isExpanded ? 'expanded' : ''}`} onClick={handleClick}>
//       <div className="card-content">
//         <h2>Card Title</h2>
//         <p>This is some content inside the card.</p>
//       </div>
//     </div>
//   );
// };

export default function Card({title,_id,setNotes,path ,count ,setCount}) {
    const roundButtonStyles = {
        borderRadius: "50%", // Make the 3rd button round
        width: "53px",
        height: "53px", // Ensure it's a perfect circle
        fontSize: "18px", // Optional: Increase font size to fit well
        // display: "flex", // To use flexbox for centering
        justifyText: "center", 
        alignText: "center",
      };
    return (
      <div className="App">
        <motion.div
          
          transition={{ layout: { duration: 1, type: "spring" } }}
          layout
          className="card"
        >
          <motion.h2 layout="position">
            <div className='card-layout'><span>{title}</span>
            <div className='buttons-pair'>
              
               {(path!=="bin") && 
                <BlobButton label="✎ Edit" _id={_id} action="edit" />} 

            <BlobButton label="👀 View" _id={_id} action="view"/>
            {(path==="bin") && 
                <BlobButton label="🗘" _id={_id} action="restore" style={roundButtonStyles} count={count} setCount={setCount}/>}
            <BlobButton label="🗑️" style={roundButtonStyles}_id={_id} action="delete"count={count} setCount={setCount}/>
            </div>
            </div>
            
            </motion.h2>
  
         
        </motion.div>
      </div>
    );
  }