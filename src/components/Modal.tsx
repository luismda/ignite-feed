import { useRef, useEffect } from 'react'

import { useModal } from '../hooks/useModal' 

import style from './Modal.module.css'

export function Modal() {
    const dialog = useRef<HTMLDialogElement>(null)
    
    const modal = useModal()

    function showModal() {
        if (modal.isModalOpen) {
            return dialog.current?.showModal()
        }

        dialog.current?.close()
    }

    useEffect(() => {
        showModal()
    }, [modal.isModalOpen])

    function handleCloseModal() {
        modal.close()
    }

    function handleConfirmModal() {
        modal.close()
        modal.onConfirm()
    }

    return (
        <dialog ref={dialog} className={style.modal}>
            <h2>Excluir comentário</h2>

            <p>Você tem certeza que gostaria de excluir este comentário?</p>

            <footer>
                <button className={style.cancelButton} onClick={handleCloseModal}>Cancelar</button>
                <button className={style.confirmButton} onClick={handleConfirmModal}>Sim, excluir</button>
            </footer>
        </dialog>
    )
}