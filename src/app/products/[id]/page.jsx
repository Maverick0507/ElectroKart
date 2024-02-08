import React from 'react'
import Product from './Product'

export const metadata = {
    title: "Products",
    description: "Electromart products",
  };

const page = ({ params }) => {
    return (
        <div>
            <Product id={params.id} />
        </div>
    )
}

export default page
