import {SET_SUBSCRIBERS, UPDATE_PERSONAL_DATA} from "../types";

export const updateUser = data => {
    return {type: UPDATE_PERSONAL_DATA, payload: data}
}

export const setSubscribers = subscribers => {
    return {type: SET_SUBSCRIBERS, payload: subscribers}
}