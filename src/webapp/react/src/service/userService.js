import {API_URL, createBasicAuthToken} from "./authService";
import axios from "axios";

export const getAuthors = async () => {
    return await axios.get(`${API_URL}/authors`,
        {headers: {authorization: createBasicAuthToken()}}
        )
}

export const getFavoriteAuthors = async () => {
    return await axios.get(`${API_URL}/favoriteAuthors`,
        {headers: {authorization: createBasicAuthToken()}}
        )
}

export const getUser = async id => {
    return await axios.get(`${API_URL}/users/${id}`,
        {headers: {authorization: createBasicAuthToken()}}
        )
}