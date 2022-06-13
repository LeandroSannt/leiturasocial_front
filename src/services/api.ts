import axios from 'axios';

    const token = localStorage.getItem("@desafio:token")

const api = axios.create({
  baseURL: 'http://localhost:4000'
})


api.defaults.headers['Authorization'] = `Bearer ${token}`;


export default api