import axios from 'axios';


export const base_url = 'https://pokemon-go1.p.rapidapi.com';

axios.defaults.baseURL = base_url;
axios.defaults.timeout = 10000;
axios.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-rapidapi-host': 'pokemon-go1.p.rapidapi.com',
    'x-rapidapi-key': 'f9ac435d76msh5fa4cfae70b68a7p101f6cjsn599c86c0c10e'
};

export default axios;

