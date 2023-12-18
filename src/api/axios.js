import axios from 'axios';

export default axios.create({
    baseURL: 'https://easybites-portal.azurewebsites.net'
})