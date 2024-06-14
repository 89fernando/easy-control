import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TicketItem } from "./components/ticket";
import prismaClient from "@/lib/prisma";
import ButtonRefresh from "./components/buttonRefresh";
export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        redirect("/")
    }

    const tickets = await prismaClient.ticket.findMany({
        where: {
            status: "ABERTO",
            customer: {
                userId: session.user.id
            }
        },
        include: {
            customer: true
        },
        orderBy: {
            created_at: "desc"
        }
    })
    
    return(
        <Container>
           <main className="mt-9 mb-2">
            <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Chamados</h1>
                    <div className="flex items-center gap-3">
                        <ButtonRefresh />
                        <Link href='/dashboard/new' className="bg-blue-500 px-4 py-1 rounded text-white">
                            Abrir chamado
                        </Link>
                    </div>    
                </div>
                {tickets.length > 0 && (
                    <table className="min-w-full my-2">
                        <thead>
                            <tr>
                                <th className="font-medium text-left pl-1">CLIENTE</th>
                                <th className="font-medium text-left hidden sm:block">DATA CADASTRO</th>
                                <th className="font-medium text-left">STATUS</th>
                                <th className="font-medium text-left">AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <TicketItem 
                                    key={ticket.id}
                                    ticket={ticket}
                                    customer={ticket.customer}
                                />
                            ))

                            }
                        </tbody>
                    </table>
                )}
                {tickets.length === 0 && (
                    <h1 className="text-center text-lg my-24 text-gray-600 pt-2">Nenhum ticket foi encontrado.</h1>
                )

                }
           </main>
        </Container>
    )
}