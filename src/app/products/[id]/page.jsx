'use client'

import { fetchSingleCategory } from '@/services/admin/category'
import { getAllProducts } from '@/services/admin/product'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard/index'


const page = ({ params }) => {
    const subCategoryId = params.id

    const [product, setProduct] = useState([])
    const [subCategory, setSubCategory] = useState({})

    const [productLength, setProductLength] = useState(0)

    const router = useRouter()

    const getSingleSubCategory = async () => {
        try {
            const { data } = await fetchSingleCategory(subCategoryId)
            if (data.success) {
                setSubCategory(data.subCategory)
            }
            else {
                alert(`Error fetching category`)
            }
        } catch (error) {
            console.log("Error fetching category")
        }
    }

    const getProducts = async () => {
        try {
            const { data } = await getAllProducts(subCategoryId)
            if (data.success) {
                setProduct(data.AllProduct)
                setProductLength(Math.ceil(data.AllProduct.length / 4))
                console.log(productLength)
            }
            else {
                alert(`Error fetching product`)
            }
        } catch (error) {
            console.log("Error fetching product", error)
        }
    }

    useEffect(() => {
        getSingleSubCategory()
        getProducts()
    }, [subCategoryId])

    return (
        <div className='pt-[6rem] h-full'>

            <div className=" border-2 w-full h-[20vh] my-10 p-5 shadow-md bg-blue-100">
                <p className=' font-bold text-xl'>{subCategory.name}</p>

                <p className='font-semibold cursor-pointer'><span
                    onClick={() => router.push('/')}>Home</span> / <span
                        onClick={() => router.push(`/products/${subCategoryId}`)}>{subCategory.name}</span></p>
            </div>

            <div className=" w-full h-[50vh] border-2 p-5 flex">

                <div className=" h-full w-[60%] flex justify-center items-center flex-col">
                    <h1 className=' text-5xl text-gray-400 font-semibold'>Limited time offer</h1>
                    <h2
                        className=' text-4xl text-black font-semibold'
                    >Grab Awesome Deals</h2>
                </div>
                <div className=" h-full w-[40%] border-2">
                    <img
                        className=' w-full h-full object-fit'
                        src={subCategory.photos} alt="subCategory image" />
                </div>
            </div>

            {product.length > 0 ?
                <div className="w-full h-full flex">

                    <div className=" w-[23vw] h-full  py-5">
                        <h1 className=' py-5 px-5'>Filter :</h1>

                        <div className="mb-3 w-full h-auto border-2 shadow-lg rounded-md">
                            <div className=" bg-gray-300 shadow-md rounded-md p-5 ">Availability</div>
                            <div className="  bg-white p-5">
                                <p className='pb-3'>In stock</p>
                                <p className='pb-3'>Out of Stock</p>
                            </div>
                        </div>

                        <div className="mb-3 w-full h-auto border-2 shadow-lg rounded-md">
                            <div className=" bg-gray-300 shadow-md rounded-md p-5 ">Availability</div>
                            <div className="  bg-white p-5">
                                <p className='pb-3'>In stock</p>
                                <p className='pb-3'>Out of Stock</p>
                            </div>
                        </div>
                    </div>

                    <div className={` grid grid-cols-3 h-full w-[78vw] gap-4 p-4`}>
                        {product.map((i) => (
                            <ProductCard data={i} />
                        ))}
                    </div>
                </div>
                :
                <div className='w-full h-[30vh] flex flex-col justify-center items-center'>
                    <h1 className=' font-bold text-5xl '>No Product </h1>
                    <h1 className=' font-bold text-5xl '>Come Back Later</h1>
                </div>
            }

        </div>
    )
}

export default page
