import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import ReactModal from 'react-modal';

import { useModal } from '../../hooks/ModalContext'
import { Container } from './styles'

interface TitleProps{
  title:string
}


const Modal:React.FC<TitleProps> = ({title,children})=>{
  const {closeModal2 ,modalIsOpen2} = useModal()

  return(
      <ReactModal
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        contentLabel="Example Modal"
      >
        <Container>
          <header>
            <h1>{title}</h1>
            <div>
              <AiOutlineClose color='#000' onClick={closeModal2}/>
            </div>
          </header>

          {children}
        </Container>
      </ReactModal>
  )
}

export default Modal