import {API_URL, createBasicAuthToken} from "./authService";
import axios from "axios";

export const setPagination = async (url, id, page, size) => {
        return axios.get(`/pagination-${url}?id=${id}&page=${page}&size=${size}`,
        {headers: {authorization: createBasicAuthToken()}}
    )
}