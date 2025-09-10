
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavbarContainer from '../components/NavbarContainer/NavbarContainer'
import Footer from '../components/Footer/Footer'
import SideBarContainer from '../components/SideBarContainer/SideBarContainer'

function Notifications() {
  return (
    <div>
        <NavbarContainer/>
        <Container>
            <Row>
                <Col md={3}>
                 <SideBarContainer/>
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

export default Notifications