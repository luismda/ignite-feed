import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import { useModal } from '../hooks/useModal'

import style from './Post.module.css'

export interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

export interface Content {
    id: number;
    type: 'paragraph' | 'link' | 'hashtags';
    content: string;
}

export interface Comment {
    id: number;
    author: {
        avatarUrl: string;
        name: string;
    };
    comment: string;
    commentedAt: Date;
    numberLikes: number;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
    comments: Comment[];
}

export function Post({ author, publishedAt, content, comments: existingComments }: PostProps) {
    const [comments, setComments] = useState(existingComments)
    const [newCommentText, setNewCommentText] = useState('')

    const modal = useModal()

    const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()

        const lastCommentId = comments[comments.length-1].id

        const newComment: Comment = {
            id: lastCommentId+1,
            author: {
                avatarUrl: 'https://github.com/luismda.png',
                name: 'Luís Miguel'
            },
            comment: newCommentText,
            numberLikes: 0,
            commentedAt: new Date()
        }

        setComments([...comments, newComment])
        setNewCommentText('')
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')

        setNewCommentText(event.target.value)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório.')
    }

    function showModalToConfirmDeleteComment(commentId: number) {
        modal.open({
            onConfirm: () => deleteComment(commentId)
        })
    }

    function deleteComment(commentId: number) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment.id !== commentId
        })

        setComments(commentsWithoutDeletedOne)
    }

    const isNewCommentEmpty = newCommentText.trim().length === 0

    return (
        <>
            <article className={style.post}>
                <header>
                    <div className={style.author}>
                        <Avatar src={author.avatarUrl} />

                        <div className={style.authorInfo}>
                            <strong>{author.name}</strong>
                            <span>{author.role}</span>
                        </div>
                    </div>

                    <time 
                        title={publishedDateFormated} 
                        dateTime={publishedAt.toISOString()}
                    >
                        {publishedDateRelativeToNow}
                    </time>
                </header>

                <div className={style.content}>
                    {content.map(line => {
                        if (line.type === 'paragraph') {
                            return <p key={line.id}>{line.content}</p>
                        } else if (line.type === 'link') {
                            return <p key={line.id}><a href="#">{line.content}</a></p>
                        } else if (line.type === 'hashtags') {
                            return (
                                <p key={line.id}>
                                    {line.content.split('#').map(hashtag => {
                                        return hashtag !== '' ? <a key={hashtag} href="#">#{hashtag}{' '}</a> : ''
                                    })}
                                </p>
                            )
                        }
                    })}
                </div>

                <form onSubmit={handleCreateNewComment} className={style.commentForm}>
                    <strong>Deixe seu feedback</strong>

                    <textarea 
                        placeholder="Escreva um comentário..."
                        value={newCommentText}
                        onChange={handleNewCommentChange}
                        onInvalid={handleNewCommentInvalid}
                        required
                    />

                    <footer>
                        <button type="submit" disabled={isNewCommentEmpty}>
                            Publicar
                        </button>
                    </footer>
                </form>

                <div className={style.commentList}>
                    {comments.map(({ id, author, comment, numberLikes, commentedAt }) => {
                        return (
                            <Comment 
                                key={id} 
                                id={id}
                                author={author}
                                content={comment} 
                                numberLikes={numberLikes}
                                commentedAt={commentedAt}
                                onDeleteComment={showModalToConfirmDeleteComment}
                            />
                        )
                    })}
                </div>
            </article>
        </>
    )
}