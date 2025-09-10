import React, { useEffect, useState } from 'react'
import "./ProductsCarsoul.css"
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay } from 'swiper/modules';
import CardContainer from '../CardContainer/CardContainer';
import { useDispatch, useSelector } from 'react-redux';


function ProductsCarsoul() {
  const dispatch=useDispatch()
      const [slidesPerView, setSlidesPerView] = useState(3);
  const [spaceBetween, setSpaceBetween] = useState(30);
const { list} = useSelector((state) => state.compounds);
console.log(list,"list");

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width < 600) {
        setSlidesPerView(1);
        setSpaceBetween(10);
      } else if (width < 900) {
        setSlidesPerView(2);
        setSpaceBetween(20);
      } else {
        setSlidesPerView(3);
        setSpaceBetween(30);
      }
    }

    handleResize(); // Set initially

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='my-5 section_container'>
        <div className='header_container'>
                        <p className='mb-0 title'>دليل الكمبوندات</p>


        </div>
        <div>
                  <Swiper
                        slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
        
                loop={true}

             autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}

        modules={[Autoplay]}
        className="mySwiper"
      >
        {list.map((item,index)=>{
          console.log(item?.properties);
          
          return(
        <SwiperSlide key={index}>
            <CardContainer item={item}
            state="compounds"
            />
        </SwiperSlide>

          )
        })}
      </Swiper>
        </div>
    </div>
  )
}

export default ProductsCarsoul