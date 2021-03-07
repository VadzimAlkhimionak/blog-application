import {API_URL, createBasicAuthToken} from "./authService";
import axios from "axios";

export const setStatusPost = async (id, data) => {
    return await axios.put(`${API_URL}/${id}/status`,
        data,
        {headers: {authorization: createBasicAuthToken()}}
        )
}

export const checkStatusPost = async (postId) => {
    return await axios.get(`${API_URL}/${postId}/check-status`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const getPost = async (postId) => {
    return await axios.get(`${API_URL}/posts/${postId}`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const updatePost = async (postId, data) => {
    return axios.put(`${API_URL}/posts/${postId}/update`,
        data,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const deletePost = async postId => {
    return axios.delete(`${API_URL}/posts/${postId}/delete`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}