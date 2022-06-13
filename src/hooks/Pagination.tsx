import React,{createContext, useState,useContext, useEffect} from 'react'
interface PaginationContextState{
  text:string
  actualPage:number
  totalPage:number
  next():void
  prev():void
  textBook(book:string):void
}

//iniciando um contexto vazio precisa colocar o as e o nome da interface
const PaginationContext = createContext<PaginationContextState>({} as PaginationContextState)

const PaginationProvider:React.FC = ({children}) => {

  let [actualPage, setActualPage ] = useState(1)
  let [totalPage, setTotalPage ] = useState(0)
  let [textHook, setText ] = useState('')
  let [text, setText2 ] = useState('')

  useEffect(() =>{

    const listItems = (items:any,pageActual:any,limitItems:any) =>{
      let result = []
      setTotalPage(Math.ceil(items.length / limitItems))
      let count = (pageActual * limitItems) - limitItems
      let delimiter = count + limitItems

      if(pageActual <= totalPage){
        for(let i = count; i < delimiter; i++){
          result.push(items[i])
          count++
        }
      }
      return result
    }

    const pagination = textHook.split(' ');
    var resultNext = listItems(pagination,actualPage,300)
    setText2(resultNext.toString().replace(/,/g, " "))

  },[actualPage, textHook, totalPage])

  const next = () =>{
    if(actualPage !== totalPage){
      setActualPage(actualPage + 1)
    }
  }

  const prev = () =>{
    if(actualPage !== 1){
      setActualPage(actualPage - 1)
    }
  }

  const textBook = (book:string) => {
    setText(book)
  }

  return (
    <PaginationContext.Provider value ={{actualPage,totalPage,text,textBook,next,prev}}>
     {children}
     </PaginationContext.Provider>
  )
}

function usePagination(): PaginationContextState{
  const context = useContext(PaginationContext)

  if(!context) {
    throw new Error('insira o authprovider ao redor do seu elemento')
  }
  return context
}

export {PaginationProvider, usePagination}
