import React,{ createContext, useContext, useState } from 'react'

interface ModalContextState{
  openModal():void
  closeModal():void
  modalIsOpen:boolean

  openModal2():void
  closeModal2():void
  modalIsOpen2:boolean
}




//iniciando um contexto vazio precisa colocar o as e o nome da interface
const ModalContext = createContext<ModalContextState>({} as ModalContextState)

const ModalProvider:React.FC = ({children}) => {

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  const [modalIsOpen2, setIsOpen2] = useState(false);

  function openModal2() {
    setIsOpen2(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  return (
    <ModalContext.Provider value ={{closeModal2,openModal2,modalIsOpen2,openModal,closeModal,modalIsOpen}}>
     {children}
     </ModalContext.Provider>
  )
}

function useModal(): ModalContextState{
  const context = useContext(ModalContext)

  if(!context) {
    throw new Error('insira o ModalProvider ao redor do seu elemento')
  }
  return context
}

export {ModalProvider, useModal}
