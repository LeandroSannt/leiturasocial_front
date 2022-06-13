import React, {useCallback,useRef}  from 'react';
import {Container,Content,Background,AnimationContainer} from './styles'
import {FiLogIn,FiMail,FiLock} from 'react-icons/fi'

import {Link} from 'react-router-dom'

import {useAuth} from '../../hooks/AuthContext';
import {useToast} from '../../hooks/ToastContext';

import {Form} from "@unform/web"

import Input from '../../components/Input'
import Button from '../../components/Button'

import {FormHandles} from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErros'

interface SignInFormData{
  email: string
  password: string
}

const SignIn: React.FC = () => {

  const formRef= useRef<FormHandles>(null)

  const {signIn} = useAuth()
  const {addToast} = useToast()

//função para validar os campos do formulario
 const handleSubmit= useCallback(async(data:SignInFormData) =>{
    try{

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email:Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
        password:Yup.string().required('Senha obrigatoria')
      })

      await schema.validate(data,{
        abortEarly:false  
      })
      await signIn({
        email:data.email,
        password:data.password
      })
    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        return
      }
      addToast({
        title:'Erro na autenticação',
        type:'error',
        description:'ocorreu um erro ao fazer login, cheque as credenciais'
      })
      
    }
  },[signIn,addToast])
  return(

    <Container>
        <Content>
          <AnimationContainer>
            <h1>Leitura SOCIAL</h1>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu logon</h1>
              <Input name="email" icon={FiMail}  placeholder="E-mail" />
              <Input name="password" icon={FiLock} placeholder="Senha" type="password" />
              <Button type="submit">Entrar</Button>
            </Form>

            <Link to ="/session/SingUp">
                <FiLogIn/>
                Criar conta
            </Link>
            </AnimationContainer>
        </Content>
        <Background></Background>

    </Container>
  )
}    

export default SignIn;