import React from 'react'
import  './InfoContainer.css'
import LocationMap from '../../pages/LocationMap';
import Table from 'react-bootstrap/Table';
import { Link, useLocation } from 'react-router-dom';

export default function InfoContainer({item}) {
  const location = useLocation();
    const pathParts = location.pathname.split('/'); 

  const type = pathParts[1]; 
console.log(type);
    
  return (
    <div className='my-4 info_container'>
        <p className='type mb-2'>{item[0]?.category?.title}</p>
        <p className='title mb-2'>{item[0]?.title}</p>
        <div className='d-flex align-items-center mb-2 location'>
            <p className='mb-0'>{item[0]?.sub_category?.title}</p>
            <p className='mb-0 mx-1'>{item[0]?.created_at.slice(0,10)}</p>

        </div>
        <div className='d-flex align-items-center mb-2 location'>
            <p className='mb-0'>{item[0]?.zone?.title}</p>
            ,
            <p className='mb-0 mx-1'>{item[0]?.city?.title}</p>
            ,
                        <p className='mb-0 mx-1'>{item[0]?.country?.title}</p>

        </div>
        <p>{item[0]?.address}</p>
                <p className='price mb-2'>{type==="compound"?item[0]?.starting_price:item[0]?.price} جم</p>
                {type!=="compound"&&
                <>
                <p className='description_title mb-0'> 
تفاصيل الاعلان
                </p>
                    <Table striped bordered hover>
                            <tbody>

        <tr>
          <th>اسم الكمبوند</th>
          <td>{item[0]?.compound?.title} متر2</td>
        </tr>
        <tr>
          <th>نوع العقار</th>
          <td>{item[0]?.area} متر2</td>
        </tr>
        <tr>
          <th>المساحة</th>
          <td>{item[0]?.area} متر2</td>
        </tr>
        <tr>
          <th>عمر العقار</th>
          <td>{item[0]?.age}</td>
        </tr>
        <tr>
          <th>الدور</th>
          <td>{item[0]?.floor}</td>
        </tr>
        <tr>
          <th>الغرف</th>
          <td>{item[0]?.bedrooms}</td>
        </tr>
        <tr>
          <th>الحمام</th>
          <td>{item[0]?.bathrooms}</td>
        </tr>
        <tr>
          <th>التشطيب</th>
          <td>{item[0]?.finishing_type}</td>
        </tr>
        <tr>
          <th>سنة التشطيب</th>
          <td>{item[0]?.delivery_date}</td>
        </tr>
        <tr>
          <th>نوع العقار</th>
          <td>{item[0]?.listing_type=="sale"?"بيع":"ايجار"}</td>
        </tr>
        <tr>
          <th>طريقة الدفع</th>
          <td>{item[0]?.is_installment===0?"نقداً":item[0]?.is_installment===1?"تقسيط": "نقداً أو تقسيط"}</td>
        </tr>
      </tbody>
    </Table> 
                </>
}

                <p className='description_title mb-0'> 
                    وصف العقار
                </p>
                <p className='description mb-2'>{item[0]?.description}</p>
                {item[0]?.client&&
                <>
                                <p className='description_title mb-0'> 
صاحب العقار
                </p>
<Link className='d-flex text-muted mt-4'>
<img src={item[0]?.client?.image}alt='' className='rounded-circle' style={{width: "10%",}}/>
<div>
                  <p className='description mb-2'>{item[0]?.client?.name}</p>
                <p className='description mb-2'>{item[0]?.client?.email}</p>

</div>
</Link>
                </>
                }
                <p className='description_title mb-0 mt-4'> 
الموقع على الخريطة
                </p>
    <LocationMap
        latitude={item[0].lat}
        longitude={item[0].long}
        popupText="This is my current location!"
      />

    </div>
  )
}
