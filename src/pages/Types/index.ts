

export interface BooksProps{
  id:string
  title?:string
  photo?:string
  text:string
  author:string
  numberpages:number
  category_id:string
  sinopse?:string
  category:CategoryProps
}

export interface CategoryProps{
  id:string
  name:string
}

export interface SelectProps{
  value:string
  label:string
}