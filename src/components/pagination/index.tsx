import React from 'react'
import {Container} from './styles'
import { IoIosArrowBack ,IoIosArrowForward} from 'react-icons/io';
import {usePagination} from '../../hooks/Pagination'

const Pagination:React.FC = () =>{

  const {next,prev,actualPage,totalPage} = usePagination()

  return(
    <Container actualPage={actualPage} totalPage={totalPage}>
      <IoIosArrowBack className='prev' onClick={() =>{prev()}} size={30} />
        <span> 
          {actualPage}
        </span>
      <IoIosArrowForward className='next' onClick={() =>{next()}} size={30} />
    </Container>
  )
}

export default Pagination