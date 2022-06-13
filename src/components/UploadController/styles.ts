import styled from "styled-components";

export const Container = styled.label`
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;

p{
  white-space: nowrap;
  width: 130px;
  overflow: hidden;              /* "overflow" value must be different from "visible" */
  text-align: center;
  text-overflow:    ellipsis;
}
`