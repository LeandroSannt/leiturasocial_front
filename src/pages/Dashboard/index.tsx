import React ,{FormEvent, useRef, useState}from "react";
import {Container,Content,Publishes,Publication,Comments} from './styles'
import { queryClient } from "../../services/queryClient";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SidebarUsers";

import {useAuth} from '../../hooks/AuthContext'
import {useData} from '../../hooks/DataContext'
import {useToast} from '../../hooks/ToastContext'
import {useSidebar} from '../../hooks/SidebarActive'

import 'moment/locale/pt-br'
import moment from 'moment'
import { AiOutlineComment } from 'react-icons/ai';
import {GiHamburgerMenu} from 'react-icons/gi'
import { Link } from "react-router-dom";
import api from "../../services/api";

import AutoComplete from 'react-autocomplete'
import { useQuery } from "react-query";


interface BookProps{
  id:string
  title:string
  sinopse:string
  photo:string
}

const Dashboard: React.FC = () =>{ 
  moment.locale('pt-br')

  const refDescription = useRef<HTMLInputElement>(null)
  const refComment = useRef<HTMLInputElement>(null)

  const [activeCommenters,setActiveCommenters] = useState(false)
  const [linkPage,setLinkPage] = useState('')
  let [link,setLink] = useState('')
  const [bookId,setBookId] = useState('')
  const [bookMark,setbookMark] = useState<BookProps[]>([])
  const [postId,setPostId] = useState("")
  const {data,handlePublication, handleComment} = useData()
  const {user} = useAuth()
  const {addToast} = useToast()
  const {setIsActive,isActive} = useSidebar()

  const commenters = (id:string,index:number) =>{

    setPostId(id)
    
    data?.forEach((post) =>{
      if(post.id === id){
        setActiveCommenters(!activeCommenters)
      } 
    })
  }

  const handleSubmit = async (event:FormEvent) =>{
    event.preventDefault();

    const descriptionValue =refDescription.current?.value

    try{

    if(!descriptionValue){
      throw Error("Campo obrigatorio")
    }

    if(descriptionValue.length < 500){

      handlePublication({descriptionValue})

      addToast({
        title:'Publicada com sucesso',
        type:"success",
        description:"Sua publicação foi postada com sucesso"
      })

    await queryClient.invalidateQueries(['users'])
    }
    else{
      throw Error("So é possivel digitar no maximo 500 caracteres")
    }

    }catch(error:any){
      addToast({
        title:'Aconteceu um error',
        type:"error",
        description:error.message
      })
    }
  }

  const submmitComment = async (post_id:string) => {

    const comment = refComment.current?.value

    try{
      if(!comment){
        throw Error("Campo obrigatorio")
      }

      if(comment.length < 150){

      handleComment(comment,post_id,bookId)

      addToast({
        title:'Publicado com sucesso',
        type:"success",
        description:"Seu comentario foi publicado"
      })

      }else{
        throw Error("So é possivel digitar no maximo 150 caracteres")
      }

    }catch(error:any){
      addToast({
        title:'Aconteceu um error',
        type:"error",
        description:error.message
      })
    }

  }

  const response = useQuery<BookProps[]>(['bookUnic',link], async () =>{
    const response = await api.get(`/books/mark`,{
      params:{
        title:link
      }
    })
    return response.data
  })

  const selectedBook = (book:BookProps) =>{
    setBookId(book.id)
    return book.title
  }
  
  return(
    <>
      <Header/>

      <Container>
      <GiHamburgerMenu className={"absolutsvg"} size={25} onClick ={() =>setIsActive(!isActive)}/>
        <Content>
            <Publishes>
            <form action="" onSubmit={handleSubmit}>
              <h2>Bem vindo,  { user.name}</h2>
              <div>
                <div>
                  {user.avatar ?
                  <img src={`http://localhost:4000/${user.avatar}`} alt={'fe'} />
                  :
                  <img src='http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon' alt="foto padrao" />
                  }

                </div>
                <input type="text" ref={refDescription}  placeholder="Escreva uma publicação" />
                <button type="submit" className="btn" >Publicar</button>
              </div>
            </form>

            {data?.map((post,index) =>(
            <Publication>
              <header key={post.id} className="header-publication">
                <div>
                  <div>
                    {post.user.avatar ? 
                    <img src={`http://localhost:4000/${post.user.avatar}`} alt="" />
                    :
                    <img src='http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon' alt="foto padrao" />
                  }
                  </div>
                  <div className="name-publisher">
                    <p>publicado por:</p>
                    <h6>{post.user.name} {post.user.surname}</h6>
                  </div>
                </div>
                <span>{moment(post.created_at).calendar() }</span>
              </header>

              <p className="publication">{post.description}</p>

              <div className="hover-commenter" onClick={() =>commenters(post.id,index)}>
                <AiOutlineComment/>
                <span >Comentarios</span>
                <span>{post.countComments > 0 && post.countComments}</span>
              </div>
              {postId === post.id  && 

              <Comments activeCommenter={activeCommenters} className="commenter">
                <div className="comments">
                  <div>
                    <div className="comments-content-img">
                      {user.avatar ?
                      <img src={`http://localhost:4000/${user.avatar}`} alt={user.name} />
                      :
                       <img src='http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon' alt="foto padrao" />
                      }

                    </div>
                    <input type="text" ref={refComment} placeholder="Escreva um comentario" required ={true} />
                    <div className="btn" onClick={() => submmitComment(post.id)}>Comentar</div>
                  </div>
                  <div className="mark">

                  <AutoComplete
                    getItemValue={(item) => selectedBook(item)}
                    items={response.data ? response.data : []}
                    renderItem={(item, isHighlighted) =>
                      <div style={{position:"initial", background: isHighlighted ? '#d3d3d3' : '#fff' }}>
                        {item.title}
                      </div>
                    }
                    renderInput={(props) =>{
                      return <input {...props} placeholder="Mencione um livro" />
                    }}

                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    onSelect={(val) => setLink(val)}
                  />

                    
                  </div> 

                  {post.comments?.map((comment) =>(
                    <div key={comment.id} className="userCommenter">
                      <div className="imageContent">

                      {comment.user.avatar ?
                        <img src={`http://localhost:4000/${comment.user.avatar}`} alt={comment.user.name} />
                      :
                       <img src='http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon' alt="foto padrao" />
                      }

                      </div>
                      <article className="hour-published">
                        <div>
                          <h4 className="user-comment">{comment.user.name}</h4>
                          <p>{comment.description}</p>
                        </div>
                        
                        <div className="infoBook">
                          <div>
                            <span>publicado</span>
                            <h6>{moment(comment.created_at).calendar()}</h6>
                          </div>
                          <div className="book">
                            <Link to={`/book/${comment.book?.id}`}>
                              { comment.book?.photo &&
                              <p style={{display:"flex",flexDirection:'column',alignItems:"center"}}>
                                
                                <span>
                              Recomendação do livro:

                                </span>
                              {comment.book?.title}
                              </p>
                              }
                              {
                                comment.book?.photo &&
                                <img src={`http://localhost:4000/${comment.book?.photo}`} alt={comment.book?.title} />
                              }
                            </Link>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div> 
                
              </Comments> 

               }
            </Publication>
            ))}

          </Publishes>

        </Content>
        <Sidebar/>
      </Container>
    </>
  )}

export default Dashboard