import styled from "styled-components";

export const Container = styled.div`
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  transition: color 200ms;
  padding: 5px 0;
  border-radius: 12px;
  

   border: solid  #fff 2px;
    color: #fff;
   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  &:hover{
    border: solid  rgba(255,144,0,0.61) 2px;
    color: #ff9000;
   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  svg{
    margin-right: 10px;
}
`