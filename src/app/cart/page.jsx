'use client'
import { useCart } from '@/context/cartContext'
import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button} from "@nextui-org/react";
import emptycart from '../../../public/image/emptycart.jpeg'
import Image from 'next/image';
import { useAuth } from '@/context/authContext';
import BuyProduct from '@/components/Razorpay/BuyProduct';



const page = () => {


  const [cart, setCart] = useCart()
  const [totalAmount, setTotalAmount] = useState(0)



  useEffect(() => {
    const newTotalAmount = cart.reduce((sum, product) => sum + product.totalPrice, 0);
    setTotalAmount(newTotalAmount);
  }, [cart]);


  const removeProduct = (pid) => {
    try {
      let newCart = [...cart]
      let index = newCart.findIndex((item) => item.productID === pid)
      newCart.splice(index, 1);
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    } catch (error) {
      console.log(error);

    }
  }







return (
  <div className=' pt-[6rem]'>
    {cart.length > 0 ?
      <>
        <div className=' shadow-md mb-5'>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Product Image</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Color</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn></TableColumn>
            </TableHeader>
            <TableBody>
              {cart.map((product) => (
                <TableRow key={product.productID}>
                  <TableCell>
                    <img
                      className=' h-[6rem] w-[10rem] shadow-md border-2 rounded-md hover:cursor-pointer'
                      src={product.image}
                    /></TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.totalPrice}</TableCell>
                  <TableCell><Button className=' bg-red-300  text-white'
                    onClick={() => removeProduct(product.productID)}>Remove</Button></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className=' flex justify-center items-center gap-10'>
          <p className=' font-semibold text-xl'>Total: {totalAmount}</p>
        
           <p><BuyProduct/></p>

        </div>

      
      </>
      :
      <>
        <main className="flex flex-col items-center justify-center gap-6 p-4 md:p-6">
          <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          <div className="border shadow-sm rounded-lg p-6">
            <Image
              alt="Empty cart image"
              className="aspect-square rounded-md object-cover mx-auto mb-4"
              height="128"
              src={emptycart}
              width="128"
            />
            <h2 className="font-medium text-xl text-center">Your cart is currently empty.</h2>
            <p className="text-center">Looks like you haven't added any products yet. Start shopping to fill your cart!</p>
          </div>
          <div className="flex items-center justify-center">
            <Button size="lg">Start Shopping</Button>
          </div>
        </main>

      </>

    }

  </div>
)
}

export default page
