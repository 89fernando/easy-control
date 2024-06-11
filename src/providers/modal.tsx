"use client";

import { ModalTicket } from "@/components/modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { ReactNode, useState, createContext } from "react";

interface ModalContextData {
    visible: boolean;
    handleModalVisible: () => void;
    ticket: TicketInfo | undefined;
}

interface TicketInfo {
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [ticket, setTicket] = useState<TicketInfo>()

    function handleModalVisible() {
        setVisible(!visible);
    }
    return (
        <ModalContext.Provider value={{ visible, handleModalVisible, ticket }}>
            {visible && <ModalTicket /> }
            {children}
        </ModalContext.Provider>
    )
}