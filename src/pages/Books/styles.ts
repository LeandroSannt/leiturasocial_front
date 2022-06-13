import styled from 'styled-components'

export const Container = styled.main`
width: 100%;
height: 100%;

`
export const ListBooks = styled.div`
width: calc(100% - 300px);

height: 100%;
margin-top: 105px;
margin-left: 350px;
margin-right: 50px;

display: flex;
flex-direction: column;

.spinner{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Input{
  height: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 50px 10px;

  input{
      border-radius: 50px   ;
      height: 40px;
      width: 300px;
      padding: 0 30px;
      border:none;
    }

}


`

export const Content = styled.div`
height: calc(100% - 10.9%);
display: flex;
`

export const List = styled.div`
display: grid;
grid-template-columns: repeat(4,1fr);
gap: 30px;
padding-bottom: 50px;


a{
  text-decoration: none;
  color:#fff;
  padding: 0 20px;
  
  div{
    object-fit: cover;
    width: 100%;
    height: 90%;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0px 0px 23px -2px rgba(255,255,255,0.32);
    margin-bottom: 20px;

    img{
    border-radius: 12px;
    object-fit: cover;
    height: 100%;
    width: 100%;
    transition: all 400ms;

      &:hover{
      transform: scale(1.2);
    }
    }
  }

  h4{
    margin-top: 5px;
    text-align: center;
  }
}

`
export const Book = styled.div`
`