import React from 'react'
import "./RatingRealState.css"
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function RatingRealState() {
    const items=[
        {img:"",id:0,title:"اعلن عن عقارك هنا"},
        // {img:"",id:0,title:"تقييم عقاري"},
        // {img:"",id:0,title:" تقييم عقاري"},
        // {img:"",id:0,title:"الوسطاء المميزون"},

    ]
  return (
    <div>
        <div className='header_container'>
                        <p className='mb-0 title'>اعلن عن عقارك</p>

            <p></p>

        </div>
<Container fluid>
    <Row>
                {items.map((item)=>{
            return(
                <Col md={3} className='mb-2'>
 <Link to="/add-property">
                    <div className="box_container">
<p className='mb-0 text-black'>{item?.title}</p>
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="black" class="bi bi-chevron-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>
                    </div>
 </Link>
                </Col>
            )
        })}
    </Row>
</Container>
     
    </div>
  )
}

export default RatingRealState