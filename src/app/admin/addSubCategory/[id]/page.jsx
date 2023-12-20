'use client';
import React, { useEffect, useState } from 'react';
import AddCategory from '@/components/AddCategory/index'

const Page = () => {
 
 

  return (
    <div className='pt-[6rem] min-h-[100vh] bg-gray-600 py-8'>
      <AddCategory type={'subCategory'}/>
    </div>
  );
};

export default Page;
