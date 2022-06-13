import { userInfo } from 'os'
import styled,{css} from 'styled-components'

interface AdminProps{
  isAdmin:boolean
}

export const Container = styled.main`
width: 100%;
height: 100vh;

header{
  position: initial;
}

`

export const Content = styled.div`
  height: calc(100% - 103px);
  display: grid;
  grid-template-columns: 260px 1fr;
  width: 76%;
  gap: 40px;
  padding: 40px 0;
  margin: 0 auto;

`

export const Informations = styled.div`
.contentAvatar{
  width: 100%;
  margin-top: 18px;

    img{
      width: 100%;
      height: 300px;
      border-radius: 12px;
    }
}

.authorCategory{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  

  span{
  background-color: rgba(255,144,0,0.61);
  border-radius: 12px;
  padding: 10px 0;
  min-width: 120px;
  font-size: 12px;
  text-align: center;
  }
}



.sinopse{
  margin-top: 20px;
  text-align: justify;
}
`

export const BookContainer = styled.div<AdminProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
   justify-content: space-between;
  min-height: 90%;

  h1{
    margin-top: 13px;
    margin-bottom: 31px;
    text-align: center;
  }

  p{
    text-align: justify;
    line-height: 24px;
    font-size: 14px;
  }

  > div > div{
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${(props) => 
      !props.isAdmin &&
      css`
      align-items: center;

      justify-content: center;
      `
    }}
  

`
export const AvatarInput = styled.div`
  position: relative;
  align-self: center;
  img {
    width: 80px;
    height: 100px;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border: none;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    cursor: pointer;
    input {
      display: none;
    }
    &:hover {
    }
    svg {
      color: #312e38;
    }
  }
`;

