'use client'
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { userSchema } from '@/ValidationSchemas/user'

import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import axios from "axios";
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'

type UserFormData = z.infer<typeof userSchema>

interface Props {
    user?: User
}

const UserForm = ({ user }: Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    const form = useForm<UserFormData>({
        resolver: zodResolver(userSchema)
    })

    async function onsubmit(values: z.infer<typeof userSchema>) {
        try {
            setIsSubmitting(true)
            setError("")

            if (user) {
                await axios.patch("/api/users/" + user.id, values)
            } else {

                await axios.post("/api/users", values)
            }

            setIsSubmitting(false)

            router.push("/tickets")
            router.refresh()
        } catch (error) {
            console.log(error)
            setError("unknown error occured")
            setIsSubmitting(false)
        }
    }

    return (
        <div className='rounded-md border w-full p-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name="name"
                        defaultValue={user?.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter users full name...' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="username"
                        defaultValue={user?.username}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter Username...' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="password"
                        defaultValue=""
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input type='password' required={user ? false : true} placeholder='Enter password...' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    <div className='flex w-full space-x-4'>
                        <FormField
                            name='role'
                            control={form.control}
                            defaultValue={user?.role}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Role..." defaultValue={user?.role} />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            <SelectItem value='USER'>User</SelectItem>
                                            <SelectItem value='TECH'>Tech</SelectItem>
                                            <SelectItem value='ADMIN'>Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                    </div>
                    <Button type='submit' disabled={isSubmitting}>{user ? "UpdateUser" : "Create User"}</Button>
                </form>
            </Form>
            <p className='text-destructive'>{error}</p>
        </div>
    )
}

export default UserForm