
import React from 'react'
import "./CustomInput.css"
const CustomInput = ({ placeholder, value, onChange, name, type = 'text', icon ,inputState}) => (
  <div className='input-wrapper'>
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      type={type}
    //   className='input-field form-control'
         className={inputState?"error_input_container input-field form-control":"input_container input-field form-control"}
    />
    {/* {icon && <span className='input-icon'>{icon}</span>} */}
  </div>
);


export default CustomInput