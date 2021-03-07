import axios from "axios";
import {API_URL, createBasicAuthToken} from "./authService";

export const getAuthor = async () => {
    return await axios.get(`${API_URL}/author`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const createPost = async (post) => {
    return await axios.post(`${API_URL}/post`,
        post,
        {headers: {authorization: createBasicAuthToken()}}
    )
}