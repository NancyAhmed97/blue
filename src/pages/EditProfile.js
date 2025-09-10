import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavbarContainer from '../components/NavbarContainer/NavbarContainer'
import Footer from '../components/Footer/Footer'
import SideBarContainer from '../components/SideBarContainer/SideBarContainer'
import MyaccountContainer from '../components/MyaccountContainer/MyaccountContainer'

function EditProfile() {
    
  return (
    <div >
        <NavbarContainer/>
        <Container>
            <Row className='my-5'>
                <Col md={3}>
                 <SideBarContainer/>
                </Col>
                <Col md={9}>
                <MyaccountContainer/>
                </Col>
            </Row>
        </Container>
        {/* <Container>
            <Row>
                <SideBarContainer/>
            </Row>
        </Container> */}
        <Footer/>
    </div>
  )
}

export default EditProfile