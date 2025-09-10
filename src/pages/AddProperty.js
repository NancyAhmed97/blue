import React from 'react'
import NavbarContainer from '../components/NavbarContainer/NavbarContainer'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer/Footer'
import AddPropertyContainer from '../components/AddPropertyContainer/AddPropertyContainer'

function AddProperty() {
  return (
    <div >
        <NavbarContainer/>
        <Container>
<div className='my-5'>
    <AddPropertyContainer/>
</div>
        </Container>
        <Footer/>

        </div>
  )
}

export default AddProperty