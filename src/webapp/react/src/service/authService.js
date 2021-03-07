import axios from "axios";

export const API_URL = 'http://localhost:8080';

export const credentials = {
    email: null,
    password: null,
}

export const login = async (email, password) => {
    credentials.email = email;
    credentials.password = password;
    return await axios.post(`${API_URL}/login`, {email, password})
}

export const registration = async (roles, firstName, lastName, username, email, password) => {
    return await axios.post(`${API_URL}/registration`, {roles, firstName, lastName, username, email, password});
}

export const logout = async () => {
    return await axios.post(`${API_URL}/logout`);
}

export const createBasicAuthToken = () => {
    return 'Basic ' + window.btoa(credentials.email + ":" + credentials.password);
}