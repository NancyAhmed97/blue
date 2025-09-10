// import React from 'react'
// import   './CustomBtn.css'
// function CustomBtn({ text,type,clickingFunction,customWidth }) {
//   return (
//     <div className={customWidth?"custom_btn_container border-0":"btn_container"}>
//     <button
//      className={customWidth?"custom_btn_text":"btn_text"} type={type}
//     onClick={clickingFunction}
//     >
//         {text}
//     </button>
// </div>
//   )
// }

// export default CustomBtn


import React from 'react'
import "./CustomBtn.css"
// function CustomBtn({text,handleFunction}) {
//   return (
//         <button className='common_button_container w-100'onClick={handleFunction}>
//             {text}
//         </button>
//   )
// }
// CustomBtn.js
function CustomBtn({ text, clickingFunction }) {
  return (
    <button className='common_button_container w-100' onClick={clickingFunction}>
      {text}
    </button>
  );
}

export default CustomBtn