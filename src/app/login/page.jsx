'use client'
import React, { useState } from 'react';
import { Tabs, Tab, Card, CardBody, Input, Button, Spinner } from '@nextui-org/react';
import { signin } from '@/services/auth/signIn';
import { login } from '@/services/auth/logIn';
import { useAuth } from '@/context/authContext';
import { useCart } from '@/context/cartContext';
import { useRouter } from 'next/navigation';


const Page = () => {



    const initialSignInFormData = {
        email: '',
        password: '',
        name: '',
    };

    const initialLogInFormData = {
        email: '',
        password: '',
    };

    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const [loading, setLoading] = useState(false)

    const route = useRouter()

    const [loginFormData, setLoginFormData] = useState(initialLogInFormData);
    const [signinFormData, setSigninFormData] = useState(initialSignInFormData);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const { data } = await login(loginFormData);
            if (data.success) {
                setLoading(false);
                alert(data.message);
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token,
                });
                localStorage.setItem('auth', JSON.stringify({ user: data.user, token: data.token }));
                route.push('/');
            } else {
                alert(data.message);
                setLoading(false)
            }
        } catch (error) {
            console.error(error);

        }
    };

    const handleSignIn = async () => {
        try {
            setLoading(true)
            const res = await signin(signinFormData)
            if (res.success) {
                alert(res.data.message)
                setLoading(false)
            }
            else {
                alert(res.data.message)
                setLoading(false)
            }
        } catch (error) {
            console.error(error);

        }
    };

    return (
        <div className="flex w-full flex-col justify-center items-center mt-[7rem] h ">
            <Tabs aria-label="Options" className="">


               // log in
                <Tab key="Log in" title="Log in">
                    <Card className="md:w-[40vw] w-[50vw] sm:w-[80vw] sm:h-[30vh] sm:flex sm:justify-center sm:items-center">
                        <CardBody>
                            <form action="" className="flex flex-col justify-between items-center">
                                <Input
                                    value={loginFormData.email}
                                    onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
                                    className="mb-[2rem]"
                                    type="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                />

                                <Input
                                    value={loginFormData.password}
                                    onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                                    className="mb-[2rem]"
                                    type="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                />
                                <Button onClick={handleLogin}>

                                    {loading ? <Spinner color='warning' /> : 'Login'}
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </Tab>

        // sign in
                <Tab key="Sign in" title="Sign in">
                    <Card className="md:w-[40vw] w-[50vw] sm:w-[80vw] sm:h-[40vh] sm:flex sm:justify-center sm:items-center">
                        <CardBody>
                            <form action="" className="flex flex-col justify-between items-center">
                                <Input
                                    value={signinFormData.name}
                                    onChange={(e) => setSigninFormData({ ...signinFormData, name: e.target.value })}
                                    className="mb-[2rem]"
                                    type="text"
                                    label="Name"
                                    placeholder="Enter your name"
                                />
                                <Input
                                    value={signinFormData.email}
                                    onChange={(e) => setSigninFormData({ ...signinFormData, email: e.target.value })}
                                    className="mb-[2rem]"
                                    type="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                />
                                <Input
                                    value={signinFormData.password}
                                    onChange={(e) => setSigninFormData({ ...signinFormData, password: e.target.value })}
                                    className="mb-[2rem]"
                                    type="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                />
                                <Button onClick={handleSignIn}>
                                    {loading ? <Spinner color='warning' /> : 'Sign in'}

                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
};

export default Page;
