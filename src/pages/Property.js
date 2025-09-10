import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer/Footer'
import NavbarContainer from '../components/NavbarContainer/NavbarContainer'
import ContactInfo from '../components/ContactInfo/ContactInfo'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ImagesContainer from '../components/ImagesContainer/ImagesContainer'
import InfoContainer from '../components/InfoContainer/InfoContainer'
import Loading from "./Loading"
function Property() {
    const { list: propertiesList, loading, error } = useSelector((state) => state.properties);
    const { id } = useParams();
    const item = propertiesList.filter((com) => com?.id == id);

    if (loading) {
        <Loading />

    } else {
        return (
            <div>
                <NavbarContainer />
                <Container>
                    <Row className='my-4'>
                        <Col md={9}>
                            <div className='left_section_container'>

                                <ImagesContainer
                                    item={item}

                                />

                                <InfoContainer
                                    item={item}

                                />
                                {/* <Row>
                                       <p className='description_title mb-0'> 
                    عقارات الكمبوند
                </p>
                                {propertiesItem.map((property) => {
                                    return (
                                        <Col md={4}>
                                            <PropertiesCard
                                                data={property}
                                            />
                                        </Col>
                                    )
                                })}


                            </Row> */}
                            </div>

                        </Col>
                        <Col md={3}>

                            <div className='section_container'>

                                <ContactInfo
                                    item={item}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        )
    }
}

export default Property