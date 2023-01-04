import { createContext, ReactNode, useState } from 'react'

import { Modal } from '../components/Modal'

interface ModalConfig {
    onConfirm: () => void;
}

export interface ModalContextDataProps {
    isModalOpen: boolean;
    open: (config: ModalConfig) => void;
    close: () => void;
    onConfirm: () => void;
}

export const ModalContext = createContext({} as ModalContextDataProps)

interface ModalContextProviderProps {
    children: ReactNode;
}

export function ModalContextProvider({ children }: ModalContextProviderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalConfig, setModalConfig] = useState<ModalConfig>({} as ModalConfig)

    function open({ onConfirm }: ModalConfig) {
        setIsModalOpen(true)
        setModalConfig({ onConfirm })
    }

    function close() {
        setIsModalOpen(false)
    }

    function onConfirm() {
        modalConfig.onConfirm()
    }

    return (
        <ModalContext.Provider value={{ isModalOpen, open, close, onConfirm }}>
            {children}

            <Modal />
        </ModalContext.Provider>
    )
}