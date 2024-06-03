import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";
export async function POST(request: Request){
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 })

    }
    const { name, email, phone, address, userId} = await request.json();
    
    try{
        await prismaClient.customer.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : "",
                userId: userId
            }
        })

        return NextResponse.json({ message: "Success create new customer"}, { status: 200 })
        
    }catch(error){
        return NextResponse.json({ message: "Failed create new customer"}, { status: 400 })
    }

}