import styled from 'styled-components'

export const Container = styled.header`
  max-width: 100%;
  width: 100%;
  padding: 37px 0;
  background-color:#28262e;
  position: fixed;
  z-index: 0;
`

export const Content = styled.div`
  max-width: 76%;
  width: 90%;
  margin: 0 auto;

   

  display: flex;
  justify-content:space-between;
  align-items:center;

  .profile{
    display: flex;
    align-items:center;
    

    a{
      color: #fff;
    text-decoration: none;
    font-size:16px;
    }

  }

    >div >div {
      display: flex;
      align-items:center;
      cursor: pointer;
      transition: all 400ms;
      margin-right:10px;

      &:hover{
       // transform: scale(1.1);
      }

      svg{
        margin-right: 10px;
      }

    }

`

