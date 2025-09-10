import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import AuthImage from '../components/AuthImage/AuthImage';
import LoginFormContainer from '../components/LoginFormContainer/LoginFormContainer';
import loginAuthImg from "../assets/images/authLoginImg.png"
import logo from "../assets/images/Logo.png"
import email from "../assets/images/email.svg"
import Icon from "../assets/images/Icon.svg"
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../Constant/apiUrl';
import { toast } from 'react-toastify';

function Code() {
      const [loading, setLoading] = useState(false)
      const {identifier} =useParams()
  console.log(identifier);
  
  const handleResend=async(e)=>{
        e.preventDefault();
            try {
                setLoading(true)

                const res = await axios.post(`${ApiUrl}/client/auth/email/verification-notification
`, {
                    // phone:identifier,

                });
                                setLoading(false)

     toast.success("يرجي مراجعة البريد الالكتروني", {
            position: "bottom-right",
            autoClose: 3000,
          });

            } catch (err) {
                setLoading(false)

          

            }
  }
  return (
    <div className='code_container'>
      <Container fluid>
        <Row>
          <Col md={6} className='px-0 image_gride_container'>
            <AuthImage loginAuthImg={loginAuthImg} />
          </Col>
          <Col md={6} className='px-0'>

            <div className='d-flex justify-content-center flex-column align-items-center'>

              <div className='w-50 form_gride_container d-flex justify-content-center flex-column align-items-center'>
                <img src={logo} alt='logo' className='logo' />
                <div className='mt-4'>
                  <img src={email} alt='email' className='logo' />

                </div>
                <h6 className='verfiy_container'>

                  تحقق من بريدك الإلكتروني
                </h6>
                <p className='open_email_container'>افتح  بريدك الالكتروني للتحقق</p>
              </div>
              <div className='d-flex justify-content-center align-items-center mb-4'>
                <p className='mb-0'>
                  لم تستلم البريد الإلكتروني؟
                </p>

                <div className='resendCode'onClick={handleResend}>اضغط لاعادة الارسال</div>
              </div>


              <Link to={"/login"}>
                <div className='d-flex justify-content-center align-items-center'>

                  <p className='mb-0 gotologin_container'>
                    الرجوع للتسجيل

                  </p>
                  <img src={Icon} alt='Icon' />
                </div>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Code