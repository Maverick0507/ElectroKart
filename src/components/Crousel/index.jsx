'use client'
import React, { useEffect, useState } from "react";
import { fetchCategory } from "@/services/admin/category";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Slider from "react-slick";
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useRouter } from "next/navigation";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Index = () => {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [parentCategoryIDs, setParentCategoryIDs] = useState([]);


  const route = useRouter()

  const getAllCategory = async () => {
    try {
      const { data } = await fetchCategory({ type: "category", limit: "4" });

      if (data.success) {
        setCategory(data.AllCategory);
      } else {
        console.error("Error fetching categories");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getSubCategories = async () => {
    try {
      setSubCategory([]);
  
      for (const i of parentCategoryIDs) {
        const { data } = await fetchCategory({ type: 'subCategory', limit: "3", parentCategory: i });
        if (data.success) {
          setSubCategory((prevSubCategory) => [
            ...prevSubCategory,
            ...data.AllCategory,
          ]);
        } else {
          console.error("Error fetching subcategories:", data.error); // Log the error message
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  useEffect(() => {
    getAllCategory();
    getSubCategories()
  }, []);

  useEffect(() => {
    setParentCategoryIDs(category.map((i) => i._id));
  }, [category]);

  useEffect(() => {
    if (category.length === 4) {
      getSubCategories();
    }
  }, [category]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (

    <div>
      {subCategory.map((i) =>
      (
        <p>{i.name}</p>
      ))}
      <div className="w-[100%] p-9">
        <Slider
          className=" w-[100%]"
          {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Index;

{/* <Swiper
modules={[Navigation]}
spaceBetween={50}
slidesPerView={4}
navigation
onSwiper={(swiper) => console.log(swiper)}
onSlideChange={() => console.log('slide change')}
className=" h-full  "
>
{subCategory.map((slide, i) => (
  <SwiperSlide className=" h-full pl-5 pr-5 overflow-hidden" key={i}
    onClick={() => route.push(`/products/${slide._id}`)}
  >
    <div className=" h-[90%] mx-3 cursor-pointer shadow-md shadow-slate-300 hover:scale-105 duration-400 ease-linear rounded-md">
      <img
        className=" h-[80%] w-full rounded-md "
        src={slide.photos} alt=" product photo" />
      <p className=" h-[20%] flex justify-center items-center font-semibold uppercase">{slide.name}</p>
    </div>
  </SwiperSlide>
))}
</Swiper> */}
