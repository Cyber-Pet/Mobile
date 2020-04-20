import axios from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create({
    baseURL: 'https://cyber-pet.herokuapp.com/api/'
})

api.interceptors.request.use(config => {
    const token = AsyncStorage.getItem('id_token', token => { return token })
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
});

export default api

