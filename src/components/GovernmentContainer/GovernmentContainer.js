import React from 'react'
import "./GovernmentContainer.css"
function GovernmentContainer() {
  return (
    <Link to={`/neighborhood/${item?.name}`}>
    <div className='location_container mb-3'>
<div className='d-flex align-items-center mb-3'>
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="rgba(108, 107, 107, 1)" className="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
    <p className='mb-0 mx-1'>{item?.name}</p>

</div>
<img src={item?.image}alt=''className='w-100'/>
</div>
    </Link>
  )
}

export default GovernmentContainer