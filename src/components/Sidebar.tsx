import { PencilSimpleLine } from 'phosphor-react'

import style from './Sidebar.module.css'

import { Avatar } from './Avatar'

export function Sidebar() {
    return (
        <aside className={style.sidebar}>
            <img 
                className={style.cover}
                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
            />

            <div className={style.profile}>
                <Avatar src="https://github.com/luismda.png" />

                <strong>Luís Miguel</strong>
                <span>Full Stack Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilSimpleLine size={20} weight="bold" />
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    )
}