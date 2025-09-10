import React, { useEffect, useState } from 'react'
import "./MyFavoritsContainer.css"
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { ApiUrl } from '../../Constant/apiUrl'
import { useSelector } from 'react-redux'
import PropertiesCard from '../PropertiesCard/PropertiesCard'
function MyFavoritsContainer({favouritData,handleRefresh}) {

  return (
    <div className='py-5 section_container'>
      <p className='fw-bold'>مفضلتي</p>
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

export default MyFavoritsContainer