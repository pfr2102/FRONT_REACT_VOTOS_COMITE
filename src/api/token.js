import {TOKEN} from '../utils/constants';
//nadamas es para darle un valor predeterminado a la variable global de token
export function setToken(token){
    localStorage.setItem(TOKEN, token);
}
//este es para poder acceder al valor de la variable global del token
export function getToken(){
    return localStorage.getItem(TOKEN);
}
//para borrar el token
export function removeToken(){
    localStorage.removeItem(TOKEN);
}