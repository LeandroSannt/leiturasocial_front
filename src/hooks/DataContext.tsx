import React,{createContext,useCallback,useContext} from 'react'

import api from '../services/api'

import { queryClient } from '../services/queryClient'
import { useQuery } from 'react-query'

interface User{
  id:string;
  name:string;
  surname:string;
  telephone:string;
  email:string;
  avatar:string;
  created_at:string;
  has_followers:number;
}

interface postCredentials{
  descriptionValue:string | undefined;
}


interface IUserProps{
  id:string
  name:string;
  surname:string;
  avatar:string;
  email:string
  has_followers:number
}

interface BookProps{
  id:string
  title:string
  sinopse:string
  photo:string
}

interface CommentsPosts{
  id:string;
  description:string;
  created_at:string;
  user:User
  book:BookProps

}

interface IPostsProps{
  id:string;
  description:string;
  user_id:string;
  created_at:string;
  user:User;
  comments?:Array<CommentsPosts>
  countComments:number;
}

interface PostContextState{
  data:Array<IPostsProps> | undefined;
  users:Array<IUserProps> | undefined;
  handlePublication(description:postCredentials):void
  handleComment( 
    description:string | undefined,
    post_id:string  | undefined,
    book_id:string | undefined
  ):void
  handleFollow(user_id:string):void
  handleUnFollow(user_id:string):void
}
//iniciando um contexto vazio precisa colocar o as e o nome da interface
const PostsContext = createContext<PostContextState>({} as PostContextState)

const PostsProvider:React.FC = ({children}) => {

  const {data} = useQuery<IPostsProps[]>('publications', async () =>{
    const response = await api.get('/publications')
    return response.data
  }
  )

  const users = useQuery<IUserProps[]>('users', async () =>{
    const response = await api.get('/user')

    return response.data
  }
  )

  const handlePublication = useCallback(async ({descriptionValue}) => {

    await api.post('/posts',{
     description: descriptionValue
    })

    await queryClient.invalidateQueries(['publications'])
  }, [])

  const handleComment = useCallback(async (description,post_id,book_id) => {

    await api.post('/comments',{
     description,
     post_id,
     book_id
    })

    await queryClient.invalidateQueries(['publications'])
  }, [])

  const handleFollow = async (user_id:string) => {
    await api.post('/follower/follow',{
      user_id
    })
    await queryClient.invalidateQueries(['users'])
  }

  const handleUnFollow = async (user_id:string ) => {

    await api.delete(`/follower/${user_id}`)

    await queryClient.invalidateQueries(['users'])

  }

  return (
    <PostsContext.Provider value ={{handleUnFollow,handleFollow,handleComment,handlePublication,data, users:users.data}}>
     {children}
     </PostsContext.Provider>
  )
}

function useData(): PostContextState{
  const context = useContext(PostsContext)

  if(!context) {
    throw new Error('insira o authprovider ao redor do seu elemento')
  }
  return context
}

export {PostsProvider, useData}
