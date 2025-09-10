import React, { useState } from 'react'
import "./ForgetPasswordFormContainer.css"
import logo from "../../assets/images/Logo.png"
import InputContainer from '../InputContainer/InputContainer'
import google from '../../assets/images/Google - Original.svg'
import app from '../../assets/images/comp. socialmedia icons.svg'
import facebook from '../../assets/images/Facebook - Original.svg'
import { Link, useNavigate } from 'react-router-dom'
import CommonButton from '../CommonButton/CommonButton'
import axios from 'axios'
import { ApiUrl } from '../../Constant/apiUrl'
import { useDispatch } from 'react-redux'
import { setuserInfo } from '../../hooks/auth'
import { toast } from 'react-toastify'
function ForgetPasswordFormContainer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const [identifier, setIdentifier] = useState(null)
    const [loginStatus, setLoginStatus] = useState(false)
    const [password, setPassword] = useState(null)

    const socialMediaItems = [
        { id: 1, title: "تسجيل عبر جوجل", image: google },
        { id: 2, title: "تسجيل عبر فيسبوك", image: facebook },
        { id: 3, title: "تسجيل عبر آبل", image: app },


    ]
    const handleFunction = async (e) => {
        e.preventDefault();
            try {
                setLoading(true)

                const res = await axios.post(`${ApiUrl}/client/forgot-password`, {
                    email:identifier,

                });
                                setLoading(false)

                      navigate(`/code/${identifier}`)


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
نسيت كلمة السر
            </p>
<p>
    الرجاء إدخال المسجل  البريد الإلكتروني     لاستعادة كلمة المرور الخاصة بك.


</p>
            <form className='w-100'>
                <div>
                    <p className='label'>
                        البريد الإلكتروني 
                    </p>
                    <InputContainer placeholder={'اكتب البريد الإلكتروني أو رقم الهاتف'}

                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                </div>

                <div className='w-100 mt-4'>
                    <CommonButton
                        text={loginStatus ? 'تسجيل الدخول' : "التالي"}
                        handleFunction={handleFunction}
                        loading={loading}
                    /></div>
            </form>
        
      



        </div>
    )
}

export default ForgetPasswordFormContainer