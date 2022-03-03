import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css/bundle'

import React from 'react'
import styled from 'styled-components'

interface ISlide {
  children: React.ReactNode
}

const Slide = ({ children }: ISlide) => {
  return (
    <Container>
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {React.Children.count(children) > 0 &&
          React.Children.map(
            children,
            (child: React.ReactNode, index: number) => (
              <SwiperSlide key={index}>{child}</SwiperSlide>
            )
          )}
      </Swiper>
    </Container>
  )
}

export default Slide

const Container = styled.div`
  max-width: 100vw;
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100vw;
    height: 50vh;
    object-fit: cover;
  }

  .swiper {
    margin-left: auto;
    margin-right: auto;
  }
`
