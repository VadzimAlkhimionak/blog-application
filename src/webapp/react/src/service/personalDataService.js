import {API_URL, createBasicAuthToken} from "./authService";
import axios from "axios";

export const getPersonalData = async () => {
    return await axios.get(`/personal-data`,
        {headers: {authorization: createBasicAuthToken()}}
        )
}

export const updatePersonalData = async user => {
    return await axios.put(`/personal-data/update`, user)
}