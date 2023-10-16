import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Comment } from './Comment'
import styles from './Post.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'


export function Post({ author, publishedAt, content }) {
  const [comments, SetComments] = useState(['Post muito bacana, hein?!'])

  const [newCommentText, setNewCommentText] = useState('')


  //modificando datas npm install date-fns
  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment() {
    //Não redirecionar o usuário para outra página
    event.preventDefault();

    //PROGRAMAÇÃO INTERATIVA:

    //pega o valor(value) digitado no text area (area de comentários):
    // const newCommentText = event.target.comment.value

    //limpar a text area do que foi digitado anteriormente:
    // event.target.comment.value = "";

    //imutabilidade
    SetComments([...comments, newCommentText])//pega o numero de comments ja existente e cria um sempre com 1 número a mais
    //spread operator lê o valor da variável comments no caso.

    //PROGRAMAÇÃO DECLARATIVA
    setNewCommentText('');
  }

  function handleNewCommentChange() {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  //function utilizada como uma prop do componente filho Comments para se comunicar com o componente pai Post
  function deleteComment(commentToDelete) {
    const commentsWithoutDeleteOne = comments.filter(comment => {
      return comment !== commentToDelete
    })

    SetComments(commentsWithoutDeleteOne);
  }

  //para não colocar condicionais dentro do disabled do botão assim: disabled={newCommentText.length === 0}>  criamos uma nova const:
  const isNewCommentEmpty = newCommentText.length === 0;

  return ( /*HTML*/
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          }
          else if (line.type === 'Link') {
            return <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}
      </div>


      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>deixe seu feedback</strong>

        <textarea name='comment' placeholder='Escreva um comentário...'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        {/*disabled: botão desabilitado caso o tamanho seja de 0, ou seja nada escrito na text area */}
        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
        })}
      </div>
    </article>
  )
}