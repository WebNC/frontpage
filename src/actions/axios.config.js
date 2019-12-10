import axios from 'axios';
import {API_URL} from '../constants/index';


require('dotenv').config()

export default axios.create({
    baseURL: API_URL
});