'use client'

import { fetchSingleCategory } from '@/services/category'
import { getAllProducts, getFilterProduct } from '@/services/product'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard/index'
import { CircularProgress, Slider } from '@nextui-org/react'


const page = ({id  }) => {
    const subCategoryId = id

    const [product, setProduct] = useState([])
    const [subCategory, setSubCategory] = useState({})

    const [loading, setLoading] = useState(false)

    const [clicked1, setClicked1] = useState(false)
    const [clicked2, setClicked2] = useState(false)

    const [cols, setCols] = useState(4)

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(50000);


    // for filtering product api to make it seperate
    const keyword = null



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
            setLoading(true)
            const { data } = await getAllProducts(subCategoryId)
            if (data.success) {
                setProduct(data.AllProduct)
                setLoading(false)
            }
            else {
                alert(`Error fetching product`)
                setLoading(false)
            }
        } catch (error) {
            console.log("Error fetching product", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getSingleSubCategory()
        getProducts()
    }, [subCategoryId])



    const handleSliderChange = async (values) => {
        const [newMinValue, newMaxValue] = values;
        const { data } = await getFilterProduct(newMinValue, newMaxValue, subCategoryId, keyword);
        if (data.success === true) {
            setProduct(data.Product);
        }
    };

    useEffect(() => {
        handleSliderChange([minValue, maxValue]);
    }, [minValue, maxValue]);

    return (
        <div className='pt-[6rem] h-full'>

            {loading ?
                <div className="flex justify-center items-center h-[80vh] ">
                    <CircularProgress label="Loading..." />
                </div>
                :
                <>
                    <div className=" border-2 w-full h-[20vh] my-10 p-5 shadow-md bg-blue-100 lg:h-[10vh] ">
                        <p className=' font-bold text-xl'>{subCategory.name}</p>

                        <p className='font-semibold cursor-pointer'><span
                            onClick={() => router.push('/')}>Home</span> / <span
                                onClick={() => router.push(`/products/${subCategoryId}`)}>{subCategory.name}</span></p>
                    </div>

                    <div className=" w-full h-[50vh] border-2 p-5 flex lg:h-[30vh] sm:flex-col sm:h-auto ">

                        <div className=" h-full w-[60%] flex justify-center items-center flex-col lg:w-[50%] sm:w-full">
                            <h1 className=' text-5xl text-gray-400 font-semibold sm:text-3xl'>Limited time offer</h1>
                            <h2
                                className=' text-4xl text-black font-semibold sm:text-2xl'
                            >Grab Awesome Deals</h2>
                        </div>
                        <div className=" h-full w-[40%] border-2 lg:w-[50%] sm:w-full sm:h-[20vh] sm:mt-5">
                            <img
                                className=' w-full h-full object-fit'
                                src={subCategory.photos} alt="subCategory image" />
                        </div>
                    </div>


                    <div className="w-full h-full  lg:mt-16 sm:flex-col items-center justify-center">
                        <div className=' flex justify-between items-center h-[50px] bg-gray-300 p-6'>
                            <div className="flex gap-8 sm:hidden">
                                <p onClick={() => setCols(1)}
                                    className=' font-semibold cursor-pointer '>|</p>
                                <p onClick={() => setCols(2)}
                                    className=' font-semibold cursor-pointer '>||</p>
                                <p onClick={() => setCols(3)}
                                    className=' font-semibold cursor-pointer '>|||</p>
                            </div>
                            <div>sort by</div>
                        </div>

                        <div className=" flex sm:flex-col">
                            {/* filters */}
                            <div className=" w-[23vw] h-full  py-5 sm:flex">
                                <h1 className=' py-5 px-5'>Filter :</h1>

                                <div className="  sm:flex-col">
                                    {/* stock filter */}


                                    {/* price filter */}
                                    <div className="mb-3 w-full h-auto border-2 shadow-lg rounded-md sm:w-[80vw]">
                                        <div className=" bg-gray-300 shadow-md rounded-md p-5 ">
                                            <p onClick={() => { setClicked2(!clicked2), setClicked1(false) }}>Price range</p>
                                        </div>
                                        <div className={` bg-white p-5 ${clicked2 ? '' : 'sm:hidden'}`}>
                                            <Slider
                                                label="Price Range"
                                                step={1000}
                                                minValue={minValue}
                                                maxValue={maxValue}
                                                defaultValue={[0, 50000]}
                                                formatOptions={{ style: "currency", currency: "INR" }}
                                                onChange={handleSliderChange}
                                                className="max-w-full"
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* products */}
                            {product && product.length > 0 ?
                                <div className={` grid ${cols == 3 ? 'grid-cols-3' : cols === 2 ? 'grid-cols-2' : cols === 1 ? 'grid-cols-1' : 'grid-cols-3'} h-full w-[78vw] gap-4 p-4 sm:grid-cols-2 sm:w-[100%] `}>
                                    {product.map((i) => (
                                        <ProductCard
                                            data={i} />
                                    ))}
                                </div>
                                :
                                <div className='w-full h-[30vh] flex flex-col justify-center items-center'>
                                    <h1 className=' font-bold text-5xl '>No Product </h1>
                                    <h1 className=' font-bold text-5xl '>Come Back Later</h1>
                                </div>
                            }
                        </div>

                    </div>

                </>
            }

        </div>
    )
}

export default page
