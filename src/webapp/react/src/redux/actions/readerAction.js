import {
    SET_ACTIVE,
    SET_AUTHOR,
    SET_AUTHORS,
    SET_AUTHORS_FAVORITE, SET_DEFAULT_PAGE,
    SET_OPEN, SET_PAGE,
    SET_POST,
    SET_POSTS,
    SET_SUBSCRIBE, SET_TOTAL_PAGES, SET_UPDATE
} from "../types";

export const setAuthors = authors => {
    return {type: SET_AUTHORS, payload: authors}
}

export const setAuthorsFavorite = authorsFavorite => {
    return {type: SET_AUTHORS_FAVORITE, payload: authorsFavorite}
}

export const setAuthor = author => {
    return {type: SET_AUTHOR, payload: author}
}

export const setPost = post => {
    return {type: SET_POST, payload: post}
}

export const setActive = id => {
    return {type: SET_ACTIVE, payload: id}
}

export const setOpen = flag => {
    return {type: SET_OPEN, payload: flag}
}

export const setSubscribe = flag => {
    return {type: SET_SUBSCRIBE, payload: flag}
}

export const setPosts = posts => {
    return {type: SET_POSTS, payload: posts}
}

export const setPage = page => {
    return {type: SET_PAGE, payload: page}
}

export const setTotalPages = pages => {
    return {type: SET_TOTAL_PAGES, payload: pages}
}

export const setDefaultPage = page => {
    return {type: SET_DEFAULT_PAGE, payload: page}
}

export const setUpdate = value => {
    return {type: SET_UPDATE, payload: value}
}