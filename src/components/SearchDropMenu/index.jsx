import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineCancel } from 'react-icons/md';

const Index = ({ condition }) => {
  const [show, setShow] = useState(condition);

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: show ? "0%" : "-100%" }}
      transition={{ duration: 0.5 }} 
      className={`w-[100vw] h-[40vh] bg-slate-200 absolute top-0 flex gap-4 justify-center items-center`}
    >
      <input
        className='h-[13%] w-[50%] p-7 rounded-lg text-black font-semibold'
        placeholder="search......"
        type="search"
      />
      <MdOutlineCancel
        onClick={() => setShow(!show)}
        className='font-bold text-3xl cursor-pointer'
      />
    </motion.div>
  );
};

export default Index;
