'use client'
import { getAllUserOrder } from '@/services/admin'
import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const Page = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const getOrders = async () => {
        try {
            setLoading(true);
            const { data } = await getAllUserOrder();
            console.log(data);
            if (data.success) {
                setOrders(data.orders);
                setLoading(false);
            } else {
                alert(`${data.message}`);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const [status, setStatus] = useState([
        "not process", "Processing", "Shipping", "Shipped"
      ])

    return (
        <div className=' pt-[6rem]'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table isStriped aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>USER NAME</TableColumn>
                        <TableColumn>USER EMAIL</TableColumn>
                        <TableColumn>USER ADDRESS</TableColumn>
                        <TableColumn>PRODUCT - PRICE</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                    </TableHeader>

                    <TableBody>
                        {orders.map((order, index) => (
                            <TableRow key={index}>
                                <TableCell>{order?.buyer?.name}</TableCell>
                                <TableCell>{order?.buyer?.email}</TableCell>
                                <TableCell>{order?.buyer?.address}</TableCell>
                                <TableCell>
                                    {order.products.map((product, productIndex) => (
                                        <div key={productIndex}>
                                            {product.productName} - {product.price}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button
                                                variant="bordered"
                                            >
                                                {order?.status}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Dynamic Actions" >
                                            {status.map((i)=>(
                                                <DropdownItem>
                                                    {i}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default Page;
