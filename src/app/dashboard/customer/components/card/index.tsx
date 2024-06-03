import { CustomerProps } from "@/utils/customer.type";

export function CardCustomer({ customer }: {customer: CustomerProps}){
    return(
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
            <h2>Nome: {customer.name}</h2>
            <p><a className="font-bold">Email: </a>{customer.email}</p>
            <p><a className="font-bold">Telefone: </a>{customer.phone}</p>
            <button className="bg-red-500 text-white px-4 rounded mt-2 self-start">
                Deletar
            </button>
        </article>
    )
}