import React, {useCallback,useRef} from 'react';
import {Container,Content,Background, AnimationContainer} from './styles'
import {FormHandles} from '@unform/core'
import {FiArrowLeft,FiMail,FiLock,FiUser,FiPhone} from 'react-icons/fi'
import * as Yup from 'yup'

import {Link, useHistory} from 'react-router-dom'

import getValidationErrors from '../../utils/getValidationErros'

import Input from '../../components/Input'
import Button from '../../components/Button'

import {Form} from '@unform/web'

import api from '../../services/api'

import {useToast} from '../../hooks/ToastContext'

interface SignUpData{
  name:string;
  email:string;
  password:string;
}

const SignUp: React.FC = () => {
  const formRef= useRef<FormHandles>(null)

  const {addToast} = useToast()
  const history = useHistory()

//função para validar os campos do formulario
 const handleSubmit= useCallback(async(data:SignUpData) =>{
    try{

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name:Yup.string().required('Nome obrigatorio'),
        surname:Yup.string().required('Sobrenome obrigatorio'),
        telephone:Yup.string().required('Telefone obrigatorio'),
        email:Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
        password:Yup.string().min(6, 'No minimo 6 digitos')
      })

      await schema.validate(data,{
        abortEarly:false
      })

      await api.post ('/user',data,)

      history.push('/')

      addToast({
        type:"success",
        title:"Cadastro realizado",
        description:'voce ja pode fazer seu logon'
      })


      
    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        return
      }
      addToast({
        type:'error',
        title:'Erro no cadastro',
        description:'Ocorreu um error ao fazer o cadastro'
      })
    }
  },[addToast,history])

  return(
    <Container>
      <Background></Background>
        <Content>
          <AnimationContainer>
            <h1>Leitura social</h1>

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu cadastro</h1>
                <Input name="name" icon={FiUser}  placeholder="Nome" />
                <Input name="surname" icon={FiUser}  placeholder="Sobrenome" />
                <Input name="telephone" icon={FiPhone}  placeholder="Telefone" />
                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" icon={FiLock} type="password" placeholder="password"/>
                <Button type="submit">Cadastar</Button>
            </Form>

            <Link to ="/">
                <FiArrowLeft/>
                Volta para logon
            </Link>
            </AnimationContainer>
        </Content>
    </Container>
    )
}


export default SignUp;