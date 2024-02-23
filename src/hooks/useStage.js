import {useState} from 'react';
import { getMeApi } from '../api/user';
import { getStagesApi } from '../api/stage';
import { useAuth } from './useAuth';
export function useStage() {
    const {auth} = useAuth();
    const [loadingStage, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stages, setStages] = useState(null);

    const getMe = async (token) => {
        try {
            const response = await getMeApi(token);
            return response;
        }catch (error) { throw error; }
    }

    const getStage = async () => {
        try {
            setLoading(true);
            //obtenemos un arreglo de objetos con los datos de todos los usuarios registrados para pintarlos en el datatable
            const response = await getStagesApi(auth.token);
            setLoading(false);

            console.log(response);
            setStages(response);
            return response;
        }catch (error) { 
            setLoading(false);
            setError(error);
            //throw error; 
        }
    }
    return { 
        //estados
        loadingStage,
        error,
        stages,
        auth,
        //metodos
        getMe,
        getStage,      
     };
}