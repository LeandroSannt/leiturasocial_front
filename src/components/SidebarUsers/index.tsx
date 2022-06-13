import React, { useMemo,useState } from 'react';
import {Container} from './styles'
import {FiSearch} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'

import { Users } from './users';

import {useData} from '../../hooks/DataContext'
import {useSidebar} from '../../hooks/SidebarActive'

import ClipLoader from "react-spinners/ClipLoader";

const Sidebar:React.FC = () =>{

  const {users} = useData()
  const {setIsActive,isActive} = useSidebar()

  const [filterName, setFilterName] = useState('')

  const filterUsers = useMemo(()=>{
      const lowerName = filterName.toLocaleLowerCase()

      if(!users){
        return 
      }

      return users
      .filter((user)=>{ return user.name.toLowerCase().includes(lowerName)})
     
    },[filterName, users])

  return(
    <Container active={isActive}>

      <GiHamburgerMenu size={25} className={"absolutsvg2"} onClick ={() =>setIsActive(!isActive)}/>
      <div>
        <input type="text" onChange={(e) =>setFilterName(e.target.value)} placeholder="Pesquisar usuários"/>
        <FiSearch/>
      </div>
      {!users && <ClipLoader/> }
      <div className="Container-Overflow">
        {
          filterUsers?.map((user) =>(
            <Users key ={user.id} user={user} />
          ))
        }
      </div>

    </Container>
  )
}

export {Sidebar}