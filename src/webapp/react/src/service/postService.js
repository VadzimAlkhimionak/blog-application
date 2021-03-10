import {API_URL, createBasicAuthToken} from "./authService";
import axios from "axios";

export const setStatusPost = async (id, data) => {
    return await axios.put(`/${id}/status`,
        data,
        {headers: {authorization: createBasicAuthToken()}}
        )
}

export const checkStatusPost = async (postId) => {
    return await axios.get(`/${postId}/check-status`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const getPost = async (postId) => {
    return await axios.get(`/posts/${postId}`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const updatePost = async (postId, data) => {
    return axios.put(`/posts/${postId}/update`,
        data,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const deletePost = async postId => {
    return axios.delete(`/posts/${postId}/delete`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}