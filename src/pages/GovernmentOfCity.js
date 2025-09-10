import React from 'react'
import Footer from '../components/Footer/Footer'
import NavbarContainer from '../components/NavbarContainer/NavbarContainer'
import { Container } from 'react-bootstrap'
import BreadcrumbContainer from '../components/BreadcrumbContainer/BreadcrumbContainer';
import { useParams } from 'react-router-dom';
import ConnonHeader from '../components/ConnonHeader/ConnonHeader';
import headerImage from "../assets/images/unsplash_g_DTWgRypfE.png"

function GovernmentOfCity() {
  const { name } = useParams();
console.log(name);

  return (
    <div>
        <NavbarContainer/>
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
    activeTitle={name}
    />
        </Container>
        <Footer/>
    </div>
  )
}

export default GovernmentOfCity