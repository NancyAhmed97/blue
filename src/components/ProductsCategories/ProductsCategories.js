import React, { useState } from 'react'
import "./ProductsCategories.css"
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function ProductsCategories() {
  const [tabs, setTabs] = useState(0);
  
  return (
    <div className='my-5 ProductsCategories'>
        <div className='d-flex mb-4'>
            <div className={tabs===0?'active tab':"tab"}onClick={()=>setTabs(0)}>
                           <p className='mb-0'>بيع</p>
 
            </div>
            <div className={tabs===1?'active tab':"tab"}onClick={()=>setTabs(1)}>
            <p className='mb-0'>إيجار</p>

            </div>

        </div>
        <Container fluid>
          <Row>
            <Col md={3}>
            <div>
              <p className='title'>
                شقق
              </p>
              <ul className='p-0 '>
                <li>
                  <Link>شقق للبيع في اكتوبر</Link>
                </li>
                         <li>
<Link>شقق للبيع في التجمع الأول</Link>
                </li>
              </ul>
            </div>
            </Col>
                   <Col md={3}>
            <div>
              <p className='title'>
                شقق
              </p>
              <ul className='p-0 '>
                <li>
                  <Link>شقق للبيع في اكتوبر</Link>
                </li>
                         <li>
<Link>شقق للبيع في التجمع الأول</Link>
                </li>
              </ul>
            </div>
            </Col>
                   <Col md={3}>
            <div>
              <p className='title'>
                شقق
              </p>
              <ul className='p-0 '>
                <li>
                  <Link>شقق للبيع في اكتوبر</Link>
                </li>
                         <li>
<Link>شقق للبيع في التجمع الأول</Link>
                </li>
              </ul>
            </div>
            </Col>
                   <Col md={3}>
            <div>
              <p className='title'>
                شقق
              </p>
              <ul className='p-0 '>
                <li>
                  <Link>شقق للبيع في اكتوبر</Link>
                </li>
                         <li>
<Link>شقق للبيع في التجمع الأول</Link>
                </li>
              </ul>
            </div>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default ProductsCategories