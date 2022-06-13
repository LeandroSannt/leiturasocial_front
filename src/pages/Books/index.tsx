import React, {useState, useCallback, ChangeEvent, useRef} from 'react'
import {Container,ListBooks,Content,List} from './styles'
import {Header} from '../../components/Header'
import Categories from '../../components/Categories'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { useQuery } from 'react-query';
import {BooksProps,SelectProps} from '../Types'
import api from '../../services/api'
import {Link} from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import { BiImport } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';

import {useModal} from '../../hooks/ModalContext'
import {useToast} from '../../hooks/ToastContext'
import {useAuth} from '../../hooks/AuthContext'

import Select from 'react-select';
import UploadControl from '../../components/UploadController'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { queryClient } from '../../services/queryClient'

const Books:React.FC = () =>{

  const [category,setCategory] = useState<string | undefined>('')
  const [book,setBook] = useState<File>()
  const [imgBook,setImgBook] = useState<File>()
  const [sinopse,setSinopse] = useState('')
  const [filterTitle,setfilterTitle] = useState('')
  const [IdCategory,setIdCategory] = useState('')
  const [loading,setLoading] = useState(false)

  const {addToast} = useToast()
  const {openModal,closeModal} = useModal()
  const {user} = useAuth()

  const formRef = useRef<FormHandles>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {data} = useQuery<BooksProps[]>(['books',IdCategory,filterTitle], async () =>{
  const response = await api.get('/books',{
    params:{
      category_id:IdCategory,
      title:filterTitle
    }
  })  

  return response.data
  })

  const result = useQuery<SelectProps[]>(['categoriesList'], async () =>{
  const response = await api.get('/categories/findAll')  

  return response.data
  })


  
  const filterBooks = async(e:any) =>{
    setfilterTitle(e.target.value)
  }

  const handleAddBook = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setBook(e.target.files[0])
      }
    },
    [],
  );

  const handleAddPhoto = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setImgBook(e.target.files[0])
      }
    },
    [],
  );

  const handleSubmit =async () =>{
    try{

      if(sinopse.length > 200){
        throw Error("So é possivel digitar no maximo 200 caracteres")
      }

      if(!book){
        throw Error("É necessario selecionar um livro para efetuar o cadastro no sistema")
      }

       if(!category){
        throw Error("Selecione uma categoria")
      }

      const formData = new FormData();
      book && formData.append('pdf',book);
      imgBook && formData.append('photo',imgBook);
      category && formData.append('category_id',category);
      sinopse && formData.append('sinopse',sinopse);

      setLoading(true)

      await api.post('/books',formData)

      await queryClient.invalidateQueries(['books'])

      setLoading(false)
      setBook(undefined)
      setImgBook(undefined)
      setSinopse('')
      setCategory('')

      closeModal()

      addToast({
        title:'Cadatro realizado',
        type:"success",
        description:'Verifique na aba de livros o livro registrado'
      })


    }catch(err:any){
      setLoading(false)

      addToast({
        title:'Não é possivel completar o cadastro',
        type:"error",
        description:err.message
      })
    }
  }

 const  handleInputChange = (newValue?: string) => {
    setCategory(newValue)
  };

  const customStyles = {
 
  control: (provided:any, state:any) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    width: '100%',
    display:'flex',
  }),
  option: (provided:any, state:any) => ({
    ...provided,
    width:'100%'
  }),
}

  return(
    <>
      <Container>
      <Header/>
        <Content>
          <Categories setCategoryId={setIdCategory}/>
          <ListBooks>
            <Modal title='Cadastrar Livro'>
              <Form action="" onSubmit={handleSubmit} ref={formRef}>
                <div>
                  <div>
                    <label htmlFor="">Upload do livro</label>
                    <div className="btn-styles">
                      <UploadControl onChange={handleAddBook} accept="application/pdf" value={undefined} disabled={false} id="primeiro" ref={inputRef} >
                       {book ?
                       <>
                        <AiFillCheckCircle color='green'/> 
                        <p style={{fontSize:'12px'}}>{book?.name}</p>
                       </>
                       : 
                       <>
                        <BiImport/>
                        <p>Selecione o livro</p>
                       </>
                        }  
                      </UploadControl>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Capa do livro</label>

                    <div className="btn-styles">
                      <UploadControl onChange={handleAddPhoto} accept="image/png, image/jpeg" value={undefined} disabled={false} id="segundo">
                        {imgBook ?
                       <>
                        <AiFillCheckCircle color='green'/> 
                        <p style={{fontSize:'12px'}}>{imgBook?.name}</p>
                       </>
                       : 
                       <>
                        <BiImport/>
                        <p>Selecione a capa</p>
                       </>
                        }  
                      </UploadControl>
                    </div>
                  </div>
                </div>

                <div className='category' >
                  <label htmlFor="">Categorias</label>
                  <Select styles={customStyles}   options={result.data}   onChange={(e) => {handleInputChange(e?.value)}}/>
                </div>

                <div className='sinopse'>
                  <label htmlFor="">Sinopse</label>
                  <textarea onChange={(e) =>{setSinopse(e.target.value)}} name="sinopse " id="" cols={30} rows={10} placeholder="Escreva até 200 caracteres"></textarea>
                </div>
                <Button type='submit' onClick={(e:any) =>{}}>
                  {loading ? <ClipLoader color='#613c0d'/> : `Cadastrar Livro`}
                </Button>
              </Form >

              
            </Modal>
            <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
              <div className='Input'>
                <input type="text" placeholder='Escolha um livro' onChange={(e) =>{filterBooks(e)}} />
              </div>
              <div style={{width:'20%'}}>
                {user.isAdmin &&
                  <Button onClick={() =>{openModal()}}>
                    Cadastrar Livro
                  </Button>
                }
              </div>
            </div>
            
            {data?.length === 0 ?
            <div className='spinner'>
              <ClipLoader color='#ff9000'/> 
            </div>
             :
            <List>
              {data?.map((book) =>(
                <Link key={book.id} to ={`book/${book.id}`}>
                  <div>
                    <img src={`http://localhost:4000/${book.photo}`} alt={book.title} />
                  </div>
                <h4>{book.title}</h4>
                </Link>
              ))}

            </List>
            }
            
          </ListBooks>
        </Content>
      </Container>
    </>
  )
}

export default Books