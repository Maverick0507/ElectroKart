'use client'
import { getSingleProduct } from '@/services/admin/product'
import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Slider } from "@nextui-org/react";

const page = ({ params }) => {
    const productId = params.id
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)

    const [mainImg, setMainImg] = useState(0)

    const getProduct = async () => {
        try {
            setLoading(true)
            const { data } = await getSingleProduct(productId)
            if (data.success) {
                setProduct(data.Product)
                setLoading(false)
            }
            else {
                console.log("technical error while getting product")
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className='pt-[6rem] w-full h-full'>
        {loading ? (
            <div className="flex justify-center items-center h-[80vh]">
                <CircularProgress label="Loading..." />
            </div>
        ) : (
            <div className='flex gap-10 p-10'>
                <div className="h-[70vh] w-[40%]">
                    <div className="w-full h-[70%]">
                        <img
                            className='h-[100%] w-full'
                            src={product?.photos?.[mainImg]}
                            alt="product photos"
                        />
                    </div>
                    <div className="w-full h-[30%] flex justify-between items-center mt-5 shadow-lg p-3">
                        {product.photos?.map((photo, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImg(index)}
                                className='h-full w-[20%] p-4 border-1 border-black rounded-md cursor-pointer'
                            >
                                <img
                                    className='h-full rounded-md w-full'
                                    src={photo}
                                    alt={`product photo ${index}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="h-[100vh] w-[60%] bg-pink-300 px-10">
                    <p>
                        <span>Home</span>/ <span>{product.productName}</span>
                    </p>

                    <h1>{product.productName}</h1>

                    <h1>{product.price}</h1>

                    <Slider
                        label={`Items left in stock: `}
                        isDisabled
                        step={1}
                        maxValue={500}
                        minValue={0}
                        defaultValue={product.quantity}
                        className="max-w-md"
                    />

                    <h1>Color:</h1>

                    <Button>Add to cart</Button>
                    <Button>Buy now</Button>
                </div>
            </div>
        )}
    </div>
    )
}

export default page
