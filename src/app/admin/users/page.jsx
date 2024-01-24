'use client'
import { getAllUser } from '@/services/admin'
import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,Spinner } from "@nextui-org/react";



const page = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const getUsers = async () => {
        try {
            setLoading(true)
            const { data } = await getAllUser()
            if (data.success) {
                setUsers(data.users)
                setLoading(false)
            }
            else {
                alert(`${data.message}`)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className=' pt-[6rem]'>
            {loading
                ?
                <Spinner className=' flex justify-center items-center h-[50vh]' label="User Loading..." color="warning" />
                :
                <Table isStriped aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>EMAIL</TableColumn>
                        <TableColumn>ADDRESS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key="4">
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }

        </div>
    )
}

export default page
