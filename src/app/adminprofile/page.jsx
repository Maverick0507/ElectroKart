'use client'

import { useAuth } from '@/context/authContext';
import { logout } from '@/services/auth/logout';
import { token } from '@/services/auth/token';
import { Tabs, Tab, Card, CardBody, Input, Button, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect,useState } from 'react';

const Page = () => {

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await token();
        if (!data.token) {
          router.push('/login');
        }
       
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Run only on mount

  const [auth, setAuth] = useAuth();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const router = useRouter();

  const [name, setName] = useState(auth?.user?.name);
  const [email, setEmail] = useState(auth?.user?.email);
  const [password, setPassword] = useState('');

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      // Assuming you have a `logout` function for logging out
      const { data } = await logout();

      if (data.success) {
        alert(data.message);
        localStorage.removeItem('auth');
        setAuth(null);
        setLogoutLoading(false);
        router.push('/login');
      } else {
        alert(data.message);
        setLogoutLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // empty function
  const handleUpdate = async () => {
   
  };

  return (
    <div className='flex flex-col w-full pt-[6rem]'>
      <div className="flex justify-between items-center p-4 border-b-[2px] w-[90%] m-auto border-black">
        <h1 className='font-bold text-2xl text-center'>My Account</h1>
        <Button onClick={handleLogout}>
          {logoutLoading ? <Spinner color='warning' /> : 'Log out'}
        </Button>
      </div>

      <div className="w-[90%] m-auto flex justify-between  mt-12">
        <div className="order">
          <h1 className='font-bold text-xl'>Product Deatils</h1>
          <p>You haven't added any Product or Category yet.</p>

          <div className="flex flex-col gap-5 mt-4">
            <Button
              onClick={() => router.push('/admin/addproduct')}
              className='bg-red-200'>
              Add Product
            </Button>
            <Button
              onClick={() => router.push('/admin/addcategory')}
              className='bg-yellow-200'>
              Add Category
            </Button>
          </div>

        </div>
        <div className="profile">
          <Tabs aria-label="Options" >
            <Tab key="Sign in" title="Account Details" className=''>
              <Card className="md:w-[40vw] w-[50vw]">
                <CardBody>
                  <form action="" className="flex flex-col justify-between items-center">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mb-[2rem]"
                      type="text"
                      label="Name"
                      placeholder="Enter your name"
                    />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mb-[2rem]"
                      type="email"
                      label="Email"
                      placeholder="Enter your email"
                    />
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mb-[2rem]"
                      type="password"
                      label="Password"
                      placeholder="Enter your password"
                    />
                    <Button onClick={handleUpdate}>
                      {updateLoading ? <Spinner color='warning' /> : 'Update'}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Page;
