import React,{useEffect, useState} from 'react'
import {Container,Content} from './styles'
import Category from './Category'
import {CategoryProps} from '../../pages/Types'
import api from '../../services/api'
import Button from '../Button'
import Modal from '../Modal'
import {useModal} from '../../hooks/ModalContext'
import {useToast} from '../../hooks/ToastContext'

interface ICategoryProps{
  setCategoryId(id:string):void
}

const Categories:React.FC<ICategoryProps> = ({setCategoryId}) =>{

  const [categories,setCategories] = useState<CategoryProps[]>([])
  const [filterCategory,setFilterCategory] = useState('')
  const [,setIdCategory] = useState('')
  const [active,setActive] = useState('')
  const [activeCategory,setActiveCategory] = useState(false)
  const [nameCategory,setNameCategory] = useState('')

  const {openModal,closeModal} = useModal()
  const {addToast} = useToast()

  useEffect(() =>{
    const result = api.get('/categories',
    {params:{
      name:filterCategory
    }})

    result.then((response) =>{
      setCategories(response.data)
    })

  },[filterCategory])
    

  const hasActiveCategory = async (id:string) =>{
 
    categories.forEach((category) =>{
      if(category.id === id){
        setActiveCategory(!activeCategory)
      } 
    })

    setActive(id)
    setIdCategory(id)
    setCategoryId(id)
  }

  const handleSubmit = () =>{

    try{

    api.post('/categories',
    {params:{
      name:nameCategory
    }})

    closeModal()
    setNameCategory('')
    addToast({
      title:"Categoria cadastrada",
      description:"Cadastre um livro e selecione a nova categoria",
      type:'success'
    })

    }catch(err:any){
      addToast({
      title:"Aconteceu um error",
      description:`${err.message}`,
      type:'error'
    })
    }
    
  }

  return(
    <Container>
      
      <div>

      <h2>Escolha uma categoria</h2>
      <Content>
        
        <div className='input'>
          <input type="text"  placeholder="Filtrar categorias" onChange={(e) =>{setFilterCategory(e.target.value)}} />
        </div>
        <div className='overflow'>
          {categories?.map((category) =>{
            return(
              <div >
                <Category {...(active === category.id && { className: 'selected' } )} onClick={async() =>{
                  hasActiveCategory(category.id)
                  }} key={category.id} title={category.name}/>
              </div>
            )   
          })}
        </div>
      </Content>
      </div>
        
      {/* <Button onClick={openModal} style={{width:'90%', margin:'20px auto 20px auto'}}>Cadastrar Categoria</Button> */}
    </Container>
  )
}

export default Categories