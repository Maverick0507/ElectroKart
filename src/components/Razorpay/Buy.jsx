"use client"
import React, { useState } from "react";


const Buy = ({ makePayment, a }) => {

    const [isLoading, setIsLoading] = useState(false);


    const buttonClasses = `bg-black border-2 transition ease-in duration-200 text-white font-semibold py-2 px-4 rounded 
  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-black hover:text-black hover:bg-white'}
`;

    return (
        <div className="">
            <button
                onClick={() => {
                    makePayment({ productId: "example_ebook" });
                }}
                disabled={isLoading}
                className={buttonClasses}
            >
                {isLoading ? 'Processing...' : 'Buy Now'}
            </button>



        </div>
    );
};

export default Buy;