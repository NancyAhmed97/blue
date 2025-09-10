import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import AuthImage from '../components/AuthImage/AuthImage';
import SignupFormContainer from '../components/SignupFormContainer/SignupFormContainer';
import signupAuthImg from "../assets/images/authSignupImg.png"
function Signup() {
  return (
    <div>
      <Container fluid>
        <Row>
        <Col md={6} className='px-0 image_gride_container'>
            <AuthImage loginAuthImg={signupAuthImg} />
          </Col>
          <Col md={6} className='px-0'>

            <div className='d-flex justify-content-center'>
              <div className='w-50 form_gride_container'>
                <SignupFormContainer />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Signup