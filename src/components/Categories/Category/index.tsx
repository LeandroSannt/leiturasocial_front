import React, { Fragment, HTMLAttributes } from 'react'

import { Container } from './styles'

interface IcategoryProps extends HTMLAttributes<HTMLDivElement> {
  title:string
}
const Category:React.FC<IcategoryProps> = ({title, ...rest}) =>{

  return(
    <Fragment >
      <Container {...rest}>
        <p>{title}</p>
      </Container>
    </Fragment>
  )
}

export default Category