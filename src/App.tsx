import { ModalContextProvider } from './contexts/ModalContext'

import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Post, Author, Content, Comment } from './components/Post'

import style from './App.module.css'

import './global.css'

interface PostData {
  id: number;
  author: Author;
  content: Content[];
  comments: Comment[];
  publishedAt: Date;
}

const posts: PostData[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO @Rocketseat'
    },
    content: [
      { id: 1, type: 'paragraph', content: 'Falaaa dev 👋' },
      { id: 2, type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { id: 3, type: 'link', content: 'diego.design/doctorcare' },
      { id: 4, type: 'hashtags', content: '#novoprojeto#nlw#rocketseat' }
    ],
    comments: [{
      id: 1,
      author: {
        avatarUrl: 'https://github.com/maykbrito.png',
        name: 'Mayk Brito'
      },
      comment: 'Parabéns! Muito bacana 👏👏',
      commentedAt: new Date('2022-12-23 08:48:32'),
      numberLikes: 11
    }],
    publishedAt: new Date('2022-12-23 08:22:37')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/rodrigorgtic.png',
      name: 'Rodrigo Gonçalves',
      role: 'Educator @Rocketseat'
    },
    content: [
      { id: 5, type: 'paragraph', content: 'Falaaa dev 👍👍' },
      { id: 6, type: 'paragraph', content: 'Acabei de subir mais um app. É um projeto que fiz usando React Native para o Ignite da Rocketseat. O nome do projeto é AppLegal 🚀' },
      { id: 7, type: 'link', content: 'rodrigo.dev.app/applegal' },
      { id: 8, type: 'hashtags', content: '#reactnative#ignite#rocketseat' }
    ],
    comments: [{
      id: 2,
      author: {
        avatarUrl: 'https://github.com/maykbrito.png',
        name: 'Mayk Brito'
      },
      comment: 'Sensacional! Continue assim. 🤝👊',
      commentedAt: new Date('2022-12-21 10:48:30'),
      numberLikes: 11
    },{
      id: 3,
      author: {
        avatarUrl: 'https://github.com/jakeliny.png',
        name: 'Jakeliny'
      },
      comment: 'Isso aí, sempre em direção do próximo nível 🚀',
      commentedAt: new Date('2022-12-22 12:02:11'),
      numberLikes: 19
    }],
    publishedAt: new Date('2022-12-21 09:17:01')
  }
]

export function App() {
  return (
    <ModalContextProvider>
      <div>
        <Header />

        <div className={style.wrapper}>
          <Sidebar />

          <main>
            {posts.map(post => {
              return (
                <Post 
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  comments={post.comments}
                  publishedAt={post.publishedAt}
                />
              )
            })}
          </main>
        </div>
      </div>
    </ModalContextProvider>
  )
}