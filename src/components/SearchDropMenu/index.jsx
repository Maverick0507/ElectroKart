'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineCancel } from 'react-icons/md';
import { useRouter } from 'next/navigation'

const Index = ({ condition }) => {
  const [show, setShow] = useState(condition);
  const [search, setsearch] = useState('')

  const router = useRouter()

  const handleSearch = async (e) => {
    e.preventDefault();
    router.push(`/search/${search}`)
    setShow(!show)
  }

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: show ? "0%" : "-100%" }}
      transition={{ duration: 0.5 }}
      className={`w-[100vw] h-[40vh] bg-slate-200 absolute top-0 flex gap-4 justify-center items-center z-50`}
    >
      <form className='h-[13%] w-[70%] flex justify-center items-center gap-4 text-black font-semibold'
        onSubmit={handleSearch}>
        <input
          className='h-[3rem] w-full p-3 rounded-md outline-none border-1 border-gray-400'
          placeholder="search......"
          type="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />

        <MdOutlineCancel
          onClick={() => setShow(!show)}
          className='font-bold text-3xl cursor-pointer'
        />
      </form>

    </motion.div>
  );
};

export default Index;
