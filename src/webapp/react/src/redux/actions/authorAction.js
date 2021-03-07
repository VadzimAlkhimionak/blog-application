import {
    SET_AUTHOR, SET_COMMENTS, SET_DISLIKES, SET_IS_COMMENT, SET_LIKES,
    SET_OPEN, SET_POST,
    SET_POST_DESCRIPTION,
    SET_POST_TITLE
} from "../types";

export const setPostTitle = title => {
    return {type: SET_POST_TITLE, payload: title}
}

export const setPostDescription = description => {
    return {type: SET_POST_DESCRIPTION, payload: description}
}

export const setOpen = flag => {
    return {type: SET_OPEN, payload: flag}
}

export const setAuthor = author => {
    return {type: SET_AUTHOR, payload: author}
}

export const setPost = post => {
    return {type: SET_POST, payload: post}
}

export const setLikes = likes => {
    return {type: SET_LIKES, payload: likes}
}

export const setDislikes = dislikes => {
    return {type: SET_DISLIKES, payload: dislikes}
}
//
export const setComments = comments => {
    return {type: SET_COMMENTS, payload: comments}
}
export const setIsComment = flag => {
    return {type: SET_IS_COMMENT, payload: flag}
}
