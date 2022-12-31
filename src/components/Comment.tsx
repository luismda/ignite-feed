import { useState } from 'react'
import { ThumbsUp, Trash } from 'phosphor-react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'

import style from './Comment.module.css'

interface CommentProps {
    id: number;
    author: {
        avatarUrl: string;
        name: string;
    };
    content: string;
    commentedAt: Date;
    numberLikes: number;
    onDeleteComment: (commentId: number) => void;
}

export function Comment({ id, author, content, commentedAt, numberLikes, onDeleteComment }: CommentProps) {
    const [likeCount, setLikeCount] = useState(numberLikes)

    const commentedDateFormated = format(commentedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const commentedDateRelativeToNow = formatDistanceToNow(commentedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleDeleteComment() {
        onDeleteComment(id)
    }

    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1
        })
    }

    return (
        <div className={style.comment}>
            <Avatar 
                hasBorder={false} 
                src={author.avatarUrl} 
            />

            <div className={style.commentBox}>
                <div className={style.commentContent}>
                    <header>
                        <div className={style.authorAndTime}>
                            <strong>{author.name}</strong>
                            <time 
                                title={commentedDateFormated}
                                dateTime={commentedAt.toISOString()}
                            >
                                {commentedDateRelativeToNow}
                            </time>
                        </div>

                        <button title="Deletar comentário" onClick={handleDeleteComment}>
                            <Trash size={24} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp size={20} weight="bold" />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}