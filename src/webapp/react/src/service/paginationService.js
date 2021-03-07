import {API_URL, createBasicAuthToken} from "./authService";
import axios from "axios";

export const setPagination = async (url, id, page, size) => {
        return axios.get(`${API_URL}/pagination-${url}?id=${id}&page=${page}&size=${size}`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}