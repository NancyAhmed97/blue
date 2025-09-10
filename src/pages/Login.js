import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import AuthImage from '../components/AuthImage/AuthImage';
import LoginFormContainer from '../components/LoginFormContainer/LoginFormContainer';
import loginAuthImg from "../assets/images/authLoginImg.png"
function Login() {
  return (
    <div>
      <Container fluid>
        <Row>
        <Col md={6} className='px-0 image_gride_container left_section_container'>
            <AuthImage loginAuthImg={loginAuthImg} />
          </Col>
          <Col md={6} className='px-0'>

            <div className='d-flex justify-content-center'>
              <div className='w-50 form_gride_container section_container'>
                <LoginFormContainer />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login