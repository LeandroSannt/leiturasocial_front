import React from 'react'
import {Container} from './styles'
import ReactModal from 'react-modal';
import {useModal} from '../../hooks/ModalContext'
import { AiOutlineClose } from 'react-icons/ai';

interface TitleProps{
  title:string
}


const Modal:React.FC<TitleProps> = ({title,children})=>{
  const {closeModal, modalIsOpen} = useModal()

  return(
      <ReactModal
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <Container>
          <header>
            <h1>{title}</h1>
            <div>
              <AiOutlineClose color='#000' onClick={closeModal}/>
            </div>
          </header>

          {children}
        </Container>
      </ReactModal>
  )
}

export default Modal