import axios from 'axios';
import { BASE_API } from '../utils/constants';

export async function loginApi(formValue) {
    try {
        const url = `${BASE_API}/api/auth/login/`;

        const response = await axios.post(url, formValue, {
            headers: {  'Content-Type': 'application/json',  },
        });

        if (response.status !== 200) {  throw new Error('Error en el login'); }

        return response.data;

    } catch (error) { throw error; }
}

export async function getMeApi(token) {
    try {
        const url = `${BASE_API}/api/auth/me/`;
        const params = {
            headers: { Authorization: `Bearer ${token}`, }
        }
        const response = await axios.get(url, params);
        return response.data;
    }catch (error) { throw error; }
}


export async function getUsersApi(token) {
    try {
        const url = `${BASE_API}/api/users/`;
        const params = {
            headers: { Authorization: `Bearer ${token}`, }
        }
        const response = await axios.get(url, params);
        return response.data;
    }catch (error) { throw error; }
}

//crear un nuevo usuario
export async function addUserApi(data, token) {
    try {
        const url = `${BASE_API}/api/users/`;

        const params = {
            headers: { 
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        }

        const response = await axios.post(url, data, params);

        return response.data;
        
    }catch (error) { throw error; }
}

//actualizar un usuario con patch
export async function updateUserApi(userId, data, token) {
    try {
        const url = `${BASE_API}/api/users/${userId}/`;
        const params = {
            headers: { 
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        }
        // Use axios.patch for updating an existing resource
        const response = await axios.patch(url, data, params);
        return response.data;
    } catch (error) {throw error;}
}


/* export async function addUserApi(data, token) {
    try {
        const url = `${BASE_API}/api/users/`;
        const params = {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    }catch (error) { throw error; }
} */


//CON FETCH

/* import {BASE_API} from '../utils/constants';

export async function loginApi(formValue){
    try {
        const url = `${BASE_API}/api/auth/login/`;

        const params = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            //transformar el objeto formValue a JSON
            body: JSON.stringify(formValue),
        };
        const response = await fetch(url, params);   
        
        if(response.status !== 200){
           throw new Error('Error en el login');
        }

        const result = await response.json();

        return result;
    }catch(error){
        throw error   
    }
} */