import {useState} from 'react';
import { getCountVotes, getCountVotesTop} from '../api/votes';
import { useAuth } from './useAuth';


export function useVotes(){
  const {auth} = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(null);

  const getVotesManual = async (data) => {
    try {
        setLoading(true);
        const response = await getCountVotes(data.id_etapa_fk, data.id_rango_fk, data.fecha_voto, auth.token);
        setLoading(false);

        console.log(response);
        setVotes(response);
        return response;
    }catch (error) { 
        setLoading(false);
        setError(error); 
    }
  }

  const getVotesUser = async (id_etapa) => {
    try {
        setLoading(true);
        //nota: anio_voto tiene que ser una constante que almacene el año actual para que hagas una funcion de eso
        const response = await getCountVotes(id_etapa, auth.me.id_rank_fk, anio_voto, auth.token);
        setLoading(false);

        setVotes(response);
        console.log(votes);
        //return response;
    }catch (error) { 
        setLoading(false);
        setError(error); 
    }
  }


  const getVotesManualTop = async (id_etapa, fecha_voto, tope ) => {
    try {
        setLoading(true);
        //nota: anio_voto tiene que ser una constante que almacene el año actual para que hagas una funcion de eso o bien se 
        //lo mandas como parametro en la data 

        const response = await getCountVotesTop(id_etapa, auth.me.id_rank_fk, fecha_voto, tope, auth.token);
        setLoading(false);

        setVotes(response);
        console.log(response);
        //return response;
    }catch (error) { 
        setLoading(false);
        setError(error); 
    }
  }

  return { 
    //estados
    loading,
    error,
    votes,
    //metodos
    getVotesUser,
    getVotesManual,
    getVotesManualTop  
  };
  
}
