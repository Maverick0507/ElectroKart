'use client'

import { useAuth } from '@/context/authContext';
import { logout } from '@/services/auth/logout';
import { Tabs, Tab, Card, CardBody, Input, Button, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, {  useLayoutEffect, useState } from 'react';

const Page = () => {

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        if (auth) {
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


  // update user function is not completed yet
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
          <h1 className='font-bold text-xl'>Product Order</h1>
          <p>You haven't order any Product  yet.</p>
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
