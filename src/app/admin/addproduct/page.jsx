import { Button } from '@nextui-org/react'
import React from 'react'

const page = () => {
  const inputStyle = `
  w-full
  p-5
  mb-4 
  rounded-md
  border-1
  border-black
  outline-none
  bg-white
  `
  return (
    <div className='pt-[8rem] pb-[3rem] w-full h-full text-center '>
      ADD PRODUCT
      <div className=" flex items-center justify-center h-full w-full mt-3">
        <form className=' flex flex-col items-center justify-evenly w-[50%] '>
          <div className=" relative w-full">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Product name</label>
            <input className={inputStyle} type="text" placeholder='Enter product name' ></input>
          </div>
          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Description</label>
            <textarea className={inputStyle} type="text" placeholder='Enter description' ></textarea>
          </div>
          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Category name</label>
            <input className={inputStyle} type="text" placeholder='Enter category ' ></input>
          </div>
          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Enter Product price</label>
            <input className={inputStyle} type="text" placeholder='Enter product price' ></input>
          </div>
          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Enter Product color</label>
            <input className={inputStyle} type="text" placeholder='Enter product color' ></input>
          </div>
          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>on Sale</label>
            <select className={inputStyle} name="onSale" defaultValue="no" placeholder='on sale'>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

          </div>
          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Discounted price</label>
            <input className={inputStyle} type="text" placeholder='Enter discounted price' ></input>
          </div>
          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>FInal price</label>
            <input className={inputStyle} type="text" placeholder='Enter final price' ></input>
          </div>
          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Quantity</label>
            <input className={inputStyle} type="text" placeholder='Enter quantity' ></input>
          </div>
          <Button className='w-full p-4 shadow-md'>Add Product</Button>
        </form>
      </div>
    </div>
  )
}

export default page
