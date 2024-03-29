'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";

const index = ({ data, page }) => {
    const router = useRouter()
    const [imgAnimate, setImgAnimate] = useState(false)

    const productPageStyle = 'w-[100%] h-[60vh] border-2 mb-2 shadow-md rounded-md lg:h-[35vh] md:h-[40vh] sm:h-[55vh]'
    const homePageStyle = 'w-[80%] h-[60vh] border-2 mb-2 shadow-md rounded-md lg:h-[30vh] xs:mx-auto xs:h-[40vh] xs:max-h-[50vh]'

    const productPageImageStyle = 'w-full h-[60%] border-2 relative'
    const homePageImageStyle = 'w-full h-[55%]  border-2  relative'


    return (
        <div
            key={data._id}
            className={page === 'homePage' ? homePageStyle : productPageStyle}>

            {/* product image */}
            <div
                onClick={() => router.push(`/product/${data._id}`)}
                className={`${page==='homePage' ? homePageImageStyle : productPageImageStyle} `}>
                <img
                    onMouseEnter={() => setImgAnimate(true)}
                    onMouseLeave={() => setImgAnimate(false)}
                    className={`w-full h-full rounded-md hover:cursor-pointer ${imgAnimate ? ' transition-opacity ease-out duration-300' : ''}`}
                    src={imgAnimate ? data.photos[0] : data.photos[1]}
                    alt="product image"
                /> <div className='bg-white absolute right-0 top-[80%]  rounded-full text-black'>
                    <CiCirclePlus className='text-3xl' />
                </div>
            </div>
            {/* product data */}
            <div className="w-full h-[40%] p-4 lg:h-[10vh] ">
                <p className=' font-bold text-xl mb-2'>{data.productName}</p>
                <p className=' font-semibold text-lg mb-2'>From {data.price}</p>
                <div className='flex gap-3'>
                    {data.colors.map((color, index) => (
                        <div
                            key={index}
                            style={{ background: `${color}` }}
                            className="h-[1.5rem] w-[1.5rem] rounded-full border-2"
                        >
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default index
