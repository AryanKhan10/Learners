import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './styles.css';

import Course_Card from './Course_Card';

function CourseSlider({courses}) {
  console.log(courses)
  return (
    <div>
      {
        courses?.length ? ( 
          <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={200}
            pagination={true}
            navigation={true}
            className="mySwiper"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              1024: {slidesPerView:2,
                      spaceBetween:50
                    }
            }}
            modules={[Pagination, Autoplay, Navigation]}
            >
            {
              courses.map((course,index)=>(
                <SwiperSlide key={index}>
                    <Course_Card course={course} Height={'h-[300px]'} SliderHeight={'h-[200px]'} Width={'w-full'}/>
                </SwiperSlide>
              ))
            }
          </Swiper>
         ):( 
              <div> No Course Found </div> 
            )
      }
    </div>
  )
}

export default CourseSlider
