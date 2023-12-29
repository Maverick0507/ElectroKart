'use client'

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
import Slider from "react-slick";
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useRouter } from "next/navigation";



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
    <main className="flex min-h-screen flex-col pt-[7rem]  md:pt-[4.5rem] mt-2 mb-5">

      {/* start */}

      {/*div 1 */}
      <div className=" flex justify-between items-center gap-4">

        <div className=" w-[50vw] h-[80vh]  relative">
          <Image
            className=" object-cover w-full h-full "
            src={laptop} />
          <div className="absolute top-10 left-8">
            <h1 className=" text-3xl mb-5 font-bold "> Shop the Best</h1>
            <h1 className=" text-3xl font-bold "> Laptops Now !</h1>

            <p className="mt-8 text-semibold">Pair text with an icon to focus on</p>
            <p className="text-semibold">your store's features</p>

            <Button className=" bg-white mt-7 p-6 text">
              Show Now
            </Button>
          </div>
        </div>

        <div className="w-[30vw] h-[80vh] cursor-pointer ">
          <Image src={phone} className="h-[70%]" />
          <h1 className="font-bold p-3 text-xl">Best Smartphone</h1>
          <h1 className="font-bold p-3 text-xl">In Your Range !</h1>
        </div>


        <div className="w-[20vw] h-[80vh] flex flex-col  gap-[4vh] ">

          <div className="  h-[38vh] w-full relative cursor-pointer rou">
            <Image src={headphone} className=" object-cover h-full" />
            <Button className="absolute bottom-7 left-3 font-semibold  rounded-md p-2 bg-slate-50 opacity-70">Play now</Button>
          </div>
          <div className="  h-[38vh] w-full relative cursor-pointer">
            <Image src={earbud} className=" object-cover w-full h-full" />
            <Button className="absolute bottom-7 left-3 font-semibold  rounded-md p-2 bg-slate-50 opacity-70">Explore Our New Earbuds</Button>
          </div>
        </div>

      </div>

      {/* div 2 crousel */}
      <div className=" w-full h-[40%] mt-10">
        <Crousel data={subCategory} />
      </div>

      {/* div 3  */}
      <div className=" w-full h-[20%] mt-16 ">
        <h1 className=" text-center text-5xl font-bold uppercase mb-[4rem]">Featured Collection</h1>
        <Crousel data={product} type={'product'} />
      </div>

      {/* div 4 */}
      <div className=" w-full h-[40%] mt-16 flex justify-center items-center gap-10 rounded-md p-8">

        <div onClick={()=>router.push('/products/657eea56923cb11a492569df')}
         className="w-[30%] h-full relative overflow-hidden">
          <img className=" w-full h-full object-cover hover:scale-105 duration-200 ease-in-out"
            src={subCategory[0]?.photos} alt="category iamge" />
          <div className=" absolute top-10 left-8">
            <p className=" text-4xl font-bold  tracking-wider">{subCategory[0]?.name}</p>
            <p className=" pt-6 text-xl font-semibold ">The best you can buy</p>
            <p className=" pt-2 underline cursor-pointer">Buy Now</p>
          </div>
        </div>

        <div onClick={()=>router.push('products/65832f8f668636f8a82e81a0')}
         className="w-[30%] h-full relative overflow-hidden">
          <img className=" w-full h-full object-cover hover:scale-105 duration-200 ease-in-out"
            src={subCategory[2]?.photos} alt="category iamge" />
          <div className=" absolute top-10 left-8">
            <p className=" text-4xl font-bold  tracking-wider">{subCategory[2]?.name}</p>
            <p className=" pt-6 text-xl font-semibold ">The best you can buy</p>
            <p className=" pt-2 underline cursor-pointer">Buy Now</p>
          </div>
        </div>

        <div  onClick={()=>router.push('products/658d686aeb67375724681efc')}
        className="w-[30%] h-full relative overflow-hidden">
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
      <div className="flex h-[80vh] w-full mt-9 bg-white p-6 shadow-md shadow-white">
        <div className=" w-[50%] h-full ">
          <Image className=" w-full h-full object-contain"
            src={headphone2} alt="product image" />
        </div>
        <div className=" w-[50%] h-full  p-10">
          <h1 className=" text-5xl font-bold tracking-wider">Unbelievable Savings Await You!</h1>
          <p className=" pt-9">
            Pair youself with the best trend ongoing and make yourselg update with rocking headphones, or even provide a review.
          </p>
          <Button onClick={()=>router.push('products/657eeeff923cb11a492569e9')}
            className=" rounded-none bg-black text-white mt-10 ">
            Shop now
          </Button>
        </div>
      </div>
    </main>

  )
}

