import { shade } from 'polished'
import styled, { css } from 'styled-components'


interface activeCommenters{
  activeCommenter:boolean;
}

export const Container  = styled.main`
  display: flex;
  height:100%;

  @media(max-width:870px){
    .absolutsvg{
      position: absolute !important;
      z-index: 99;
      top: 110px;
      right: 0;
    }
  }

  
  
` 

export const Content  = styled.main`
 flex:1;
` 

export const Publishes = styled.div`
width:calc(100% - 300px);
margin-top:100px;
height:100%;
display: flex;
align-items:center;
flex-direction:column;

@media(max-width:870px){
  width: 100%;
}

  form{
    width:80%;
    min-height:140px;
    margin-top: 50px;
    background: #28262e;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    border-radius:10px;
    box-shadow: 0px 0px 30px 2px #28262e;

    h2{
      width: 90%;
      margin-bottom:10px;
      display: flex;
      align-items:flex-end;
        h3{
          margin-left: 10px;
          font-size:24px;
        }
    }
    >div{
      display: flex;
      width: 90%;

       >div{
         border-radius:50%;
        width:50px;
        height:40px;
        margin-right: 20px;
        padding: 2px;
        transition:400ms;
        background: #28262e;

        img{
          width:100%;
          height: 100%;
          object-fit:cover;
        transition:400ms;
        border-radius:50%;

          &:hover{
          transform: scale(1.1);
        }
        }
        
        
        
      }
      input{
        border-radius: 50px 0px 0px 50px ;
        height: 40px;
        width: 100%;
        padding: 0 30px;
        border:none;
      }

      .btn{
        border-radius: 0px 50px 50px 0px ;
        width: 100px;
        border: 0;
        color:${shade(.6, '#ff9000')} !important;;
        background-color: #ff9000;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size:14px;
        transition: 400ms;

         
      }
    }
    
  }


`

export const Publication = styled.section`
    width:80%;
    height: auto !important;
    margin-top: 50px;
    background: #28262e;
    display: flex;
    align-items:center;
    justify-content: center;
    border-radius:10px;
    box-shadow: 0px 0px 30px 2px #28262e;
    flex-direction: column;

    .hover-commenter{
      width:90%;

      display: flex;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;
      transition: color 400ms;

      span + span{
        margin-left: 10px;
      }
    
      svg{
        margin-right: 10px;
      }

      &:hover{
        color: #ff9000;
      }
    }

    .header-publication{
      display: flex;
      width: 90%;
      align-items:center;
      justify-content: space-between;

      p{
        width:100%;
      }

        >div {
          display: flex;
          align-items:center;
          margin-top:10px;
          
            >div{
            border-radius:50%;
            width: 90px;
            height: 55px;
            margin-right: 20px;
            padding: 2px;
            transition:200ms;

            
            img{
              width:100%;
              height: 100%;
            border-radius:50%;

              object-fit:cover;
            transition:400ms;

              &:hover{
              transform: scale(1.1);
            }
          }
        }

      .name-publisher{
          background-color:inherit !important;
          width:100%;
          display: flex;
          flex-direction: column;
          justify-content:center;
        }

      }

      span{
          margin-right:20px ;

          @media(max-width:420px){
            font-size:12px;
          }
        }
    }

    .publication{
        width:90%;
        margin: 20px 0px;
        line-height: 24px;
      }

      
`


export const Comments = styled.div<activeCommenters>`

width: 90%;
display: flex;
align-items: flex-start;
flex-direction: column;
margin-bottom: 20px;
transition: opacity 800ms;
opacity:0;
display: none;




${props =>
    props.activeCommenter &&
    css`
      transition: opacity 800ms;

      display: block;
      opacity:1;
    `}

  >div{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    /* cursor: pointer; */
    transition: color 400ms;

    
      svg{
        margin-right: 10px;
      }

  }

  .hover-commenter:hover{

        color: #ff9000;
      }

  .comments{
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    .comments-content-img{
      margin-top:auto;
    }
    >div{
      display: flex;
      width: 100%;

       >div{
         border-radius:50%;
        width:60px;
        height:53px;
        margin-right: 20px;
        padding: 2px;
        transition:400ms;
        display: flex;
        align-items:center;
        margin-bottom: auto;
        
        background: #28262e;

        @media(max-width:420px){
          width:90px;
          height:40px;
        }

        img{
          width:100%;
          height: 100%;
          object-fit:cover;
          transition:400ms;
          border-radius:50%;

          &:hover{
          transform: scale(1.1);
        }
      }
  
        
      }
      input{
        border-radius: 50px 0px 0px 50px ;
        width: 100%;
        height: 40px;
        padding: 0 30px;
        background:#fff;
        border: none;

      }

      .btn{
        border-radius: 0px 50px 50px 0px ;
        width: 100px;
        border: 0;
        color:${shade(.6, '#ff9000')} !important;;
        background-color: #ff9000;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size:14px;
        transition: 400ms;

        height: 40px;
       
      }
    }

    .mark{
      width: 100%;
    display: flex;
    justify-content: flex-end;
      >div{
        width: 200px;
        >div{
          position: initial !important;
          z-index: 9999999999999;
          background-color: #fff !important;
          max-height: 100% !important;
          color: gray;
          >div{

          }
        }
      }
      input{
        width: 100%;
        border-radius: initial;
        border-bottom: solid black 1px;
        background-color: inherit;
        padding-left: 10px;
        color: #fff;
      }
    }

  }

  .userCommenter{
    display: flex;
    align-items:center;
    margin-top:20px;
    width: 100%;
     .imageContent{
        border-radius:50%;
        width:40px;
        height:40px;
        margin-right: 20px;
        padding: 2px;
        transition:400ms;

        @media(max-width:420px){
          width:40px;
          height:40px;
        }
        
        img{
          width:100%;
          height: 100%;
          object-fit:cover;
          transition:400ms;
          border-radius:50%;


          &:hover{
          transform: scale(1.1);
        }
      }
    }

      article{
        display: block;
        min-width:200px;
        background-color:${shade(.2, '#28262e')} ;
        box-shadow: 0px 0px 31px -12px black;
        border-radius:10px;
        padding: 10px;


        .userCommenter{
          font-weight: 900;
        }

        p{
          font-size:12px;
        }

        >div{
          >div{
            color: #a19f9f;
            span{
              font-size:12px
            }
            margin-top:10px
          }
        }

        .book{
          img{
            width: 40px;
            height: 40px;
            margin-left: 10px;
          }

          a{
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #a19f9f;
          }

        }

        .infoBook{
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
       
      }
  }


`