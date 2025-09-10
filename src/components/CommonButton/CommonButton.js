import React from 'react'
import "./CommonButton.css"
function CommonButton({text,handleFunction,loading}) {
  return (
        <button className={loading?'disable_common_button_container w-100':'common_button_container w-100'}onClick={handleFunction}disabled={loading}>
            {text}
        </button>
  )
}

export default CommonButton