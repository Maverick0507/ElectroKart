'use client';
import { Button } from '@nextui-org/react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import {  fetchCategory } from '@/services/category';
import { firebaseConfig } from '@/firebase';
import { CircularProgress } from "@nextui-org/react";
import { addProduct } from '@/services/product';

const Page = () => {
  const inputStyle = `
  w-full
  p-5
  mb-4 
  rounded-md
  border-1
  border-black
  outline-none
  bg-white
  `;
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [onSale, setOnSale] = useState('no');
  const [colors, setColors] = useState('');
  const [photos, setPhotos] = useState([]);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);

  const [parentCategory, setParentCategory] = useState('')

  const getAllCategories = async () => {
    try {
      const { data } = await fetchCategory({ type: 'category',limit:'0' });
      if (data.success) {
        setAllCategory(data.AllCategory);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error getting categories:', error);
    }
  };

  const getAllSubCategories = async () => {
    try {
      const { data } = await fetchCategory({type:'subCategory',parentCategory,limit:'0'});
      if (data.success) {
        setAllSubCategory(data.AllCategory);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error getting categories:', error);
    }
  };

  useEffect(() => {
    getAllCategories()
  }, []);

  useEffect(() => {

    getAllSubCategories()
  }, [parentCategory]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addProduct({
        productName,
        description,
        price,
        discountedPrice,
        colors,
        onSale,
        quantity,
        category,
        photos,
      })
      if (data.success) {
        alert(data.message);
        setProductName('')
        setDescription('')
        setPrice('')
        setDiscountedPrice('')
        setColors('')
        setOnSale('')
        setQuantity('')
        setCategory('')
        setPhotos('')
      }
      else {
        alert(data.message);
        setProductName('')
        setDescription('')
        setPrice('')
        setDiscountedPrice('')
        setColors('')
        setOnSale('')
        setQuantity('')
        setCategory('')
        setPhotos('')
      }
    } catch (error) {
      console.log(error)
    }
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app, 'gs://electromart-c0c39.appspot.com');

  const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 12);

    return `${getFile.name}-${timeStamp}-${randomString}`;
  };

  const helperForUploadingImageToFirebase = async (file) => {
    try {
      const startTime = new Date().getTime();

      const getFileName = createUniqueFileName(file);
      const storageReference = ref(storage, `ecommerce/${getFileName}`);
      const uploadImg = uploadBytesResumable(storageReference, file);

      return new Promise((resolve, reject) => {
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
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleImage = async (e) => {
    try {
      const selectedImages = Array.from(e.target.files);
      const extractImageUrls = await Promise.all(
        selectedImages.map((image) => helperForUploadingImageToFirebase(image))
      );
      setPhotos(extractImageUrls);
    } catch (error) {
      console.error('Error handling images:', error);
    }
  };



  return (
    <div className='pt-[8rem] pb-[3rem] w-full h-full text-center '>
      ADD PRODUCT
      <div className=" flex items-center justify-center h-full w-full mt-3">
        <form
          onSubmit={handleSubmit}
          className=' flex flex-col items-center justify-evenly w-[50%] '>
          <div className=" relative w-full">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Product name</label>
            <input
              className={inputStyle}
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder='Enter product name'
            />
          </div>

          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Description</label>
            <textarea
              className={inputStyle}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter description'
            />
          </div>
          <div className="relative w-full mt-2 mb-4">
            <div className="flex w-full flex-wrap gap-4">
              <Autocomplete label="Select Category" className="">
                {allCategory.map((item) => (
                  <AutocompleteItem
                    onClick={() => {
                      setCategory(item._id),
                      setParentCategory(item._id)
                    }}
                    key={item?._id}
                    value={item?.name}
                  >
                    {item?.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
          </div>


          <div className=" relative w-full mt-2 mb-4">
            <div className="flex w-full flex-wrap gap-4">
              <Autocomplete label="Select sub Category" className="">
                {allSubCategory.map((item) => (
                  <AutocompleteItem
                    onClick={() => setCategory(item._id)}
                    key={item?._id}
                    value={item?.name}
                  >
                    {item?.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
          </div>



          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Enter Product color</label>
            <input
              className={inputStyle}
              type="text"
              placeholder="Colors (comma-separated)"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
            />
          </div>

          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>on Sale</label>
            <select
              className={inputStyle}
              name="onSale"
              defaultValue="no"
              onChange={(e) => {
                setOnSale(e.target.value);
              }}
              placeholder='on sale'
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Enter Product price</label>
            <input
              className={inputStyle}
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Enter product price'
            />
          </div>

          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Discounted price</label>
            <input
              className={inputStyle}
              type="text"
              value={discountedPrice}
              onChange={(e) => setDiscountedPrice(e.target.value)}
              placeholder='Enter discounted price'
            />
          </div>

          <div className=" relative w-full mt-2">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Quantity</label>
            <input
              className={inputStyle}
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder='Enter quantity'
            />
          </div>

          <div className=" relative w-full mt-2 flex">
            <label className=' absolute top-[-14%] bg-[#F5F6FA]'>Image</label>
            <input
              className={inputStyle}
              id='photos'
              type="file"
              accept="image/*" // Allow only image files
              multiple
              onInput={handleImage}
            />
            {uploadProgress > 0 && (
              <CircularProgress
                aria-label="Loading..."
                size="lg"
                value={uploadProgress}
                color="warning"
                showValueLabel={true}
              />
            )}
          </div>
          <Button onClick={handleSubmit} className='w-full p-4 shadow-md'>Add Product</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
