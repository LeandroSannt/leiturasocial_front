import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`

  transition: background 400ms;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content:space-between;


  &:hover{
  background-color:${shade(.1,'#312e38')} !important;
  }
  .profile{
    display: flex;
    align-items: center;
    
  }

>div >div {
  width:55px;
  height:40px;
  display: flex;
  align-items: center;  

    img{
      height:100%;
      border-radius: 50%;
      border:2px solid green;
      margin-right: 10px;
    }
}

button{
  margin-right:5px;
  background-color:#ff9000;
  border-radius: 4px;
  border: none;
  font-size: 14px ;
  color:#fff;
  padding: 3px 5px;
}

.following{
background-color:inherit;
border: solid black 1px;
display: flex;
align-items: center;
justify-content: center;
transition: background 200ms;

  &:hover{
    background-color:#ff9000;
    border: none;
  }

  svg{
    margin-right:5px;
  }
}

span{
  font-size:12px;
  width: 100%;
  margin-left: 10px;
  
}
`