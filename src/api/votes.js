import axios from 'axios';
import { BASE_API } from '../utils/constants';

/* export async function getCountVotes(token) {
    try {
        const url = `${BASE_API}/api/users/`;
        const params = {
            headers: { Authorization: `Bearer ${token}`, }
        }
        const response = await axios.get(url, params);
        return response.data;
    }catch (error) { throw error; }
} */


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