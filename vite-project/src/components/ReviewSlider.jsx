import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component" 

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import apiConnector from '../services/apiConnector';
import { ratingAndReviewEndpoints } from '../services/apis';
// import './styles.css';


function ReviewSlider() {

    const [review, setReview] = useState([]);
    const trancate = 30;

    console.log(review)
    useEffect(()=>{
        const fetchReview = async()=>{
            const {data} = await apiConnector('GET', ratingAndReviewEndpoints.GET_RATING_API);

            console.log(data)
            if(data){
                setReview(data.allReviews)
            }
        }
        fetchReview()
    },[])
  return (
    <div className='w-[95%] h-full my-10 mx-auto'>
        <div className=''>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                pagination={true}
                navigation={true}
                loop={review.length > 4}
                
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                    1280: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                    },
                  }}
                modules={[Pagination, Autoplay, Navigation]}
                className="mySwiper"
                >
                    {
                        review.map((item, index) => (
                            <SwiperSlide key={index} className='w-[95%] h-full flex items-center shadow-lg'>
                                <div className='w-full h-full flex flex-col  p-5 bg-[#0D1117] rounded-lg  '>
                                    <div className='flex gap-2'>
                                        <img src={item?.user?.image} alt="profile" className='w-10 h-10 rounded-full' />
                                        <div className="flex flex-col text-white">
                                            <h1 className='text-sm font-semibold'>{item?.course.courseTitle}</h1>
                                            <p className='text-sm'>{item.user.firstName} {item?.user.lastName}</p>
                                        </div>
                                    </div>
                                    <div className="pt-5">
                                        <p className='text-sm text-gray-500'>{item?.review.slice(0, trancate)}...</p>
                                        <div className="flex gap-2 items-center text-yellow-400">
                                            <p className='text-sm'>{item?.rating}/5</p>
                                            <ReactStars
                                                count={5}
                                                value={item.rating}
                                                size={20}
                                                activeColor="#ffd700"
                                                edit={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
        </div>
      
    </div>
  )
}

export default ReviewSlider
