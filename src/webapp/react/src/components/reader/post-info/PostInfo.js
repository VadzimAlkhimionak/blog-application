import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import classes from './PostInfo.module.css';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import {Like} from "../../UI/like/Like";
import {Btn} from "../../UI/button/Button";
import {CommentForm} from "../comment-form/CommentForm";
import {Modal} from "../../modals/Modal";
import {checkStatusPost, getPost} from "../../../service/postService";
import {ReaderComment} from "../reader-comment/ReaderComment";
import {useDispatch, useSelector} from "react-redux";
import {setComments, setIsComment} from "../../../redux/actions/authorAction";

export const PostInfo = ({open, handleClose, post, handleLike, update}) => {
    const isComment = useSelector(state => state.author.isComment);
    const comments = useSelector(state => state.author.comments);
    const dispatch = useDispatch();

    const [statusId, setStatusId] = useState(null);
    const [status, setStatus] = useState(null);
    const [updateComments, setUpdateComments] = useState(false);

    useEffect(() => {
        checkStatusPost(post.idpost)
            .then(({data}) => {
                setStatus(data.status);
                setStatusId(data.id);
            })
            .catch(error => console.log(error))
    }, [update])

    useEffect(() => {
        dispatch(setComments(post.comments));
        setUpdateComments(false)

        getPost(post.idpost)
            .then(({data}) => {
                dispatch(setComments(data.comments));
            })
            .catch(error => console.log(error))
    }, [updateComments])

    const handleAddComment = () => {
        dispatch(setIsComment(true));
        setUpdateComments(false);
    }

    const handleAddCommentCancel = () => {
        dispatch(setIsComment(false));
    }

    return (
        <Modal fullScreen={true} open={open} onClick={handleClose}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {post.title}
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.main}>
                <div className={classes.description}>
                    {post.description}
                </div>

                <Divider />

                <div className={classes.manage}>
                    <Like color='primary' disabled={status === "like"} onClick={handleLike(post.idpost, statusId, 'like')}>
                        <ThumbUpAltIcon />
                    </Like>

                    <Like color='secondary' disabled={status === "dislike"} onClick={handleLike(post.idpost, statusId, 'dislike')}>
                        <ThumbDownIcon />
                    </Like>

                    <Btn onClick={handleAddComment}
                         color='primary'
                         title='Add a comment'
                         variant='text'
                         fullWidth={false}
                    />
                </div>

                <Divider />

                {
                    isComment
                    &&
                    <CommentForm handleAddCommentCancel={handleAddCommentCancel}
                                 post={post}
                                 update={updateComments}
                                 setUpdate={setUpdateComments}
                    />
                }

                <div className={classes.comments}>
                    {
                        comments.map(comment => {
                            return (
                                <ReaderComment key={comment.idcomment}
                                               text={comment.description}
                                               title={comment.user.firstName}
                                               id={comment.idcomment}
                                               setUpdate={setUpdateComments}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </Modal>
    );
}

PostInfo.defaultProps = {
    post: {}
}

PostInfo.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleLike: PropTypes.func,
    update: PropTypes.number,
};