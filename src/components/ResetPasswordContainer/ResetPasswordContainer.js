import React, { useState } from 'react'
import logo from "../../assets/images/Logo.png"
import InputContainer from '../InputContainer/InputContainer'
import google from '../../assets/images/Google - Original.svg'
import app from '../../assets/images/comp. socialmedia icons.svg'
import facebook from '../../assets/images/Facebook - Original.svg'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import CommonButton from '../CommonButton/CommonButton'
import axios from 'axios'
import { ApiUrl } from '../../Constant/apiUrl'
import { useDispatch } from 'react-redux'
import { setuserInfo } from '../../hooks/auth'
import { toast } from 'react-toastify'
import "./ResetPasswordContainer.css"
function ResetPasswordContainer() {
        const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
    const [identifier, setIdentifier] = useState(null)
    const [loginStatus, setLoginStatus] = useState(false)
    const [password, setPassword] = useState(null)
    const [password_confirmation, setPassword_confirmation] = useState(null)

    const socialMediaItems = [
        { id: 1, title: "تسجيل عبر جوجل", image: google },
        { id: 2, title: "تسجيل عبر فيسبوك", image: facebook },
        { id: 3, title: "تسجيل عبر آبل", image: app },


    ]
    const handleFunction = async (e) => {
        e.preventDefault();
            try {
                setLoading(true)

                const res = await axios.post(`${ApiUrl}/client/reset-password`, {
                    email:email,
                    password:password,
                    password_confirmation:password_confirmation,
                    token:token

                });
                                setLoading(false)

                      navigate(`/Login`)


            } catch (err) {
                setLoading(false)

                if (err?.status == 307) {
                    navigate('/code')
                }

            }
    }

  return (
        <div className='login_form_Container'>
            <img src={logo} alt='logo' className='logo' />
            <p className='title'>
اعادة كلمة السر
            </p>
<p>
 الرجاء إدخال      كلمة المرور الجديدة .


</p>
            <form className='w-100'>
                <div>
                    <p className='label'>
                        كلمة المرور الجديدة 
                    </p>
                    <InputContainer placeholder={'اكتب كلمة المرور الجديدة'}

                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='mt-3'>
                    <p className='label'>
                        اعادة كلمة المرور الجديدة
                    </p>
                    <InputContainer placeholder={'اكتب كلمة المرور الجديدة'}

                        value={password_confirmation}
                        onChange={(e) => setPassword_confirmation(e.target.value)}
                    />
                </div>

                <div className='w-100 mt-4'>
                    <CommonButton
                        text={loginStatus ? 'تسجيل الدخول' : "تغيير"}
                        handleFunction={handleFunction}
                        loading={loading}
                    /></div>
            </form>
        
      



        </div>  )
}

export default ResetPasswordContainer