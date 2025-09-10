import React from 'react'
import NavbarContainer from "../components/NavbarContainer/NavbarContainer"
import Footer from '../components/Footer/Footer'
import ConnonHeader from '../components/ConnonHeader/ConnonHeader'
import headerImage from "../assets/images/unsplash_g_DTWgRypfE.png"
import {  Col, Container, Row } from 'react-bootstrap'
import BreadcrumbContainer from '../components/BreadcrumbContainer/BreadcrumbContainer'
import SearchContainer from '../components/SearchContainer/SearchContainer'
import LocationApartmentContainer from '../components/LocationApartmentContainer/LocationApartmentContainer'
import cairoImage from "../assets/images/unsplash_xDZP-g74Ul8.png"
import alexImg from "../assets/images/unsplash_xDZP-g74Ul8 (2).png"
import ismaliaImg from "../assets/images/unsplash_xDZP-g74Ul8 (1).png"
function Knowlage() {
    const items=[
        {id:1,name:"القاهرة",image:cairoImage},
        {id:2,name:"الإسماعيلية",image:ismaliaImg},
        {id:3,name:"الأسكندرية",image:alexImg},
        {id:4,name:"القاهرة",image:cairoImage},
        {id:5,name:"الإسماعيلية",image:ismaliaImg},
        {id:6,name:"الأسكندرية",image:alexImg},



        
        

    ]
    return (
        <div>
            <NavbarContainer />
            <Container>
                <ConnonHeader
                    title="اعرف عن أسعار العقارات "
                    subTitle=" في اي مكان في مصر "
                    socialMedia={true}
                    image={headerImage}
                />
    <BreadcrumbContainer
    linkTitle={'بلو نيل هايلايتس'}
    title="اسعار العقارات"
    />
    <SearchContainer/>
<Row>
    {items.map((item)=>{
        return(
    <Col md={4} key={item?.id}>
        <LocationApartmentContainer
        item={item}
        />

    </Col>
        )
    })}

</Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Knowlage