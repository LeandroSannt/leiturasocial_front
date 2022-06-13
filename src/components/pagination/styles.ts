import styled, { css } from "styled-components";

interface PaginationProps{
  actualPage:number
  totalPage:number
}

export const Container = styled.div<PaginationProps>`

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;

  span{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(255,144,0,0.61);
  }


  ${props =>
    props.actualPage === 1 &&
    css`
      .prev{
        color: 	rgba(220,220,220,0.1);
        cursor: not-allowed;
      }
    `
    }

    ${props =>
    props.actualPage === props.totalPage &&
    css`
      .next{
        color: 	rgba(220,220,220,0.1);
        cursor: not-allowed;
      }
    `
    }

  svg{
    cursor: pointer;
    transition: all 200ms;
    color: #fff;

    

    &:hover{
      transform: scale(1.1);
      filter: brightness(.8);
    }
  }

`