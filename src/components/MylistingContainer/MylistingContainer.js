
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CardContainer from '../CardContainer/CardContainer'
import PropertiesCard from '../PropertiesCard/PropertiesCard'
function MylistingContainer({favouritData,handleRefresh}) {
  return (
    <div>
        <p>عقاراتي</p>
        <Container fluid>
            <Row>
          {favouritData.length > 0 ? favouritData.map((item) => {
            return (
              <Col md={4}>
                <PropertiesCard

                  data={item}
                  handleRefresh={handleRefresh}
                />
              </Col>
            )
          }) :
            <div className='d-flex justify-content-center align-items-center text-danger fw-bold'>لا توجد عقارات</div>



          }

        </Row>
        </Container>
    </div>
  )
}

export default MylistingContainer
