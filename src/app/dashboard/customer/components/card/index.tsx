"use client";
import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactDOM from 'react-dom';
import { ImSpinner10 } from "react-icons/im";
import { RiErrorWarningLine } from "react-icons/ri";

export function CardCustomer({ customer }: { customer: CustomerProps }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);

    async function handleDeleteCustomer() {
        setLoading(true);
        try {
            const response = await api.delete("/api/customer", {
                params: {
                    id: customer.id,
                },
            });
            router.refresh();
        } catch (error: any) {
            console.log(error);
            if (error.response && error.response.data.message === "failure to delete customer with open tickets") {
                setDialogVisible(true);
            }
        } finally {
            setLoading(false);
        }
    }

    const Dialog = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow">
                <div className=" flex mt-4 mb-4 justify-center">
                    <RiErrorWarningLine size={32} color='#ff2313'/>
                </div>
                <p>Não é possível deletar clientes com tickets abertos.</p>
                <p>Encerre os chamados e volte para deletar o cliente.</p>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-1 rounded mt-4"
                        onClick={() => setDialogVisible(false)}
                    >
                        Fechar
                    </button>
                </div>
                
            </div>
        </div>
    );

    return (
        <>
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
            <h2>Nome: {customer.name}</h2>
            <p><span className="font-bold">Email: </span>{customer.email}</p>
            <p><span className="font-bold">Telefone: </span>{customer.phone}</p>
            <button
                className="bg-red-500 text-white px-4 rounded mt-2 w-20 flex items-center justify-center h-8"
                onClick={handleDeleteCustomer}
                disabled={loading}
            >
                {loading ? <ImSpinner10 className="animate-spin" size={18}/> : "Deletar"}
            </button>
        </article>
        {dialogVisible && ReactDOM.createPortal(<Dialog />, document.body)}
    </>
    );
}
