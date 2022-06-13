import React from 'react';
import { Container} from './styles'
import {useData} from '../../../hooks/DataContext'
import { FaCheck } from 'react-icons/fa';
interface IUserProps{
  user:{
    id:string
    name:string;
    surname:string;
    avatar:string;
    email:string
    has_followers:number;
  }
   
}

const Users:React.FC<IUserProps> = ({user}) => {

  const {handleFollow,handleUnFollow} = useData()

  const submitUnFollow = async (user_id:string ) => {
    handleUnFollow(user_id)
  }

  const submmitFollow = async (user_id:string) => {
    handleFollow(user_id)
  }

  return(
    <Container>
      <div className="profile">
        <div >
          {user.avatar ? <img src={`${process.env.REACT_APP_PUBLIC_URL}/${user.avatar}`} alt="" /> : <img src='http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon' alt="" />  }
        </div>

        <span>{user.name} {user.surname} </span>
      </div>

      {user.has_followers > 0 ? 
        
      <button className="following" onClick = {() =>submitUnFollow(user.id)}> <FaCheck size={12}/> Seguindo</button>
      :
      <button onClick = {() => submmitFollow(user.id)}> Seguir</button>

      }

      </Container>
  )
}

export {Users}