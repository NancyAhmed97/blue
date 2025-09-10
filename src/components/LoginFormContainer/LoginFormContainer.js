import React, { useState } from 'react'
import "./LoginFormContainer.css"
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
function LoginFormContainer() {
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
        if (loginStatus) {
            try {
                setLoading(true)

                const res = await axios.post(`${ApiUrl}/client/auth/login
`, {
                    identifier,
                    password

                });

                setLoading(false)

                dispatch(setuserInfo({
                    access_token: res.data.data.access_token,
                    user: res.data.data.user,
                }));
                navigate("/");
            } catch (err) {
                setLoading(false)

                if (err?.status == 307) {
                      navigate(`/code/${identifier}`)
                }

            }
        } else {
            try {
                setLoading(true)
                const res = await axios.post(`${ApiUrl}/client/auth/check-exist
`, {
                    identifier
                });

                if (res.data.status) {
                    setLoading(false)

                    setLoginStatus(true)
                } else {
                    setLoading(false)

                    navigate('/signup')
                }
            } catch (err) {
                setLoading(false)

                toast.error(Object.values(err.response.data.errors)[0][0], {
                    position: "bottom-right",
                    autoClose: 3000,
                });
            }
        }
    }
    return (
        <div className='login_form_Container'>
            <img src={logo} alt='logo' className='logo' />
            <p className='title'>
                تسجيل الدخول / إنشاء حساب
            </p>

            <form className='w-100'>
                <div>
                    <p className='label'>
                        البريد الإلكتروني أو رقم الهاتف
                    </p>
                    <InputContainer placeholder={'اكتب البريد الإلكتروني أو رقم الهاتف'}

                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                </div>
                {loginStatus &&
                    <div>
                        <p className='label'>
                            كلمة المرور
                        </p>
                        <InputContainer placeholder={'كلمة المرور'}

                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                }
                <div className='my-2 mb-3 w-100 forget_password_container'>
                    <Link to="/forgetPassword">
                        <p className='mb-0 text-end '>نسيت كلمة المرور ؟</p>

                    </Link>
                </div>
                <div className='w-100'>
                    <CommonButton
                        text={loginStatus ? 'تسجيل الدخول' : "التالي"}
                        handleFunction={handleFunction}
                        loading={loading}
                    /></div>
            </form>
            <div className='mb-4'>
                <p className='mb-0 or-container'>أو</p>
            </div>
            <div className='w-100 mb-3'>
                {socialMediaItems.map((item) => {
                    return (
                        <Link key={item.id} className='social-media-container'>

                            <p className='mb-0'>{item?.title}</p>
                            <img src={item?.image} alt='' />

                        </Link>
                    )
                })}
            </div>



            <p className='terms_container'>بالتسجيل فإنك توافق على <Link><span>الشروط والأحكام</span></Link></p>
        </div>
    )
}

export default LoginFormContainer