'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";

const index = ({ data }) => {
    const router = useRouter()
    const [imgAnimate, setImgAnimate] = useState(false)
    return (
        <div
            key={data._id}
            className=" w-[23vw] h-[60vh] border-2 mb-2 shadow-md rounded-md ">

            {/* product image */}
            <div 
            onClick={()=>router.push(`/product/${data._id}`)}
            className="w-full h-[60%] border-2 relative ">
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
            <div className="w-full h-[40%] p-4">
                <p className=' font-bold text-2xl mb-2'>{data.productName}</p>
                <p className=' font-bold text-xl mb-2'>From {data.price}</p>
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
