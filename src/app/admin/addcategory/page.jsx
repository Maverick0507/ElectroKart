'use client';
import { addCategory, deleteCategory, fetchCategory } from '@/services/admin/category';
import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const createCategory = async () => {
    try {
      const { data } = await addCategory(name);
      if (data.success) {
        setCategories([...categories, data.newCategory]);
        await getAllCategories();
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert(data.message);
    }
  };

  const removeCategory = async (id) => {
    try {
      const { data } = await deleteCategory(id);
      if (data.success) {
        alert(data.message);
        await getAllCategories();
      } else {
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await fetchCategory();
      if (data.success) {
        setCategories(data.AllCategory);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error getting categories:', error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className='pt-[6rem] min-h-[100vh] bg-gray-600 py-8'>
      <div className="flex flex-col justify-center items-center mt-6 gap-5">
        <input
          type="text"
          placeholder='Add new category'
          onChange={(e) => setName(e.target.value)}
          className="mt-3 p-5 bg-gray-200 rounded-lg w-[40%] outline-none text-black shadow-xl"
        />
        <Button
          onClick={createCategory}
          className='bg-red-300 shadow-md text-white font-semibold w-[20vw]'>
          Submit
        </Button>
      </div>

      <div className="mt-12 w-[60%] mx-auto">
        <Table aria-label="Category Table">
          <TableHeader>
            <TableColumn>Category</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>

          <TableBody>
            {categories.map((cat) => (
              cat ? (
                <TableRow key={cat._id}>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell className='flex gap-4'>
                    <CiEdit className='text-lg font-semibold cursor-pointer hover:text-blue-500 transition-colors duration-300' />
                    <MdDelete
                      onClick={() => removeCategory(cat._id)}
                      className='font-semibold text-red-600 text-lg cursor-pointer hover:text-red-800 transition-colors duration-300' />
                  </TableCell>
                </TableRow>
              ) : null
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
