import styled from 'styled-components'

export const Container = styled.div`

background-color: #fff;
width: 100%;
height: 90vh;
padding: 24px;

header{
  display: flex;
  justify-content: space-between;
  width: 100%;

  h1{
    color: black;
    font-weight: bold;
  }
}

 > div{
   
 }

 form{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  height: 90%;

  max-width: 720px;
  margin: 0 auto;

  

  h2{
    color: black;
    margin-bottom: 5px;
  }

  .Input{
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 8px;
    border: solid #D3D3D3 1px;
    padding: 12px;

    input{
      border: none;
      width: 100%;
    }
    
  }
    >div{
      margin-bottom: 10px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      >div{
        display: flex;
        flex-direction:column;
        color: black;
        margin-right: 20px;
        width: 100%;
      
      }
       label{
          margin-bottom: 5px;
        }
    }
    .sinopse,
    .category{
      display: flex;
      flex-direction:column;
      color: black;
    }  

    .category{
      width: 100%;

   .AABbh form >div >div{
    width: 100%;
   }

      input{
        width: 50%;
        padding: 10px;
        border-radius: 4px;
        border: solid #D3D3D3 1px;
      }
    }

    .sinopse{
      width: 100%;
    }
    textarea{
      width: 100%;
      padding: 15px;
      border: solid 1px #D3D3D3;
      border-radius: 4px;
      resize: none;
    }

    .btn-styles{
      width: 200px;
      border: 2px solid #C0C0C0;
      background-color: #C0C0C0;
      border-radius: 8px;
      height: 48px;

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;

      transition: background 400ms;
      &:hover{
        background-color: #D3D3D3;
      }
    }

    
}

.input{
  display: flex;
  flex-direction: column;
  width: 40%;

  label{
    color: black;

    margin-bottom:10px ;
    margin-top:20px ;
  }

  input{
    padding: 14px;
    border-radius: 4px;
    border: solid 1px #D3D3D3;
  }
}


`