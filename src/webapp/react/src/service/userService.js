import {API_URL, createBasicAuthToken} from "./authService";
import axios from "axios";

export const getAuthors = async () => {
    return await axios.get(`/authors`,
        {headers: {authorization: createBasicAuthToken()}}
        )
}

export const getFavoriteAuthors = async () => {
    return await axios.get(`/favoriteAuthors`,
        {headers: {authorization: createBasicAuthToken()}}
        )
}

export const getUser = async id => {
    return await axios.get(`/users/${id}`,
        {headers: {authorization: createBasicAuthToken()}}
        )
}