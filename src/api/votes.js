import axios from 'axios';
import { BASE_API } from '../utils/constants';


export async function getCountVotes(id_etapa, id_rango, anio_voto, token) {
    try {
        const url = `${BASE_API}/api/voto/count_votes/`;
        const params = {
            params: {
                id_etapa_fk: id_etapa,
                id_rango_fk: id_rango,
                anio_voto: anio_voto,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.get(url, params);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//para obtener los votos con el tope
export async function getCountVotesTop(id_etapa, id_rango, anio_voto, tope, token) {
    try {
        const url = `${BASE_API}/api/voto/count_votesTop/`;
        const params = {
            params: {
                id_etapa_fk: id_etapa,
                id_rango_fk: id_rango,
                anio_voto: anio_voto,
                tope: tope,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.get(url, params);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//para verificar si hay votos de un votante
export async function getCheckVotes(id_emp_votante, id_etapa, anio_voto, token) {
    try {
        const url = `${BASE_API}/api/voto/check_vote_exists/`;
        const params = {
            params: {
                id_emp_votante: id_emp_votante,
                id_etapa_fk: id_etapa,
                anio_voto: anio_voto,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.get(url, params);
        console.log(response);
        //return response.data;
    } catch (error) {
        throw error;
    }
}