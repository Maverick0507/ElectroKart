'use client'
import { getSingleProduct } from '@/services/product'
import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Slider, Accordion, AccordionItem } from "@nextui-org/react";
import { MdRateReview, MdDescription } from "react-icons/md";
import { useCart } from '@/context/cartContext';

const page = ({ params }) => {
    const productId = params.id
    const [product, setProduct] = useState({})
    const [productName, setProductName] = useState('')
    const [loading, setLoading] = useState(false)
    

    const [mainImg, setMainImg] = useState(0)

    //    detail of product to add in cart
    const [color, setColor] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [image, setImage] = useState('')

    // context
    const [cart, setCart] = useCart()

    // add to cart product 
    const cartProduct = {
        productId,
        color,
        totalPrice,
        productName,
        image
    }


    const addToCart = async () => {
        setTotalPrice(product.price)
        if (productId && color  && totalPrice) {
            const updatedCart = [...cart, cartProduct]
            setCart(updatedCart)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            alert("item added to cart")
        }
        else {
            alert('Please select quantity and color before adding to cart.')
        }
    }

    const getProduct = async () => {
        try {
            setLoading(true)
            const { data } = await getSingleProduct(productId)
            if (data.success) {
                setProduct(data.Product)
                setProductName(data.Product.productName)
                setImage(data.Product.photos[0])
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
        <div className='pt-[6rem] w-full h-full '>
            {loading ? (
                <div className="flex justify-center items-center h-[80vh]">
                    <CircularProgress label="Loading..." />
                </div>
            ) : (
                <>
                    <div className='flex gap-10 p-10 sm:flex-col sm:gap-0 sm:p-4'>
                        {/* image section */}
                        <div className="h-[70vh] w-[40%] sm:w-full   sm:h-[60vh]">
                            <div className="w-full h-[70%] lg:h-[50%]  sm:h-[70%]">
                                <img
                                    className='h-[100%] w-full'
                                    src={product?.photos?.[mainImg]}
                                    alt="product photos"
                                />
                            </div>
                            <div className="w-full h-[30%] flex justify-between items-center mt-5 shadow-lg p-3 lg:h-[10%] lg:p-0  sm:h-auto sm:w-[100%] sm:flex-wrap sm:gap-[10px] ">
                                {product.photos?.map((photo, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setMainImg(index)}
                                        className='h-full w-[20%] p-4 border-1 border-black rounded-md cursor-pointer lg:p-0 sm:h-[4rem] sm:border-none'
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

                        {/* product data section */}
                        <div className="h-[100%] w-[60%] bg-white px-10 sm:w-full sm:mt-4">
                            <p className=' text-gray-300 text-xl mb-8'>
                                <span>Home</span>/ <span>{product.productName}</span>
                            </p>

                            {/* product name */}
                            <h1 className=' font-bold text-3xl mb-5'>{product.productName}</h1>

                            {/* product price */}
                            <h1 className=' font-semibold text-2xl mb-4'><span className=' text-gray-400'>Price :</span>{product.price}</h1>
                        

                            {/* product color */}
                            <div className=' flex gap-5  items-center my-5 sm:flex-wrap'>
                                <h1>Color:</h1>
                                {product?.colors?.map((i) => (
                                    <p onClick={() => setColor(i)}
                                        className=' capitalize hover:cursor-pointer hover:bg-gray-400 hover:text-white hover:border-white ease-in duration-200  border-2 border-black rounded-md p-[5px] '>{i}</p>
                                ))}
                            </div>

                            {/* product quantity btn,  add to cart btn,  buy now btn */}
                            <div className=" flex flex-col gap-10 my-9">
                                <div className=" flex gap-10 w-[70%] lg:w-[90%] md:w-full md:flex-col">
                                    
                                    <Button
                                        onClick={() => addToCart()}
                                        className=' p-5 rounded-none'>Add to cart</Button>
                                </div>
                                <Button className=' rounded-none p-5 w-[64%] lg:w-[86%] md:w-full'>Buy Now</Button>

                            </div>

                            {/* product description */}
                            <Accordion>
                                <AccordionItem key="1" aria-label="Description" title="Description"
                                    indicator={<MdDescription />}
                                >
                                    {product?.description}
                                </AccordionItem>

                            </Accordion>


                            {/* product review */}
                            <Accordion>
                                <AccordionItem key="1" aria-label="Description" title="Review"
                                    indicator={<MdRateReview />}
                                >
                                    <p>No review yet</p>
                                </AccordionItem>

                            </Accordion>

                        </div>
                    </div>


                </>
            )}
        </div>
    )
}

export default page
