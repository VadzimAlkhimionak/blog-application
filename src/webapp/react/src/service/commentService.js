import {API_URL, createBasicAuthToken} from "./authService";
import axios from "axios";

export const addComment = async (postId, data) => {
    return axios.post(`/posts/${postId}/comments/add`,
        data,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const deleteComment = async id => {
    return axios.delete(`/comments/${id}/delete`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const updateComment = async (commentId, data) => {
    return axios.put(`/comments/${commentId}/update`,
        data,
        {headers: {authorization: createBasicAuthToken()}}
    )
}

export const checkComment = async (commentId) => {
    return axios.get(`/check-author-comment/${commentId}`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}