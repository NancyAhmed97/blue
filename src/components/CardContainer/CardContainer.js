import React from 'react'
import productImg from "../../assets/images/Rectangle 1.png"
import call from "../../assets/images/ri_phone-fill.svg"
import heart from "../../assets/images/heart.svg"
import whatsapp from "../../assets/images/Color Vector.svg"
import "./CardContainer.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
function CardContainer({item,compounds}) {
      const userinfo = useSelector((state) => state.auth);

    const toggleFavorite=async(e)=>{
    e.preventDefault();
try {
            const response = await axios.post(`https://nanosoft.technology/blue-nile/api/` , {property_id:item?.id},{
          headers: {
            Authorization: `Bearer ${userinfo?.token}`,


          },
        });
} catch (error) {
    
}
    }
    return (
        <Link to={`/compound/${item?.id}`}className='w-100'>
            <div className='card_container mb-3'>
                <div className='img_container'>
                    <img src={item?.images[0]?.image} alt='' className='w-100 product_img'/>

                </div>
                <div className='content_container'>
                  <p className='name'>{item?.title}</p>
<div className='d-flex '>
                          <p className='location'>{item?.zone?.title} , {item?.zone?.city?.title}, {item?.zone?.city?.country?.title}</p>
                      {/* <p className='location'>{item?.city?.title}</p> */}

</div>
                    <p className='details'>فيلا  | شقة | تون هاوس | 4 اخرى</p>
                    <div className='item_container'>
               
                        <p className='price_container'>تبدأ من  <span className='price'>{item?.starting_price} جم</span></p>
                                 <div className='item_container'>
                                <img src={whatsapp} alt='whatsapp'className=' mx-2 ' 
                                style={{
                                    objectFit:"contain",
                                    width:"40%"
                                }}
                                onClick={() => window.open(`https://wa.me/${item?.whatsapp}`, '_blank')}

                                />
                         
                                <img src={call} alt='call' 
                                       style={{
                                    objectFit:"contain",
                                    width:"40%"
                                }}    
                           onClick={() => window.open(`tel:${item?.phone}`, '_blank')}

/>
                          
                        </div>
                    </div>


                </div>
            </div>
        </Link>
    )
}

export default CardContainer