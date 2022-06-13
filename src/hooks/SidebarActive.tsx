import React,{createContext, useState,useContext} from 'react'
interface SidebarContextState{
  isActive:boolean
  setIsActive(value:boolean):void
}

//iniciando um contexto vazio precisa colocar o as e o nome da interface
const SidebarContext = createContext<SidebarContextState>({} as SidebarContextState)

const SidebarProvider:React.FC = ({children}) => {

  const [isActive,setIsActive] = useState(true)

  return (
    <SidebarContext.Provider value ={{isActive,setIsActive}}>
     {children}
     </SidebarContext.Provider>
  )
}

function useSidebar(): SidebarContextState{
  const context = useContext(SidebarContext)

  if(!context) {
    throw new Error('insira o authprovider ao redor do seu elemento')
  }
  return context
}

export {SidebarProvider, useSidebar}
