import prisma from "@/prisma/db";
import { userSchema } from "@/ValidationSchemas/user";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import options from "../../auth/[...nextauth]/options";


interface Props {
    params: {
        id: string
    }
}

export async function PATCH(request: NextRequest, { params }: Props) {
   
    const session = await getServerSession(options)

    if (!session) {
        return NextResponse.json({ error: "not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const validation = userSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!user) {
        return NextResponse.json({ error: "user not fount" }, { status: 404 })
    }

    if (body?.password && body.password != "") {
        const hashPassword = await bcrypt.hash(body.password, 10)
        body.password = hashPassword
    } else {
        delete body.password
    }

    if (user.username !== body.username) {
        const duplicateUsername = await prisma.user.findUnique({
            where: { username: body.username }
        })

        if (duplicateUsername) {
            return NextResponse.json({ error: "user not fount" }, { status: 404 })
        }
    }

    const updateUser = await prisma.user.update({
        where: {id:user.id},
        data: {
            ...body
        }
    })

    return NextResponse.json(updateUser)
} 