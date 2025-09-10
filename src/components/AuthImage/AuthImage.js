import React from 'react'
import "./AuthImage.css"
function AuthImage({loginAuthImg}) {
  return (
    <div className='auth_img_container'>
        <img src={loginAuthImg}alt='auth_img'/>
    </div>
  )
}

export default AuthImage