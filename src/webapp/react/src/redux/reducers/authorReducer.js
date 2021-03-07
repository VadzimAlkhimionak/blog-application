import {
    SET_ACTIVE, SET_AUTHOR, SET_COMMENTS, SET_DISLIKES, SET_IS_COMMENT, SET_LIKES,
    SET_OPEN, SET_POST,
    SET_POST_DESCRIPTION,
    SET_POST_TITLE, SET_UPDATE
} from "../types";

const initState = {
    postTitle: '',
    postDescription: '',
    open: false,
    active: null,
    update: 0,

    author: {},
    post: {},
    likes: 0,
    dislikes: 0,

    comments: [],
    isComment: false,
}

export const authorReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_POST_TITLE:
            return {...state, postTitle: action.payload};
        case SET_POST_DESCRIPTION:
            return {...state, postDescription: action.payload};
        case SET_OPEN:
            return {...state, open: action.payload};
        case SET_ACTIVE:
            return {...state, active: action.payload};
        case SET_UPDATE:
            return {...state, update: action.payload};
        case SET_AUTHOR:
            return {...state, author: action.payload};
        case SET_POST:
            return {...state, post: action.payload};
        case SET_LIKES:
            return {...state, likes: action.payload};
        case SET_DISLIKES:
            return {...state, dislikes: action.payload};
        case SET_COMMENTS:
            return {...state, comments: action.payload};
        case SET_IS_COMMENT:
            return {...state, isComment: action.payload};
        default:
            return state;
    }
}