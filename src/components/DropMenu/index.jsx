import React from 'react';
import { motion } from 'framer-motion';

const Index = () => {
  const electronic = {
    SmartPhone: ['samsung', 'iphone', 'redmi', 'pocco'],
    Television: ['samsung', 'iphone', 'redmi', 'pocco'],
    Headphone: ['samsung', 'iphone', 'redmi', 'pocco'],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className='absolute left-10 md:left-[32%] right-10 h-auto md:h-[50vh] md:w-[65vw]  rounded-lg flex shadow-xl bg-gray-200'
    >
      {Object.keys(electronic).map((key) => (
        <div
          className='w-full p-4'
        >
          <h3 className='text-black text-lg md:text-[1rem] underline font-bold uppercase'>{key}</h3>
          <ul className='inline-block'>
            {electronic[key].map((item) => (
              <li
              
                className='font-semibold text-gray-600 mt-2 hover:bg-white hover:text-gray-600 transition ease-in-out cursor-pointer rounded-md p-2 text-center'
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
};

export default Index;
