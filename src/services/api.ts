import axios from 'axios';

const token = localStorage.getItem("@desafio:token")

const api = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_URL
})

api.defaults.headers['Authorization'] = `Bearer ${token}`;


export default api