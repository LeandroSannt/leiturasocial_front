import styled, { css } from 'styled-components'
import {shade} from 'polished'

interface menuActive{
  active:boolean
}

export const Container = styled.div<menuActive>`

height: calc(100% - 86px);
width: 346px;
position: fixed;
z-index: 100;
margin-top:100px;
right:0;
.absolutsvg2{
  display: none;
}

@media(max-width:870px){

  .absolutsvg2{
  display: block;
}

  ${props =>
    props.active ?
    css`
      display: none;
    ` :

    css`
      display: block;
      background: #28262e;
    ` 
  }

}

  >div{
    width:100;
    display: flex;
    justify-content:space-between;
    align-items:center;

    padding: 10px 14px;
    //background-color:${shade(0.2,'#312e38')} !important;

    &:nth-child(1){
      margin-top:20px;
    }

    input{
      width:90%;
      color:#fff;
      padding: 9px 0;
      background-color:inherit;
      border: none;

      border-bottom: 1px solid #fff;

        &::placeholder{
          color:#c4c4c4
        }  
    }
    
  }

  .Container-Overflow{
    display:block;
    max-height:calc(100vh - 163px);
    overflow-y: auto;
    width: 334px;
    //max-height: 200px;


    &::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}

&::-webkit-scrollbar-track {
  background: #2b2b2b; 
  border-radius:20px;       /* color of the tracking area */
}

&::-webkit-scrollbar-thumb {
  background-color: #242424;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
}
    
  }

`