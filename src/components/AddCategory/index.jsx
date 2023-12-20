'use client';
import { addCategory, addSubCategory, deleteCategory, fetchCategory, updatSubCategory } from '@/services/admin/category';
import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, CircularProgress } from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';

import { useParams } from 'next/navigation'

import { firebaseConfig } from '@/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';


const index = ({ type }) => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [photos, setPhotos] = useState()



    const router = useRouter()
    const param = useParams()
    const parentCategory = param.id

    console.log(photos)

    const [uploadProgress, setUploadProgress] = useState(0);


    const createCategory = async () => {
        try {
            const { data } = await (type === 'category' ? addCategory(name) : addSubCategory(name, parentCategory, photos));
            if (data.success) {
                setCategories((prevCategories) => [...prevCategories, data.newCategory]);
                setName('');
                await getAllCategories();
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Error creating category');
        }
    };


    const updateCategory = async () => {
        try {
            const { data } = await (type === 'category' ? updateCategory(name, photos) : updatSubCategory(name, parentCategory, photos));
            if (data.success) {
                setCategories((prevCategories) => [...prevCategories, data.newCategory]);
                setName('');
                await getAllCategories();
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Error creating category');
        }
    };




    // sub category pending
    const removeCategory = async (id) => {
        try {
            const { data } = await deleteCategory(id, type);
            if (data.success) {
                alert(data.message);
                getAllCategories()
                setName('')
            } else {
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };


    const getAllCategories = async () => {
        try {
            const { data } = await fetchCategory({ type, parentCategory, limit: false });
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


    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app, 'gs://electromart-c0c39.appspot.com');

    const createUniqueFileName = (getFile) => {
        const timeStamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 12);
    
        return `${getFile.name}-${timeStamp}-${randomString}`;
    };
    
    const helperForUploadingImageToFirebase = (file) => {
        return new Promise(async (resolve, reject) => {
            try {
                const startTime = new Date().getTime();
                const getFileName = createUniqueFileName(file);
                const storageReference = ref(storage, `ecommerce/${getFileName}`);
                const uploadImg = uploadBytesResumable(storageReference, file);
    
                uploadImg.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    },
                    (error) => {
                        console.error(error);
                        reject(error);
                    },
                    () => {
                        const endTime = new Date().getTime();
                        const uploadTime = (endTime - startTime) / 1000;
                        console.log(`Image uploaded in ${uploadTime} seconds`);
    
                        setUploadProgress(0); // Reset progress after successful upload
    
                        getDownloadURL(uploadImg.snapshot.ref)
                            .then((downloadURL) => resolve(downloadURL))
                            .catch((error) => {
                                console.error(error);
                                reject(error);
                            });
                    }
                );
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    };
    
    const handleImage = async (event) => {
        try {
            const extractImageUrl = await helperForUploadingImageToFirebase(event.target.files[0]);
            if (extractImageUrl !== "") {
               setPhotos(extractImageUrl)
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    


    return (
        <div className=' min-h-[100vh] bg-gray-600 py-8'>
            <div className="flex flex-col justify-center items-center mt-6 gap-5">
                <input
                    type="text"
                    placeholder={`Add new ${type}`}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-3 p-5 bg-gray-200 rounded-lg w-[40%] outline-none text-black shadow-xl"
                    value={name}
                />
                <input
                    id='photos'
                    type="file"
                    accept="image/*" // Allow only image files
                    onInput={handleImage}
                />
                <Button
                    onClick={createCategory}
                    className='bg-red-300 shadow-md text-white font-semibold w-[20vw]'>
                    Submit
                </Button>
            </div>

            <div className="mt-12 w-[60%] mx-auto">
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>{type}</TableColumn>
                        <TableColumn>Image</TableColumn>
                        <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {categories.map((cat) => (
                            cat ? (
                                <TableRow key={cat._id}>
                                    {type === 'category' ?
                                        <TableCell className=' cursor-pointer  shadow-md rounded-sm bg-gray-100 hover:bg-gray-200'
                                            onClick={() => router.push(`/admin/addSubCategory/${cat._id}`)}>
                                            {cat.name}
                                        </TableCell>
                                        :
                                        <TableCell className=' cursor-pointer  shadow-md rounded-sm bg-gray-100 hover:bg-gray-200'
                                        >
                                            {cat.name}
                                        </TableCell>
                                    }

                                    <TableCell className=''>
                                        <img 
                                        className='h-[10rem] w-[18rem]'
                                        src={cat.photos} />
                                    </TableCell>

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

export default index;


