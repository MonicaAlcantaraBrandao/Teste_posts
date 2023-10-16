import { Post } from "./components/Post";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import styles from './App.module.css';

import './global.css'

//author:{avatar-url:"", name:"",role:""}
//publishedAt:Date
//content: string 
const posts = [{
  id: 1,
  author: {
    avatarUrl: 'https://github.com/moniak666.png',
    name: 'Mônica Alcântara',
    role: 'CTO @Rocketseat'
  },
  content: [
    { type: 'paragraph', content: 'Fala galeraa 👋' },

    { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },

    { type: 'Link', content: '👉 jane.design/doctorcare' },
  ],
  publishedAt: new Date('2023-08-25 20:46:00')
},
{
  id: 2,
  author: {
    avatarUrl: 'https://github.com/diego3g.png',
    name: 'Diego Fernandes',
    role: 'Educator @Rocketseat'
  },
  content: [
    { type: 'paragraph', content: 'Fala galeraa 👋' },

    { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },

    { type: 'Link', content: '👉 jane.design/doctorcare' },
  ],
  publishedAt: new Date('2023-08-20 20:00:00')
},

];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}> {/*aside= sidebar, main= posts */}
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}

/* ForEach NÃO TEM RETORNO
<main>
{posts.forEach(post => {
            <Post />
          })} */