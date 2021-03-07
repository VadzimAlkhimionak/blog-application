import {SET_SUBSCRIBERS, UPDATE_PERSONAL_DATA} from "../types";

const personalDataState = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    biography: '',
    subscribers: 0,
}

export const personalDataReducer = (state = personalDataState, action) => {
    switch (action.type) {
        case "firstName":
            return {...state, firstName: action.payload};
        case "lastName":
            return {...state, lastName: action.payload};
        case "username":
            return {...state, username: action.payload};
        case "email":
            return {...state, email: action.payload};
        case "biography":
            return {...state, biography: action.payload};
        case UPDATE_PERSONAL_DATA:
            return {...state, ...action.payload}
        case SET_SUBSCRIBERS:
            return {...state, subscribers: action.payload}
        default:
            return state;
    }
}