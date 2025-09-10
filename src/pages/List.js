import React from 'react'
import NavbarContainer from '../components/NavbarContainer/NavbarContainer'
import Footer from '../components/Footer/Footer'
import FilterContainer from '../components/FilterContainer/FilterContainer'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import ListGride from '../components/ListGride/ListGride'

function List() {
      const location = useLocation();
    const pathParts = location.pathname.split('/'); 

  const type = pathParts[1]; 
console.log(type);

  return (
    <div>
        <NavbarContainer/>
<div className='my-5'>
    <Container>
    <Row>
        <Col md={3}>
        <FilterContainer
        type={type}
        />
        </Col>
        <Col md={9}>
        <ListGride
        type={type}
        />
        </Col>
    </Row>
</Container>
</div>

        <Footer/>
    </div>
  )
}

export default List