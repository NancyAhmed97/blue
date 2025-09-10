import React from 'react'
import NavbarContainer from "../components/NavbarContainer/NavbarContainer"
import Footer from '../components/Footer/Footer'
import { Container } from 'react-bootstrap'
import ProductsCategories from '../components/ProductsCategories/ProductsCategories'
import SectionHeader from '../components/SectionHeader/SectionHeader'
import contactusImg from "../assets/images/contactusImg.png"


function Contactus() {
  console.log("hgjfnhgjhgfj");
  
  return (
    <div>
        <NavbarContainer/>
<Container>
<div className='my-5'>
      <SectionHeader
    title={'تواصل معنا .... لاختيار عقارك المفضل'}
    paragraph={'والبحث عن منزلك المثالي بسهولة !'}
    form={false}
    socialMedia={true}
    contactInfo={true}
      image={contactusImg}


    />
</div>

</Container>
        <Footer/>
    </div>
  )
}

export default Contactus
