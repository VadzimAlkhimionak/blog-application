import {SER_ERROR, SET_DISABLED, SET_LOGIN, SET_ROLE, SET_STATUS, SET_GLOBAL_ERROR} from "../types";

export const setLogin = flag => {
    return {type: SET_LOGIN, payload: flag}
}

export const setStatus = status => {
    return {type: SET_STATUS, payload: status}
}

export const setDisabled = flag => {
    return {type: SET_DISABLED, payload: flag}
}

export const setError = flag => {
    return {type: SER_ERROR, payload: flag}
}

export const setRole = role => {
    return {type: SET_ROLE, payload: role}
}

export const setGlobalError = error => {
    return {type: SET_GLOBAL_ERROR, payload: error}
}

export const changeInput = (name, value) => {
    return {type: name, payload: value}
}
