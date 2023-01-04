import { useContext } from 'react'

import { ModalContext, ModalContextDataProps } from '../contexts/ModalContext'

export function useModal(): ModalContextDataProps {
    const context = useContext(ModalContext)

    return context
}