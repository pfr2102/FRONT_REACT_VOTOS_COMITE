import {useState} from 'react';
import { getMeApi, getUsersApi, addUserApi, updateUserApi, updateUserApiImage, addUserApiImage } from '../api/user';
import { useAuth } from './useAuth';
export function useUser() {
    const {auth} = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);

    const getMe = async (token) => {
        try {
            const response = await getMeApi(token);
            return response;
        }catch (error) { throw error; }
    }

    const getUsers = async () => {
        try {
            setLoading(true);
            //obtenemos un arreglo de objetos con los datos de todos los usuarios registrados para pintarlos en el datatable
            const response = await getUsersApi(auth.token);
            setLoading(false);

            //console.log(response);
            setUsers(response);
            return response;
        }catch (error) { 
            setLoading(false);
            setError(error);
            //throw error; 
        }
    }    

    const addUser = async (data) => {
        try {
            setLoading(true);
            //consultas si existe imagen en el formulario para ejecutar una peticion especifica para imagenes o no
            if(data.image) {
                await addUserApiImage(data, auth.token);
            }else{
                await addUserApi(data, auth.token);
            }
            setLoading(false);
        }catch (error) {setLoading(false),  setError(error); }
    }

    const updateUser = async (userId, data) => {
        try {
            setLoading(true);
            //consultas si existe imagen en el formulario para ejecutar una peticion especifica para imagenes o no
            if(data.image) {
                await updateUserApiImage(userId, data, auth.token);
                console.log('Update con imagen');
            }else{
                await updateUserApi(userId, data, auth.token);
                console.log('Update sin imagen');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    return { 
        //estados
        loading,
        error,
        users,
        auth,
        //metodos
        getMe,
        getUsers,  
        addUser,
        updateUser    
     };
}