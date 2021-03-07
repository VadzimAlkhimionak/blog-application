import {API_URL, createBasicAuthToken} from "./authService";
import axios from "axios";

export const addComment = async (postId, data) => {
    return axios.post(`${API_URL}/posts/${postId}/comments/add`,
        data,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const deleteComment = async id => {
    return axios.delete(`${API_URL}/comments/${id}/delete`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const updateComment = async (commentId, data) => {
    return axios.put(`${API_URL}/comments/${commentId}/update`,
        data,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const checkComment = async (commentId) => {
    return axios.get(`${API_URL}/check-author-comment/${commentId}`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}