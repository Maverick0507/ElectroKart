'use client'
import React, { useEffect, useState } from "react";
import { fetchCategory } from "@/services/admin/category";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './style.css'
import { useRouter } from "next/navigation";


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
        const { data } = await fetchCategory({
          type: "subcategory",
          parentCategory: i,
          limit: "2",
        });

        if (data.success) {
          setSubCategory((prevSubCategory) => [
            ...prevSubCategory,
            ...data.AllCategory,
          ]);
        } else {
          console.error("Error fetching subcategories");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    setParentCategoryIDs(category.map((i) => i._id));
  }, [category]);

  useEffect(() => {
    if (category.length === 4) {
      getSubCategories();
    }
  }, [category]);


  return (

   <div>
    popa
   </div>
  );
};

export default Index;
