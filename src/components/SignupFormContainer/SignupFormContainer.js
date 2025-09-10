import React, { useState } from 'react';
import "./SignupFormContainer.css";
import logo from "../../assets/images/Logo.png";
import InputContainer from '../InputContainer/InputContainer';
import { Link, useNavigate } from 'react-router-dom';
import CommonButton from '../CommonButton/CommonButton';
import axios from 'axios';
import { ApiUrl } from '../../Constant/apiUrl';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function SignupFormContainer() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // ✅ new
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    confirmPassword: '',
    password: '',
    national_id: "",

  });


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFunction = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('كلمتا المرور غير متطابقتين');
      return;
    }

    try {
      setLoading(true)
      const res = await axios.post(`${ApiUrl}/client/auth/register`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        national_id: formData.national_id,
        password_confirmation: formData.confirmPassword,
        type: "client"
      });
      setLoading(false)
      navigate('/code')
    } catch (err) {
      setLoading(false)

      toast.error(Object.values(err.response.data.errors)[0][0], {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };


  return (
    <div className='signup_form_Container'>
      <img src={logo} alt='logo' className='logo' />
      <p className='title'>إنشاء حساب</p>

      <form className='w-100' onSubmit={handleFunction}>
        <div className='input_container'>
          <p className='label'>الاسم</p>
          <InputContainer
            placeholder='اكتب الاسم بالكامل'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className='input_container'>
          <p className='label'>البريد الإلكتروني</p>
          <InputContainer
            placeholder='اكتب البريد الإلكتروني'
            name='email'
            value={formData.email}
            onChange={handleChange}
            type='email'
          />
        </div>

        <div className='input_container'>
          <p className='label'>رقم الهاتف</p>
          <InputContainer
            placeholder='اكتب رقم الموبايل'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className='input_container'>
          <p className='label'>رقم البطاقة</p>
          <InputContainer
            placeholder='اكتب رقم البطاقة'
            name='national_id'
            value={formData.national_id}
            onChange={handleChange}
          />
        </div>

        <div className='input_container'>
          <p className='label'>كلمة المرور</p>
          <InputContainer
            placeholder='اكتب كلمة المرور'
            name='password'
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            icon={
              <span
                onClick={() => setShowPassword(prev => !prev)}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                  </svg>
                }
              </span>
            }
          />
        </div>

        <div className='input_container'>
          <p className='label'>تأكيد كلمة المرور</p>
          <InputContainer
            placeholder='أعد كتابة كلمة المرور'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            type={showConfirmPassword ? 'text' : 'password'} // ✅ Use new state
            icon={
              <span
                onClick={() => setShowConfirmPassword(prev => !prev)} // ✅ Toggle confirm
                style={{ cursor: 'pointer' }}
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                  </svg>
                )}
              </span>
            }
          />
        </div>

        <div className='w-100'>
          <CommonButton text='إنشاء' handleFunction={handleFunction} loading={loading} />
        </div>
      </form>

      <p className='terms_container'>
        بالتسجيل فإنك توافق على <Link><span>الشروط والأحكام</span></Link>
      </p>
    </div>
  );
}

export default SignupFormContainer;
