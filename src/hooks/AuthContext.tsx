import React,{ createContext, useCallback, useContext, useState } from 'react'

import api from '../services/api'
import { queryClient } from '../services/queryClient'

interface SignInCredentials{
  email:string;
  password:string;
}

interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
  telephone:string
  surname:string
  isAdmin:boolean
}

interface AuthContextState{
  user:User;
  signIn(credentials:SignInCredentials):Promise<void>;
  signOut():void;
  updateUser(user: User): void;
}

interface AuthState{
  token:string;
  user:User
}

//iniciando um contexto vazio precisa colocar o as e o nome da interface
const AuthContext = createContext<AuthContextState>({} as AuthContextState)

const AuthProvider:React.FC = ({children}) => {

  const [data,setData] =useState<AuthState>(()=>{
    const token = localStorage.getItem("@desafio:token")
    const user =localStorage.getItem("@desafio")

    if(token && user){
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      return {token,user:JSON.parse(user)}
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({email,password}) => {
    const response = await api.post('/session',{
      email,
      password
    })

    const {token,user} = response.data

    localStorage.setItem("@desafio:token",token)
    localStorage.setItem("@desafio",JSON.stringify(user))

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    // await queryClient.invalidateQueries(['users'])
    // await queryClient.invalidateQueries(['publications'])

    setData({token,user})
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem("@desafio:token")
    localStorage.removeItem("@desafio")

    setData({} as AuthState)

  },[])

  const updateUser = useCallback(
   async (user: User) => {
      localStorage.setItem('@desafio', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
      await queryClient.invalidateQueries(['users'])
      await queryClient.invalidateQueries(['publications'])

    },


    [setData, data.token],
  );

  return (
    <AuthContext.Provider value ={{updateUser ,user:data.user, signIn,signOut}}>
     {children}
     </AuthContext.Provider>
  )
}

function useAuth(): AuthContextState{
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error('insira o authprovider ao redor do seu elemento')
  }
  return context
}

export {AuthProvider, useAuth}
