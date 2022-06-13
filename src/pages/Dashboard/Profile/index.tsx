import React, { useCallback, useRef, ChangeEvent, useState, useEffect } from 'react';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft ,FiPhone} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErros';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { useToast } from '../../../hooks/ToastContext';

import { Container, Content, AvatarInput,ButtonDelete } from './styles';
import { useAuth } from '../../../hooks/AuthContext';
import { queryClient } from '../../../services/queryClient';

interface ProfileFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  telephone:string
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const inputRef = useRef<HTMLInputElement>(null);

  const { user, updateUser,signOut } = useAuth();


  const [avatar, setAvatar] = useState<File>()

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {

      const { name,surname,telephone, email, password, confirmPassword} = data
      try {
        const formData = new FormData();


      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email:Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
        password:Yup.string().required('Senha obrigatoria')
      })

      await schema.validate(data,{
        abortEarly:false  
      })








        const file = inputRef.current?.files?.[0]

        file && formData.append('file',file);
        formData.append('confirmPassword',confirmPassword);
        formData.append('password',password);
        formData.append('email',email);
        formData.append('surname',surname);
        formData.append('name',name);
        formData.append('telephone',telephone);

        const response = await api.put('/user', formData,{
          headers: {
            "content-type": "multipart/form-data",
          },

        });

        updateUser(response.data);

        await queryClient.invalidateQueries(['users'])


        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um error ao atualizar o perfil, tente novamente.',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
       setAvatar(e.target.files[0])
        const data = new FormData();
        data.append('file', e.target.files[0]);
      }
    },
    [],
  );

  const [preview,setPreview] = useState<string>(`${process.env.REACT_APP_PUBLIC_URL}/${user.avatar}`)

  useEffect(() => {
    if(avatar){
      const reader = new FileReader() 
      reader.onloadend = () =>{
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(avatar)

    }else if(user.avatar){
      setPreview(`${process.env.REACT_APP_PUBLIC_URL}/${user.avatar}`)
    }else{
      setPreview('http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon')
    }
  },[avatar, user.avatar])


  const handleDelete = useCallback(async () => {
   const deleteUser = window.confirm('Tem certeza que deseja excluir sua conta, todas suas publicações serão excluidas junto!');

  if(deleteUser){
    await api.delete(`user/${user.id}`) 

    signOut()

    history.push('/dashboard');
  }

  },[history, signOut, user.id])

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft size={32} />
          </Link>
          <ButtonDelete>
            <Button style={{background:"#D95353",color:"#FFF"}} onClick={handleDelete}>Excluir conta</Button>
          </ButtonDelete>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          
          <AvatarInput>
            
          {preview ? 
            <img src={preview} alt={user.name}/>
            :
            <img src={'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon'} alt={user.name}/>
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

          <h1>Meu Perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" defaultValue={user.name} />
          <Input name="surname" icon={FiUser} placeholder="Sobrenome" defaultValue={user.surname} />
          <Input name="email" icon={FiMail} placeholder="E-mail" defaultValue={user.email} />
          <Input name="telephone" icon={FiPhone} placeholder="Telefone" defaultValue={user.telephone} />
          
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Digite sua senha para atualizar seus dados"
          />
          <Input
            name="confirmPassword"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;