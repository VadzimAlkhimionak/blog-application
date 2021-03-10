import axios from "axios";
import {API_URL, createBasicAuthToken} from "./authService";

export const getAuthor = async () => {
    return await axios.get(`/author`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const createPost = async (post) => {
    return await axios.post(`/post`,
        post,
        {headers: {authorization: createBasicAuthToken()}}
    )
}