import {SER_ERROR, SET_DISABLED, SET_LOGIN, SET_ROLE, SET_STATUS, SET_GLOBAL_ERROR} from "../types";

const initState = {
    isLogin: false,
    status: {
        message: null,
        flag: false,
    },
    disabled: false,
    error: false,
    role: null,
    globalError: {
        message: null,
        flag: false,
    },
}

export const appReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {...state, isLogin: action.payload};
        case SET_STATUS:
            return {...state, status: {...action.payload}};
        case SET_DISABLED:
            return {...state, disabled: action.payload};
        case SER_ERROR:
            return {...state, error: action.payload};
        case SET_ROLE:
            return {...state, role: action.payload};
        case SET_GLOBAL_ERROR:
            return {...state, globalError: {...action.payload}};
        default:
            return state;
    }
}