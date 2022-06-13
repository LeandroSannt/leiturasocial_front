import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle `

*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Roboto', sans-serif;

}

html,
body{ 
    background: #312e38;
    color: #fff;
    height:calc(100vh - 86px);
}

#root{
    height:100vh;

}

body,input,button{
    font-family: 'Roboto Slab', serif;
    font: 16px;
    font-weight: normal;
}


h1, h2, h3, h4, h5, h6,strong{
    font-weight: 500;
}

button{
    cursor: pointer
}
 .react-modal-overlay{
        background:rgba(0,0,0,0.5);
        position:fixed;
        top:0;
        bottom:0;
        right:0;
        left:0;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .react-modal-content{
        width:960px;
        position:relative;
        padding:3rem;
        border-radius:0.25rem;
    }
    .react-modal-close{
        position:absolute;
        right:1.5rem;
        top: 1.5rem;
        border:0;
        background:transparent;
        transition:filter 2s;
        &:hover{
            filter:brightness(0.8)
        }
    }

`