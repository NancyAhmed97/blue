import React, { useEffect, useState } from 'react'
import "./MySubscribtionContainer.css"
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { ApiUrl } from '../../Constant/apiUrl';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SubscribtionsContainer from '../SubscribtionsContainer/SubscribtionsContainer';
function MySubscribtionContainer() {
      const navigate = useNavigate();
        const userinfo = useSelector((state) => state.auth);
const [packageData, setPackage] = useState(null)
console.log(userinfo?.token);

    useEffect(() => {
    const getData=async()=>{
          try {
    const res = await axios.get(`${ApiUrl}/my-subscription`, {
      headers: {
        Authorization: `Bearer ${userinfo?.token}`,
      },
    });
    console.log(res.data.data);
    
setPackage(res.data.data);


  } catch (error) {
    console.log(error);
  }
    }
    getData()
    }, [])
    console.log(packageData,"packageData");
    
  return (
    <div className='py-5 section_container h-100'>
              <p className='fw-bold'>خطة الاشتراك</p>
      <Container fluid className='h-100'>
{packageData?.package ?
                  <Row className="my-5 align-items-stretch border py-4">
      <Col md={4} className="">
      <ul className='p-0 mt-4'>
    <li><p> بدأت من {packageData?.start_at} </p></li>
</ul>
        <SubscribtionsContainer item={packageData?.package} />
      </Col>
</Row>
        :
                <Row className='h-100'>

         <div className='border d-flex justify-content-center align-items-center h-100 rounded flex-column'>
<p className='fw-bold text-dark'>ليس لديك أي اشتراكات</p>
       <button type='submit' className={'save-btn w-50'}onClick={()=>{
        navigate("/subscribtions")
       }}>
         اشترك
        </button>
 </div>
         </Row>

        }


      </Container>
        

</div>
  )
}

export default MySubscribtionContainer