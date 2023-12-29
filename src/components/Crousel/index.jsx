'use client'
import React from "react";
import Slider from "react-slick";
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useRouter } from "next/navigation";
import './crousel.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductCard from '@/components/ProductCard/index'

const Index = ({ data, type }) => {



  const route = useRouter()


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: type==='product' ? 4: 5,
    slidesToScroll: 1
  };
  return (

    <div>
      <div className="w-[100%] h-[100%] p-9">
        {type === 'product' ?
          <Slider
          className=" w-[100%] h-[90%]"
          {...settings}
          >
            {data.map((slide, i) => (
              <div  key={i}
              className="  ">
                     <ProductCard page={'homePage'} data={slide} />
              </div>
            ))}
          </Slider>
          :
          <Slider
            className=" w-[100%]"
            {...settings}>
            {data.map((slide, i) => (
              <div className=" " key={i}
                onClick={() => route.push(`/products/${slide._id}`)}
              >
                <div className=" h-[90%] mx-3 cursor-pointer shadow-md shadow-slate-300 hover:scale-105 duration-400 ease-linear rounded-md">
                  <img
                    className=" h-[80%] w-full rounded-md "
                    src={slide.photos} alt=" product photo" />
                  <p className=" h-[20%] flex justify-center items-center font-semibold uppercase">{slide.name}</p>
                </div>
              </div>
            ))}
          </Slider>
        }
      </div>
    </div>
  );
};

export default Index;


