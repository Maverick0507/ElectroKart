'use client';
import jwt from 'jsonwebtoken';
import DropdownMenu from '@/components/DropMenu/index';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import SearchDropMenu from '@/components/SearchDropMenu'
import { useAuth } from '@/context/authContext';
import { IoIosArrowDown } from "react-icons/io";
import { CgSearch } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Index = () => {
  const [dropItem, setDropItem] = useState(false);
  const [dropSearchBar, setDropSearchBar] = useState(false);
  const [mobileNavShow, setMobileNavShow] = useState(false);

  const router = useRouter()
  const path = usePathname()


  const [auth] = useAuth();

  
  const show = () => {
    setDropItem(!dropItem);
  };
  const hide = () => {
    setDropItem(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropItem) {
        hide();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropItem]);




  // style

  const liStyle = `text-black font-semibold hover:text-gray-700 cursor-pointer transition ease-out hover:border-b-2 hover:border-black`;
  const liStyle2 = `text-black text-2xl font-bold cursor-pointer transition ease-out hover:text-gray-700 `;




  return (
    <div className="fixed top-0 bg-black  w-full z-20">

      <div className='h-[20%] border-2 bg-white p-5 flex justify-between items-center '>

        <div className="mobile-btn hidden md:block">
          {mobileNavShow ? <IoMdClose className=' cursor-pointer' onClick={() => setMobileNavShow(!mobileNavShow)} /> : <GiHamburgerMenu className=' cursor-pointer' onClick={() => setMobileNavShow(!mobileNavShow)} />}
        </div>

        <div className="">
          <p onClick={() => router.push('/')} className='font-bold text-lg cursor-pointer'>ElctroMart</p>
        </div>

        <motion.div
          className={`md:bg-white md:shadow-xl md:rounded-md md:w-[30%] md:absolute top-[100%] p-4 ${mobileNavShow ? 'left-0' : 'left-[100%]'}`}
          animate={{ left: mobileNavShow ? 0 : '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <ul className={`flex justify-between items-center gap-10 md:flex-col md:items-start `}>
            <li
              onClick={() => router.push('/')}
              className={`${liStyle} ${path === '/' ? 'border-black border-b-2 ' : ''}`}
            >
              Home
            </li>
            <li
              onMouseEnter={show}
              className={`${liStyle} flex justify-center items-center gap-1`}
            >
              Store
              <IoIosArrowDown />
            </li>
            <li className={liStyle}>
              Computers
            </li>
            <li className={liStyle}>
              Phones
            </li>
            <li className={liStyle}>
              Gaming
            </li>
          </ul>
        </motion.div>

        <div className="btns">
          <ul className='flex justify-between items-center gap-4'>

            <li onClick={() => setDropSearchBar(!dropSearchBar)} className={`${liStyle2}`}><CgSearch /></li>
            <li className={`${liStyle2}`}><IoCartOutline /></li>
            <li
              onClick={() => {
                if (auth?.user) {
                  router.push(
                    auth?.user?.role === 'customer' ? '/profile' :
                      auth?.user?.role === 'admin' ? '/adminprofile' :
                        '/login'
                  );
                } else {
                  router.push('/login');
                }
              }}
              className={`${liStyle2} ${path === '/login' ? 'font-bold underline text-gray-700' : ''}`}
            >
              <IoPersonOutline />
            </li>
          </ul>
        </div>

      </div>

      {dropItem ? (
        <DropdownMenu className='transition-opacity duration-1000 opacity-100 ' />
      ) : null}

      <div>
        {dropSearchBar ? (<SearchDropMenu condition={dropSearchBar} />) : null}
      </div>
    </div>

  );
};

export default Index;
