import axios from "axios";

export const credentials = {
    email: null,
    password: null,
}

export const login = async (email, password) => {
    credentials.email = email;
    credentials.password = password;
    return await axios.post(`/login`, {email, password})
}

export const registration = async (roles, firstName, lastName, username, email, password) => {
    return await axios.post(`/registration`, {roles, firstName, lastName, username, email, password});
}

export const logout = async () => {
    return await axios.post(`/logout`);
}

export const createBasicAuthToken = () => {
    return 'Basic ' + window.btoa(credentials.email + ":" + credentials.password);
}