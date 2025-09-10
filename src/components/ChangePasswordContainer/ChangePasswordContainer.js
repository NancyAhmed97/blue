import React, { useState } from 'react';
import InputContainer from '../InputContainer/InputContainer';
import { Col, Container, Row } from 'react-bootstrap';
import './ChangePasswordContainer.css';
import axios from 'axios';
import { ApiUrl } from '../../Constant/apiUrl';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ChangePasswordContainer() {
  const userinfo = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(userinfo?.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('كلمة المرور الجديدة غير متطابقة مع التأكيد', {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }
    if (!formData.newPassword || !formData.confirmPassword || !formData.currentPassword) {
      toast.error('برجاء ملئ جميع العقول', {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoading(true)
      const data = {
        "current_password": formData?.currentPassword,
        "new_password": formData?.newPassword,
        "new_password_confirmation": formData?.confirmPassword

      }
      const token = userinfo?.token;

      const res = await axios.post("https://nanosoft.technology/blue-nile/api/client/change-password", data, { headers: { Authorization: `Bearer ${token}` } });

      if (res) {
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setLoading(false)

        toast.success("تم تقيير كلمة المرور بنجاح", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error('Error changing password:', err);
      toast.error(Object.values(err.response.data.errors)[0][0], {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
    setLoading(false)

  };

  return (
    <div className='change_password_container section_container'>
      <p className='title'>الخصوصية والأمان</p>
      <div className='items_container'>
        <p className='sub_title'>تغيير كلمة السر</p>
        <form onSubmit={handleSubmit}>
          <div className='input_container mb-4'>
            <label className='my-2'>كلمة السر الحالية</label>
            <InputContainer
              placeholder='كلمة السر الحالية'
              name='currentPassword'
              value={formData.currentPassword}
              onChange={handleChange}
              type={show.current ? 'text' : 'password'}
              //   icon={
              //     <span onClick={() => setShow(prev => ({ ...prev, current: !prev.current }))} style={{ cursor: 'pointer' }}>
              //       {show.current ? '👁️' : '🙈'}
              //     </span>
              //   }
              icon={
                <span
                  onClick={() => setShow(prev => ({ ...prev, current: !prev.current }))}
                  style={{ cursor: 'pointer' }}
                >
                  {show.current ?
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

          <Container>
            <Row>
              <Col md={6}>
                <div className='input_container mb-4'>
                  <label className='my-2'>كلمة السر الجديدة</label>
                  <InputContainer
                    placeholder='كلمة السر الجديدة'
                    name='newPassword'
                    value={formData.newPassword}
                    onChange={handleChange}
                    type={show.new ? 'text' : 'password'}
                    // icon={
                    //   <span onClick={() => setShow(prev => ({ ...prev, new: !prev.new }))} style={{ cursor: 'pointer' }}>
                    //     {show.new ? '👁️' : '🙈'}
                    //   </span>
                    // }
                    icon={
                      <span
                        onClick={() => setShow(prev => ({ ...prev, new: !prev.new }))}
                        style={{ cursor: 'pointer' }}
                      >
                        {show.new ?
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
              </Col>
              <Col md={6}>
                <div className='input_container mb-4'>
                  <label className='my-2'>تأكيد كلمة السر الجديدة</label>
                  <InputContainer
                    placeholder='تأكيد كلمة السر الجديدة'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type={show.confirm ? 'text' : 'password'}
                    // icon={
                    //   <span onClick={() => setShow(prev => ({ ...prev, confirm: !prev.confirm }))} style={{ cursor: 'pointer' }}>
                    //     {show.confirm ? '👁️' : '🙈'}
                    //   </span>
                    // }
                    icon={
                      <span
                        onClick={() => setShow(prev => ({ ...prev, confirm: !prev.confirm }))}
                        style={{ cursor: 'pointer' }}
                      >
                        {show.confirm ?
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
              </Col>
            </Row>
          </Container>

          <div className='d-flex'>
            <button type='submit' className={loading ? 'disable_change_btn' : 'change_btn'} disabled={loading}>حفظ</button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordContainer;
