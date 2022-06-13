import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useParams,useHistory } from 'react-router-dom';
import { Container ,Content, Informations,BookContainer, AvatarInput} from './styles'
import {BooksProps, SelectProps} from '../Types'
import { useQuery } from 'react-query';
import api from '../../services/api';
import Pagination from '../../components/pagination'
import {Header} from '../../components/Header'
import Button from '../../components/Button'

import {usePagination} from '../../hooks/Pagination'
import {useAuth} from '../../hooks/AuthContext'

import {Example} from '../../components/Speech'
import { queryClient } from '../../services/queryClient';
import Modal from '../../components/Modal';
import { Form } from '@unform/web';
import { useToast } from '../../hooks/ToastContext';
import { useModal } from '../../hooks/ModalContext';
import { ClipLoader } from 'react-spinners';

import Select from 'react-select';
import { FiCamera } from 'react-icons/fi';

type BookParams = {
  id: string;
};

const Book: React.FC = () =>{
  const {addToast} = useToast()
  const {openModal,closeModal} = useModal()
  const {user} = useAuth()
  const {text,textBook} = usePagination()
  const history = useHistory()
  const {id} = useParams<BookParams>()

  const [category,setCategory] = useState<string | undefined>('')
  const [categories,setCategories] = useState<SelectProps[]>([])
  const [,setBook] = useState<File>()
  const [,setImgBook] = useState<File>()
  const [sinopse,setSinopse] = useState('')
  const [loading,setLoading] = useState(false)

  const [avatar, setAvatar] = useState<File>()

  const inputRef = useRef<HTMLInputElement>(null);  

  const {data} = useQuery<BooksProps>('book', async () =>{
    const response = await api.get(`/books/${id}`)
    return response.data
  })

  useEffect(() =>{
    api.get('/categories/findAll').then((response) =>{
      setCategories(response.data)
    })
  },[])

  useEffect(() => {
    if(data){
      textBook(data.text)
    }
  },[data, textBook])



  const handleDelete =async () =>{
    const confirm = window.confirm('Deseja deletar esse livro, ação não podera ser revertida')

    if(confirm){
      await api.delete(`/books/${id}`)

      await queryClient.invalidateQueries(['books'])
      history.push('/books')

    }
  }

  const handleSubmit =async () =>{
    try{

      if(sinopse.length > 200){
        throw Error("So é possivel digitar no maximo 200 caracteres")
      }

      const formData = new FormData();

      const file = inputRef.current?.files?.[0]

      file && formData.append('photo',file);
      //imgBook && formData.append('photo',imgBook);
      category && formData.append('category_id',category);
      sinopse && formData.append('sinopse',sinopse);

      setLoading(true)

      await api.put(`/books/${id}`,formData)

      await queryClient.invalidateQueries(['book'])

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

   const [preview,setPreview] = useState<string>(`http://localhost:4000/${data?.photo}`)

  useEffect(() => {
    if(avatar){
      const reader = new FileReader() 
      reader.onloadend = () =>{
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(avatar)

    }else if(data?.photo){
      setPreview(`http://localhost:4000/${data?.photo}`)
    }else{
      setPreview('http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon')
    }
  },[avatar, data?.photo])

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
       setAvatar(e.target.files[0])
        const data = new FormData();
        data.append('photo', e.target.files[0]);
      }
    },
    [],
  );

  return(
    <>
      <Container>
        <Header/>
        <Content>
          <Informations>
            <div className='contentAvatar'>
              <img src={`http://localhost:4000/${data?.photo}`} alt="user" />
            </div>

            <div className='authorCategory'>
              <span>{data?.author}</span>
              <span>{data?.category.name}</span>
            </div>

            <Example text={data?.text}/>

            <div className='sinopse'>
              <p>{data?.sinopse}
              </p>
            </div>
          </Informations>

          <BookContainer isAdmin={user.isAdmin}>
            <div>
              <div>
                <h1>{data?.title}</h1>
                {user.isAdmin && 
                <div>
                  <Button style={{width:'150px',background:'red',marginTop:0}} onClick={() =>{handleDelete()}}>     Excluir  livro
                  </Button>  

                  <Button style={{width:'150px',marginTop:0, marginLeft:'20px'}} onClick={() =>{openModal()}}>
                  Editar livro
                  </Button>  
                </div>
                }
              </div>
              <p>{text}</p>
            </div>

            <Modal title='Atualizar livro'>
              <Form action="" onSubmit={handleSubmit}>
                <div>
                  <div>
                    {/* <div className="btn-styles">
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
                    </div> */}
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'flex-end',justifyContent:"space-between",width:"100%"}}>

                <div className='category'>
                  <label htmlFor="">Categorias</label>
                  <Select defaultValue={categories.find(category =>{return category.value === data?.category_id}) }   options={categories} onChange={(e) => {handleInputChange(e?.value)}}/>
                </div>

                <AvatarInput>
                        
                  {preview ? 
                    <img src={preview} alt={user.name}/>
                    :
                    <img src={'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon'} alt={data?.title}/>
                  }
                    <label htmlFor="avatar">
                      <FiCamera size={20} />
                      <input
                        ref={inputRef}
                        data-testid="input-file"
                        type="file"
                        id="avatar"
                        name={"image"}
                        onChange={handleAvatarChange}
                      />

                      {/* <input type="file" className="custom-file-input" accept=".csv" ref={inputRef} onChange={handleSubmit}/> */}
                  </label>
                </AvatarInput>
                </div>
                

                <div className='category'>
                  <label htmlFor="">Título</label>
                  <input type="text" defaultValue={data?.title} />
                </div>

                <div className='sinopse'>
                  <label htmlFor="">Sinopse</label>
                  <textarea defaultValue={data?.sinopse} onChange={(e) =>{setSinopse(e.target.value)}} name="sinopse " id="" cols={30} rows={10} placeholder="Escreva até 200 caracteres"></textarea>
                </div>

                <Button type='submit' onClick={(e:any) =>{}}>
                  {loading ? <ClipLoader color='#613c0d'/> : `Atualizar Livro`}
                </Button>
              </Form >
            </Modal>
            <Pagination/>
          </BookContainer>
          
        </Content>
      </Container>
    </>
  )
}

export default Book