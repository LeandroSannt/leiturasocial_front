import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React,{ useEffect, useRef, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

import { useModal } from '../../hooks/ModalContext'
import { useToast } from '../../hooks/ToastContext'
import { CategoryProps } from '../../pages/Types'
import api from '../../services/api'
import Button from '../Button'
import Modal from '../ModalCategory'
import Category from './Category'
import { Container, Content } from './styles'

interface ICategoryProps{
  setCategoryId(id:string):void
}

const Categories:React.FC<ICategoryProps> = ({setCategoryId}) =>{

  const formRef = useRef<FormHandles>(null);

  const [categories,setCategories] = useState<CategoryProps[]>([])
  const [filterCategory,setFilterCategory] = useState('')
  const [,setIdCategory] = useState('')
  const [active,setActive] = useState('')
  const [activeCategory,setActiveCategory] = useState(false)
  const [nameCategory,setNameCategory] = useState('')
  const [loading,setLoading] = useState(false)


  const {closeModal2,openModal2} = useModal()
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

  

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) =>{

    try{

    e.preventDefault()

    await api.post('/categories',{
     name: nameCategory
    })

    closeModal2()
    setNameCategory('')
    addToast({
      title:"Categoria cadastrada",
      description:"Cadastre um livro e selecione a nova categoria",
      type:'success'
    })

    }catch(err:any){
      console.log(err)
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
        
        <Modal title={'Categoria'}>
          <form action="" >
            <h2>
                 Nome da categoria
              </h2> 
            <div className='Input'>
            <input required name='Nome da categoria' placeholder='nome da categoria'  onChange={(e) =>{setNameCategory(e.target.value)}}/>
            </div>
                <Button type='submit' onClick={(e:any) =>handleSubmit(e)}>
                  {loading ? <ClipLoader color='#613c0d'/> : `Cadastrar categoria`}
                </Button>
              </form >
        </Modal>
      <Button onClick={openModal2} style={{width:'90%', margin:'20px auto 20px auto'}}>Cadastrar Categoria</Button>
    </Container>
  )
}

export default Categories