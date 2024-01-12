'use client'
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useRouter } from "next/navigation";
import './crousel.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductCard from '@/components/ProductCard/index';

const Index = ({ data, type }) => {
  const [mediumScreen, setMediumScreen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [xtraSmallScreen, setXtraSmallScreen] = useState(false);

  const route = useRouter();

  useEffect(() => {
    // Function to update mediumScreen and smallScreen based on window width
    const handleResize = () => {
      setMediumScreen(window.innerWidth >= 768);
      setSmallScreen(window.innerWidth <= 639);
      setXtraSmallScreen(window.innerWidth <=414)
    };

    // Initial call to set the initial values
    handleResize();

    // Add a resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: xtraSmallScreen ? 1 : smallScreen ? 2 : mediumScreen ? 3  : 5,
    slidesToScroll: 1
  };

  const settings2 = {
    infinite: true,
    speed: 500,
    slidesToShow: xtraSmallScreen ? 1 : smallScreen ? 2 : mediumScreen ? 3  : 5,
    slidesToScroll: 1
  };

  return (
    <div>
      <div className={`w-full h-full p-9 ${mediumScreen ? 'md:w-full' : ''} sm:p-2`}>
        {type === 'product' ? (
          <Slider className="w-full h-90%" {...settings2}>
            {data.map((slide, i) => (
              <div key={i} className="">
                <ProductCard page={'homePage'} data={slide} />
              </div>
            ))}
          </Slider>
        ) : (
          <Slider className="w-full" {...settings}>
            {data.map((slide, i) => (
              <div
                className=""
                key={i}
                onClick={() => route.push(`/products/${slide._id}`)}
              >
                <div className="h-90% mx-3 cursor-pointer shadow-md shadow-slate-300 hover:scale-105 duration-400 ease-linear rounded-md">
                  <img
                    className="h-80% w-full rounded-md"
                    src={slide.photos}
                    alt="product photo"
                  />
                  <p className="h-20% flex justify-center items-center font-semibold uppercase">
                    {slide.name}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Index;
