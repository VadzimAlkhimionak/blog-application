import {API_URL, createBasicAuthToken} from "./authService";
import axios from "axios";

export const getPersonalData = async () => {
    return await axios.get(`${API_URL}/personal-data`,
        {headers: {authorization: createBasicAuthToken()}}
        )
}

export const updatePersonalData = async user => {
    return await axios.put(`${API_URL}/personal-data/update`, user)
}