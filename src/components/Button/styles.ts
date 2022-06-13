import styled from 'styled-components';
import {shade} from 'polished'

export const Container = styled.button`

      background: #ff9000 ;
      height: 56px;
      border-radius: 10px;
      border:0;
      color: #fff;
      font-weight: 500;
      padding:0 16px;
      width: 100%;
      margin-top: 16px;
      transition:background-color 0.2s;
      text-align: center;
      font-family: 'Roboto sans-serif';

        &:hover{
          background: ${shade(0.2, '#ff9000')};

        }

`
