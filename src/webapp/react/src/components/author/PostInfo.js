import React, {useEffect, useState} from "react";
import classes from './PostInfo.module.css';
import Typography from "@material-ui/core/Typography";
import {Textarea} from "../UI/textarea/Textarea";
import {Likes} from "../reader/likes/Likes";
import {DialogContent, Grid} from "@material-ui/core";
import {Btn} from "../UI/button/Button";
import {Modal} from "../modals/Modal";
import {deleteComment} from "../../service/commentService";
import {Alert} from "../UI/alert/Alert";
import {setPagination} from "../../service/paginationService";
import {CustomizedPagination} from "../pagination/Pagination";
import {deletePost, updatePost} from "../../service/postService";
import {setStatus} from "../../redux/actions/appAction";
import {useDispatch} from "react-redux";
import {Input} from "../UI/input/Input";
import {setUpdate} from "../../redux/actions/readerAction";

export const PostInfo = ({post, likes, dislikes, value, id, update}) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);
    const [totalPages, setTotalPages] = useState(null);
    const [defaultPage, setDefaultPage] = useState(1);

    useEffect(() => {
        setText(post.description)
        setTitle(post.title)
    }, [post])

    useEffect(() => {
        setPagination('comments', post.idpost, page, size)
            .then(({data}) => {
                setComments(data.comments);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.log(error))
    }, [post, page, update])

    const handleChangeInput = ({target: {value}}) => {
        dispatch(setStatus({message: "", flag: false}));
        setTitle(value);
    }

    const handleChangeTextArea = ({target: {value}}) => {
        dispatch(setStatus({message: "", flag: false}));
        setText(value);
    }

    const handleClickSave = async () => {
        try {
            setTimeout(() => dispatch(setStatus({message: "Post was updated!", flag: true})), 1000)
            await updatePost(post.idpost, {description: text, title: title});
            dispatch(setUpdate(update+1));
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeletePost = async () => {
        try {
            await deletePost(post.idpost);
            dispatch(setUpdate(update+1));
        } catch (error) {
            console.log(error)
        }
    }

    const handlePagination = ({target: {outerText}}) => {
        setPage(outerText-1)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleRemove = id => async () => {
        try {
            setTimeout(() => dispatch(setStatus({message: "Comment was removed", flag: true})), 1000)
            await deleteComment(id);
            dispatch(setUpdate(update+1));
        } catch (e) {
            console.log(e)
        }
    }

    return (
        value === id && (
            <div className={classes.postInfo}>
                <div className={classes.postTitle}>
                    <Input label='Post title'
                           name={post.title}
                           type='text'
                           disabled={false}
                           value={title}
                           onChange={handleChangeInput}
                    />
                </div>

                <div className={classes.content}>
                    <div className={classes.text}>
                        <Textarea value={text}
                                  name='description'
                                  placeholder='Description'
                                  disabled={false}
                                  onChange={handleChangeTextArea}
                        />
                    </div>

                    <div className={classes.likes}>
                        <Likes icon='like' counter={likes} />
                        <Likes icon='dislike' counter={dislikes} />
                    </div>
                </div>

                <div className={classes.btn}>
                    <Btn title="Show comments"
                         color='primary'
                         variant='text'
                         fullWidth={false}
                         onClick={handleOpen}
                    />
                </div>
                <div className={classes.btn}>
                    <Btn title='Save'
                         color='primary'
                         fullWidth={false}
                         onClick={handleClickSave}
                    />

                    <Btn title='Delete post'
                         color='secondary'
                         fullWidth={false}
                         onClick={handleDeletePost}
                    />
                </div>

                <Modal fullScreen={false} open={open} onClick={handleClose} fullWidth="lg">
                    {
                        comments.length ? null : <Alert message="No comments!" severity='info' />
                    }
                    <DialogContent className={classes.dialogContent}>
                        {
                            comments.map(comment => {
                                return (
                                    <div className={classes.comments}>
                                        <Typography variant='subtitle1'>{comment.user.firstName}</Typography>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Textarea name="description" value={comment.description} disabled={true} />
                                            </Grid>

                                            <Grid item xs={1}>
                                                <Btn title='Remove'
                                                     color='secondary'
                                                     variant='text'
                                                     onClick={handleRemove(comment.idcomment)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                )
                            })
                        }
                        <CustomizedPagination count={totalPages}
                                              onChange={handlePagination}
                                              defaultPage={defaultPage}
                        />
                    </DialogContent>
                </Modal>
            </div>
        )
    )
}