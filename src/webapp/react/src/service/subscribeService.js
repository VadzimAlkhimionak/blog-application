import {API_URL, createBasicAuthToken} from "./authService";
import axios from "axios";

export const setSubscribeUser = async data => {
    return axios.post(`${API_URL}/subscribe`,
            data,
        {headers: {authorization: createBasicAuthToken()}}
        )
}

export const setUnsubscribeUser = async id => {
    return axios.delete(`${API_URL}/${id}/unsubscribe`,
        {headers: {authorization: createBasicAuthToken()}}
        )
}

export const checkSubscribe = async id => {
    return axios.get(`${API_URL}/${id}/check-subscribe`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

