import React from 'react'
import "./AdAddContainer.css"
import { Col, Container, Row } from 'react-bootstrap'
function AdAddContainer() {
  return (
    <div className='Ad_Add_Container mt-5'>
        <Container>
            <Row>
                       <Col md={12}>
                <p className='text-white text-center'>هل تبحث للإعلان عن عقار؟  نحن نستطيع مساعدتك</p>
                </Col>
  
       
            </Row>
        </Container>
    </div>
  )
}

export default AdAddContainer