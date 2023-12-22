// 'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchCategory } from '@/services/admin/category';
import { useRouter } from 'next/navigation';

const Index = () => {
  const liStyle = `
    font-semibold
    text-gray-600 
    mt-2 
    hover:bg-white hover:text-gray-600 
    transition ease-in-out 
    cursor-pointer
    rounded-md p-2
    text-center
  `;

  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState({});

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const { data: categoryData } = await fetchCategory({ type: 'category', limit: '5' });
        if (categoryData.success) {
          setAllCategory(categoryData.AllCategory);

          // Fetch subcategories for each category
          const subCategoryPromises = categoryData.AllCategory.map(async (category) => {
            const { data: subCategoryData } = await fetchCategory({
              type: 'subCategory',
              parentCategory: category._id,
              limit: '7',
            });

            if (subCategoryData.success) {
              setAllSubCategories((prevSubCategories) => ({
                ...prevSubCategories,
                [category._id]: subCategoryData.AllCategory,
              }));
            } else {
              console.log(subCategoryData.message);
            }
          });

          // Wait for all subcategory requests to complete
          await Promise.all(subCategoryPromises);
        } else {
          console.log(categoryData.message);
        }
      } catch (error) {
        console.error('Error getting categories and subcategories:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures this effect runs only once on mount


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className=' absolute
      left-10 md:left-[32%]  right-10  h-auto md:h-[50vh]  md:w-[65vw]   rounded-lg  flex shadow-xl  bg-gray-200 gap-4
      justify-evenly'
    >
      {allCategory.map((category) => (
        <div key={category._id}>
          <h1 className=' border-2  rounded-md p-4 text-lg font-semibold underline'>
            {category.name}
          </h1>
          <ul className=' px-4 pb-3'>
            {allSubCategories[category._id]?.map((subCategory) => (
              <li
                onClick={() => router.push(`/products/${subCategory._id}`)}
                className={liStyle}
                key={subCategory._id}
              >
                {subCategory.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
};

export default Index;