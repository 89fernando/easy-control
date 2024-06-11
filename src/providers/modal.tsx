"use client";

import { ModalTicket } from "@/components/modal";
import { ReactNode, useState, createContext } from "react";

interface ModalContextData {
    visible: boolean;
    handleModalVisible: () => void;
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(true);

    function handleModalVisible() {
        setVisible(!visible);
    }
    return (
        <ModalContext.Provider value={{ visible, handleModalVisible }}>
            {visible && <ModalTicket /> }
            {children}
        </ModalContext.Provider>
    )
}