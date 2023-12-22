// 'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Index = ({allCategory,allSubCategories}) => {
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

 

  const router = useRouter();



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