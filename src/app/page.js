'use client'
import { motion } from 'framer-motion';

import Image from "next/image"
import { Button } from "@nextui-org/react"
import Crousel from "@/components/Crousel/index"
import laptop from '../../public/image/laptop.jpeg'
import phone from '../../public/image/phone.jpeg'
import headphone from '../../public/image/headphone.jpeg'
import headphone2 from '../../public/image/headphone2.jpeg'
import earbud from '../../public/image/earbud.jpeg'

import React, { useEffect, useState } from "react";
import { fetchCategory } from "@/services/category";
import { getLimitedProduct } from '@/services/product/'
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useRouter } from "next/navigation";
import Footer from '@/components/Footer/index'


export default function Home() {

  const router = useRouter()

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  console.log(subCategory)
  const [parentCategoryIDs, setParentCategoryIDs] = useState([]);

  const [product, setProduct] = useState([])

  const getAllProduct = async () => {
    try {
      const { data } = await getLimitedProduct()
      if (data.success) {
        setProduct(data.Product)
      }
      else {
        console.log('Error getting product')
      }
    } catch (error) {
      console.log(error)
    }
  }

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


      const { data } = await fetchCategory({
        type: "subcategory",
        parentCategory: "657c3153609a340d2d8c48dc",
        limit: "8",
      });

      if (data.success) {
        setSubCategory(data.AllCategory)
      } else {
        console.error("Error fetching subcategories");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };



  useEffect(() => {
    getAllCategory();
    getAllProduct()
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
    <main className="flex min-h-screen flex-col pt-[7rem]  md:pt-[4.5rem] mt-2 ">

      {/* start */}

      {/*div 1 */}
      <div
        className=" flex justify-between items-center gap-4 md:gap-0 sm:flex-col sm:gap-0 sm:mb-8">

        <div className=" w-[50vw] h-[80vh]  relative lg:w-[30vw] lg:h-[40vh] md:w-[34vw] sm:w-full xs:h-[60vh]">
          <Image
            className=" object-cover w-full h-full "
            src={laptop} />
          <motion.div
            initial={{ y: -1000 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-10 left-8">
            <h1 className=" text-3xl mb-5 font-bold "> Shop the Best</h1>
            <h1 className=" text-3xl font-bold "> Laptops Now !</h1>

            <p className="mt-8 text-semibold">Pair best software with best hardware to provide </p>
            <p className="text-semibold">power of computation</p>

            <Button 
            onClick={()=>router.push('/products/657eea56923cb11a492569df')}
            className=" bg-white mt-7 p-6 text">
              Show Now
            </Button>
          </motion.div>
        </div>

        <div 
        
        className="w-[30vw] h-[80vh] cursor-pointer lg:h-[40vh] md:w-[33vw] sm:w-full sm:text-center xs:h-[60vh]">
          <Image src={phone} className="h-[70%]" />
          <motion.h1
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
           className="font-bold p-3 text-xl">Best Smartphone</motion.h1>
          <motion.h1 
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-bold p-3 text-xl">In Your Range !</motion.h1>
        </div>


        <div className="w-[20vw] h-[80vh] flex flex-col  gap-[4vh] lg:w-[30vw] lg:h-[40vh] md:w-[33vw] md:gap-0 sm:w-full sm:flex-row sm:h-[40vh] sm:gap-0 xs:flex-col xs:h-auto">

          <div className="  h-[38vh] w-full relative cursor-pointer lg:h-[18vh] md:h-[20vh] sm:h-[100%]">
            <Image src={headphone} className=" object-cover h-full" />
            <Button
            onClick={()=>router.push('/products/657eeeff923cb11a492569e9')}
             className="absolute bottom-7 left-3 font-semibold  rounded-md p-2 bg-slate-50 opacity-70">Play now</Button>
          </div>
          <div className="  h-[38vh] w-full relative cursor-pointer lg:h-[18vh] md:h-[20vh] sm:h-[100%]">
            <Image src={earbud} className=" object-cover w-full h-full" />
            <Button
            onClick={()=>router.push('/products/657eef14923cb11a492569ed')}
             className="absolute bottom-7 left-3 font-semibold  rounded-md p-2 bg-slate-50 opacity-70">Explore Our New Earbuds</Button>
          </div>
        </div>

      </div>

      {/* div 2 crousel */}
      <div className=" w-full h-[40%] mt-10 sm:mt-0 p-5">
        <Crousel data={subCategory} />
      </div>

      {/* div 3  */}
      <div className=" w-full  mt-16 p-5">
        <h1 className=" text-center text-5xl font-bold uppercase mb-[4rem] xs:font-bold xs:text-3xl">Featured Collection</h1>
        <Crousel data={product} type={'product'} />
      </div>

      {/* div 4 */}
      <div className=" w-full h-[40%] mt-16 flex  justify-center items-center gap-10 rounded-md p-8 md:h-auto md:flex-wrap sm:flex-col sm:w-full xs:w-[100vw] xs:flex-row xs:flex-nowrap xs:overflow-x-scroll xs:justify-normal">

        <div onClick={() => router.push('/products/657eea56923cb11a492569df')}
          className="w-[30%] h-full relative overflow-hidden md:w-[40vw] sm:w-full sm:h-[40vh]  xs:overflow-visible xs:flex-none xs:[100vw]">
          <img className=" w-full h-full object-cover hover:scale-105 duration-200 ease-in-out "
            src={subCategory[0]?.photos} alt="category iamge" />
          <div className=" absolute top-10 left-8">
            <p className=" text-4xl font-bold  tracking-wider">{subCategory[0]?.name}</p>
            <p className=" pt-6 text-xl font-semibold ">The best you can buy</p>
            <p className=" pt-2 underline cursor-pointer">Buy Now</p>
          </div>
        </div>

        <div onClick={() => router.push('products/65832f8f668636f8a82e81a0')}
          className="w-[30%] h-full relative overflow-hidden md:w-[40vw] sm:w-full sm:h-[40vh]  xs:overflow-visible xs:flex-none xs:w-[100vw]">
          <img className=" w-full h-full object-cover hover:scale-105 duration-200 ease-in-out"
            src={subCategory[2]?.photos} alt="category iamge" />
          <div className=" absolute top-10 left-8">
            <p className=" text-4xl font-bold  tracking-wider">{subCategory[2]?.name}</p>
            <p className=" pt-6 text-xl font-semibold ">The best you can buy</p>
            <p className=" pt-2 underline cursor-pointer">Buy Now</p>
          </div>
        </div>




        <div onClick={() => router.push('products/658d686aeb67375724681efc')}
          className="w-[30%] h-full relative overflow-hidden md:w-[40vw] sm:w-full sm:h-[40vh]  xs:overflow-visible xs:flex-none xs:w-[100vw]">
          <img className=" w-full h-full object-cover hover:scale-105 duration-200 ease-in-out"
            src={subCategory[4]?.photos} alt="category iamge" />
          <div className=" absolute top-10 left-8">
            <p className=" text-4xl font-bold  tracking-wider">{subCategory[4]?.name}</p>
            <p className=" pt-6 text-xl font-semibold ">The best you can buy</p>
            <p className=" pt-2 underline cursor-pointer">Buy Now</p>
          </div>
        </div>

      </div>

      {/* div 5 */}
      <div className="flex h-[80vh] w-full mt-9 bg-white p-6 shadow-md shadow-white lg:h-[50vh] sm:flex-col sm:h-auto">
        <div className=" w-[50%] h-full sm:w-full sm:h-[40vh]">
          <Image className=" w-full h-full object-contain lg:object-fill"
            src={headphone2} alt="product image" />
        </div>
        <div className=" w-[50%] h-full  p-10 sm:w-full">
          <h1 className=" text-5xl font-bold tracking-wider xs:text-4xl">Unbelievable Savings Await You!</h1>
          <p className=" pt-9">
            Pair youself with the best trend ongoing and make yourselg update with rocking headphones, or even provide a review.
          </p>
          <Button onClick={() => router.push('products/657eeeff923cb11a492569e9')}
            className=" rounded-none bg-black text-white mt-10 ">
            Shop now
          </Button>
        </div>
      </div>

      {/* div 6 banner */}
      <div className=" h-[20vh]  w-full flex mt-7 sm:flex-col xs:h-[30vh]">
        <div className=" w-[50%]  p-4 px-10  sm:flex-col sm:justify-center sm:items-center sm:w-full">
          <h1 className=" font-bold text-3xl">Subscribe to our emails</h1>
          <p >Be the first to know about new collections and exclusive offers.</p>
        </div>

        <div className=" h-full w-[50%]  flex justify-center items-center sm:w-full">
          <div className=" flex items-center justify-between p-4 border-2 rounded-md border-black bg-white w-[25rem] h-[3rem]">
            <input className=" outline-none" type="text" placeholder=" Email" />
            <p className=" font-bold p-2">Subscribe</p>
          </div>
        </div>
      </div>

      {/* div 6 footer */}
      <div className=" mt-10">
        <Footer />
      </div>
    </main>

  )
}

