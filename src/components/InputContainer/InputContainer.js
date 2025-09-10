
import React from 'react'
import "./InputContainer.css"
const InputContainer = ({ placeholder, value, onChange, name, type = 'text', icon }) => (
  <div className='input-wrapper'>
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      type={type}
      className='input-field form-control'
    />
    {icon && <span className='input-icon'>{icon}</span>}
  </div>
);


export default InputContainer