import React from 'react'
import NavbarContainer from "../components/NavbarContainer/NavbarContainer"
import Footer from '../components/Footer/Footer'
import { Container } from 'react-bootstrap'
import ProductsCategories from '../components/ProductsCategories/ProductsCategories'
import SectionHeader from '../components/SectionHeader/SectionHeader'
import supportImg from "../assets/images/support.png"
function Support() {
  return (
    <div>
        <NavbarContainer/>
<Container>
    <SectionHeader
    title={'تحتاج إلى مساعدة خبير عقاري ؟ '}
    paragraph={'للوصول لمنزل أحلامك  بسهولة '}
    form={true}
    socialMedia={true}
    contactInfo={false}
  image={supportImg}

    />
              {/* <ProductsCategories/> */}

</Container>
        <Footer/>
    </div>
  )
}

export default Support