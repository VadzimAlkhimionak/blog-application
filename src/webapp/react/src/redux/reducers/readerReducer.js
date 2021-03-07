import {
    SET_ACTIVE,
    SET_AUTHOR,
    SET_AUTHORS,
    SET_AUTHORS_FAVORITE, SET_DEFAULT_PAGE,
    SET_OPEN, SET_PAGE,
    SET_POST,
    SET_POSTS,
    SET_SUBSCRIBE, SET_TOTAL_PAGES,
    SET_UPDATE
} from "../types";

const initState = {
    authors: [{}],
    authorsFavorite: [{}],
    author: {},
    post: [],
    active: null,
    open: false,
    subscribe: false,
    posts: [],
    page: 0,
    size: 2,
    totalPages: null,
    defaultPage: 1,
    update: 0,

    postStatus: {
        status: null,
        statusId: null,
    }
}

export const readerReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_AUTHORS:
            return {...state, authors: action.payload};
        case SET_AUTHORS_FAVORITE:
            return {...state, authorsFavorite: action.payload};
        case SET_AUTHOR:
            return {...state, author: action.payload};
        case SET_POST:
            return {...state, post: action.payload};
        case SET_ACTIVE:
            return {...state, active: action.payload};
        case SET_OPEN:
            return {...state, open: action.payload};
        case SET_SUBSCRIBE:
            return {...state, subscribe: action.payload};
        case SET_POSTS:
            return {...state, posts: action.payload};
        case SET_PAGE:
            return {...state, page: action.payload};
        case SET_TOTAL_PAGES:
            return {...state, totalPages: action.payload};
        case SET_DEFAULT_PAGE:
            return {...state, defaultPage: action.payload};
        case SET_UPDATE:
            return {...state, update: action.payload};
        default:
            return state;
    }
}