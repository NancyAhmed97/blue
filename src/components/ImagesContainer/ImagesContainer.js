import React from 'react'
import   './ImagesContainer.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';


function ImagesContainer({item}) {
    
  return (
    <div className='images_container'>
<Swiper
  slidesPerView={1}
  loop={true}
  spaceBetween={10}
  pagination={{
    clickable: true,
    type: 'fraction', // This makes pagination look like "1 / 5"
  }}
  breakpoints={{
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
  }}
  modules={[Pagination]}
  className="mySwiper"
>
  {item[0]?.images.map((item, index) => (
    <SwiperSlide key={index}>
      <img src={item?.image} alt='' className='w-100 img_container' />
    </SwiperSlide>
  ))}
</Swiper>


    </div>
  )
}

export default ImagesContainer