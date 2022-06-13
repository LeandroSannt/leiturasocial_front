import styled from 'styled-components'

export const Container = styled.div`
width: 300px;
height: 100%;
background-color: #28262e;
position: fixed;
bottom: 0;
height: calc(100% - 105px);

display: flex;
justify-content: space-between;
flex-direction: column;



  h2{
    margin: 0 auto;
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #312e38;

  }

  input{
        border-radius: 50px   ;
        height: 40px;
        width: 90%;
        padding: 0 30px;
        border:none;
      }
`
export const Content = styled.div`



.input{
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.selected{
  background: #cc7300;
}

.overflow{
  overflow-y:auto ;
max-height:60vh ;



&::-webkit-scrollbar {
  width: 12px;    
}

&::-webkit-scrollbar-track {
  background: inherit;   
      /* color of the tracking area */
}

&::-webkit-scrollbar-thumb {
  background-color: #cc7300;   /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
}
}
`