import UserForm from '@/components/UserForm'
import React from 'react'
import DataTableSimple from './data-table-simple'
import prisma from '@/prisma/db'
import { getServerSession } from 'next-auth'
import options from '../api/auth/[...nextauth]/options'

const Users= async()=> {
  const session = await getServerSession(options)

  const users = await prisma.user.findMany()

  if(session?.user.role !== "ADMIN") {
    return <p className='text-destructive'>admin access reqiured</p>
  }
  return (
    <div>
      <UserForm />
      <DataTableSimple users={users} />
    </div>
  )
}

export default Users