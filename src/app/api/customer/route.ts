import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";


// Rota para buscar todos os clientes

export async function GET (request: Request){
    const { searchParams } = new URL(request.url);
    const customerEmail = searchParams.get("email");

    if(!customerEmail || customerEmail === ""){
        return NextResponse.json({ message: "Email not found"}, { status: 400 })
    }

    try{
        const customer = await prismaClient.customer.findFirst({
            where: {
                email: customerEmail
            }
        })
        return NextResponse.json(customer)

    }catch(error){
        return NextResponse.json({ message: "Customer not found"}, { status: 400 })
    }
}

// Rota para cadastrar um cliente
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

// Rota para deletar um cliente
export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
        return NextResponse.json({ message: "Id not found" }, { status: 400 });
    }

    const findTickets = await prismaClient.ticket.findFirst({
        where: {
            customerId: userId,
            status: "ABERTO",
        },
    });

    if (findTickets) {
        return NextResponse.json({ message: "failure to delete customer with open tickets" }, { status: 400 });
    }

    try {
        await prismaClient.customer.delete({
            where: {
                id: userId as string,
            },
        });
        return NextResponse.json({ message: "Success delete customer" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed delete customer" }, { status: 400 });
    }
}
