import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cyber-pet.herokuapp.com/'
})

export default api

  