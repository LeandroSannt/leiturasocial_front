import React,{createContext, useState,useContext, useEffect} from 'react'
import ReactModal from 'react-modal';
interface ModalContextState{
  openModal():void
  closeModal():void
  modalIsOpen:boolean
}


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

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

  return (
    <ModalContext.Provider value ={{openModal,closeModal,modalIsOpen}}>
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
