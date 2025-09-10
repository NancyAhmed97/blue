import React from 'react'
import "./SearchContainer.css"
import InputContainer from '../InputContainer/InputContainer'
function SearchContainer() {
  return (
    <div className='mb-5'>
                        <InputContainer placeholder={'المدينة أو الحي أو المنطقة'} />

    </div>
  )
}

export default SearchContainer