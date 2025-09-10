import React from 'react'
import "./SubscribtionsContainer.css"
import axios from 'axios';
import { useSelector } from 'react-redux';
function SubscribtionsContainer({item}) {
              const userinfo = useSelector((state) => state.auth);

    const handleSumbit=async(id)=>{
try {
            const response = await axios.post(`https://nanosoft.technology/blue-nile/api/subscribe-and-payment` , {package_id:id},{
          headers: {
            Authorization: `Bearer ${userinfo?.token}`,


          },
        });
        window.open(response.data.data.payment_url, "_blank");

        
} catch (error) {
    
}
    }
  return (
    <div className='package_container'>
<h5>{item?.title}</h5>
<h5>{item?.price}جنية</h5>
<ul className='p-0 mt-4'>
    <li><p> مدة {item?.duration} يوم</p></li>
    <li><p>عدد العقارات المسموح بيها {item?.max_properties} عقار</p></li>
    <li><p>عدد أيام  نشر العقار {item?.property_active_days} يوم</p></li>
    <li><p> {item?.auto_verify_client==1?"الباقة تسمح بتوثيق الحساب  من غير رفع البطاقة":"الباقة لا تسمح بتوثيق الحساب  من غير رفع البطاقة"} </p></li>
<li>{item?.description}</li>
</ul>
    <button type='submit' className={'save-btn w-100'}onClick={()=>handleSumbit(item.id)}>
         اشترك
        </button>
    </div>
  )
}

export default SubscribtionsContainer