'use client'

import { getSearchedProduct } from '@/services/product'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard/index'
import { CircularProgress } from '@nextui-org/react'


const page = ({ params }) => {
    const keyword = params.keyword

    const [product, setProduct] = useState([])

    const [loading, setLoading] = useState(false)

    const [clicked1, setClicked1] = useState(false)
    const [clicked2, setClicked2] = useState(false)

    const [cols, setCols] = useState(4)



    const router = useRouter()


    const getProducts = async () => {
        try {
            setLoading(true)
            const { data } = await getSearchedProduct(keyword)
            if (data.success) {
                setProduct(data.Product)
                setLoading(false)
            }
            else {
                setLoading(false)
            }
        } catch (error) {
            console.log("Error fetching product", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [keyword])

    return (
        <div className='pt-[6rem] h-full'>

            {loading ?
                <div className="flex justify-center items-center h-[80vh] ">
                    <CircularProgress label="Loading..." />
                </div>
                :
                <>
                    <div className=" border-2 w-full h-[20vh] my-10 p-5 shadow-md bg-blue-100 lg:h-[10vh] ">

                        <p className='font-semibold cursor-pointer'><span
                            onClick={() => router.push('/')}>Home</span> </p>
                    </div>

                    <div className=" w-full h-[30vh] border-2 p-5 flex lg:h-[30vh] sm:flex-col sm:h-auto ">

                        <div className=" h-full w-full text-center lg:w-[50%] sm:w-full">
                            <h1 className=' text-5xl text-gray-400 font-semibold sm:text-3xl'>Limited time offer</h1>
                            <h2
                                className=' text-4xl text-black font-semibold sm:text-2xl'
                            >Grab Awesome Deals</h2>
                        </div>
                       
                    </div>

                    {product && product.length > 0 ?
                        <div className="w-full h-full  lg:mt-16 sm:flex-col items-center justify-center">
                            <div className=' flex justify-between items-center h-[50px] bg-gray-300 p-6'>
                                <div className="flex gap-8 sm:hidden">
                                    <button onClick={() => setCols(2)} className=' font-semibold cursor-pointer '>||</button>
                                    <button onClick={() => setCols(3)} className=' font-semibold cursor-pointer '>|||</button>
                                    <button onClick={() => setCols(4)} className=' font-semibold cursor-pointer '>||||</button>
                                </div>
                                <div>sort by</div>
                            </div>

                            <div className=" flex sm:flex-col">
                                <div className=" w-[23vw] h-full  py-5 sm:flex">
                                    <h1 className=' py-5 px-5'>Filter :</h1>

                                    <div className="  sm:flex-col">
                                        <div className="mb-3 w-full h-auto border-2 shadow-lg rounded-md sm:w-[80vw]">
                                            <div className=" bg-gray-300 shadow-md rounded-md p-5 ">
                                                <p onClick={() => { setClicked1(!clicked1), setClicked2(false) }}>Availability</p>
                                            </div>
                                            <div className={` bg-white p-5 ${clicked1 ? '' : 'sm:hidden'}`}>
                                                <p className='pb-3'>In stock</p>
                                                <p className='pb-3'>Out of Stock</p>
                                            </div>
                                        </div>

                                        <div className="mb-3 w-full h-auto border-2 shadow-lg rounded-md sm:w-[80vw]">
                                            <div className=" bg-gray-300 shadow-md rounded-md p-5 ">
                                                <p onClick={() => { setClicked2(!clicked2), setClicked1(false) }}>Price range</p>
                                            </div>
                                            <div className={` bg-white p-5 ${clicked2 ? '' : 'sm:hidden'}`}>
                                                <p className='pb-3'>In stock</p>
                                                <p className='pb-3'>Out of Stock</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={` grid ${cols == 4 ? 'grid-cols-4' : cols === 3 ? 'grid-cols-3' : 'grid-cols-2'} h-full w-[78vw] gap-4 p-4 sm:grid-cols-2 sm:w-[100%]`}>
                                    {product.map((i) => (
                                        <ProductCard
                                            data={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        :
                        <div className='w-full h-[30vh] flex flex-col justify-center items-center'>
                            <h1 className=' font-bold text-5xl '>No Product </h1>
                            <h1 className=' font-bold text-5xl '>Come Back Later</h1>
                        </div>
                    }
                </>
            }

        </div>
    )
}

export default page
