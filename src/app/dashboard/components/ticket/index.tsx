"use client";
import { api } from "@/lib/api";
import { ModalContext } from "@/providers/modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FiCheckSquare, FiFile, FiTrash, FiTrash2 } from "react-icons/fi";
import { ImSpinner10 } from "react-icons/im";

interface TicketItemProps {
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export function TicketItem({ ticket, customer }: TicketItemProps) {
    const router = useRouter();
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext);
    const [loading, setLoading] = useState(false);

    async function handleChangeStatus() {
        setLoading(true);
        try {
            const response = await api.patch("/api/ticket", {
                id: ticket.id,
            });
            router.refresh();
        } catch (error) {
            console.error("Error changing status:", error);
        } finally {
            setLoading(false);
        }
    }

    function handleOpenModal() {
        handleModalVisible();
        setDetailTicket({
            customer: customer,
            ticket: ticket,
        });
    }

    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
                <td className="text-left pl-1">{customer?.name}</td>
                <td className="text-left hidden sm:table-cell">
                    {customer?.created_at?.toLocaleDateString("pt-br")}
                </td>
                <td className="text-left">
                    <span className="bg-green-500 px-2 py-1 rounded-lg">{ticket.status}</span>
                </td>
                <td className="text-left">
                    <button className="mr-3" disabled={loading}>
                        {loading ? (
                            <ImSpinner10 className="animate-spin" size={24} color="#F44336" />
                        ) : (
                            <FiCheckSquare
                                size={24}
                                color="#F44336"
                                onClick={handleChangeStatus}
                            />
                        )}
                    </button>
                    <button onClick={handleOpenModal} disabled={loading}>
                        <FiFile size={24} color="#3B82F6" />
                    </button>
                </td>
            </tr>
        </>
    );
}
