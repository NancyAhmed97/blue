import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavbarContainer from '../components/NavbarContainer/NavbarContainer'
import Footer from '../components/Footer/Footer'
import SideBarContainer from '../components/SideBarContainer/SideBarContainer'
import SubscribtionsContainer from '../components/SubscribtionsContainer/SubscribtionsContainer'
import axios from 'axios'
import { ApiUrl } from '../Constant/apiUrl'
import { useSelector } from 'react-redux'

function Subscribtions() {
          const userinfo = useSelector((state) => state.auth);
const [poackage, setPackage] = useState(null)
    useEffect(() => {
    const getData=async()=>{
          try {
    const res = await axios.get(`${ApiUrl}/packages`, {

    }, {
      headers: {
        Authorization: `Bearer ${userinfo?.token}`,
      },
    });
setPackage(res.data.data);


  } catch (error) {
    console.log(error);
  }
    }
    getData()
    }, [])
  return (
    <div >
        <NavbarContainer/>
        <Container>
        <Row className="my-5 align-items-stretch">
  {poackage && poackage.map((item) => {
    return (
      <Col md={4} key={item?.id} className="d-flex">
        <SubscribtionsContainer item={item} />
      </Col>
    )
  })}
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

export default Subscribtions