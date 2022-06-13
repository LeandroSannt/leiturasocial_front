import React from 'react';
import {Container,Content} from './styles'
import {FiArrowLeft} from 'react-icons/fi'

import {useAuth} from '../../hooks/AuthContext'
import { Link } from 'react-router-dom';


const Header:React.FC = () =>{
  const {signOut} = useAuth()

  return(
    <Container >
      <Content>
        <div className="profile">
          <div>
            <Link to={"/"} style={{marginRight:"10px"}} >
              <FiArrowLeft size={24}/>
            </Link>

            <a onClick={signOut} style={{marginRight:"10px"}} >
              Sair
            </a>
          </div>
            



            <Link to={"/profile"} >
              Perfil
            </Link>

            <Link to={"/books"}  style={{marginLeft:'15px'}}>
              Livros
            </Link>
        </div>
        <h3>LEITURA SOCIAL</h3>
      </Content>
    </Container>
  )
}

export {Header}