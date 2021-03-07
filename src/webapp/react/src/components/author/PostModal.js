import React, {useState} from "react";
import {DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {Input} from "../UI/input/Input";
import {Textarea} from "../UI/textarea/Textarea";
import Button from "@material-ui/core/Button";
import {Modal} from "../modals/Modal";
import {useDispatch, useSelector} from "react-redux";
import {setError, setStatus} from "../../redux/actions/appAction";
import {setOpen, setPostDescription, setPostTitle} from "../../redux/actions/authorAction";
import {createPost} from "../../service/authorService";
import {setUpdate} from "../../redux/actions/readerAction";

export const PostModal = () => {
    const update = useSelector(state => state.author.update);
    const postTitle = useSelector(state => state.author.postTitle);
    const postDescription = useSelector(state => state.author.postDescription);
    const open = useSelector(state => state.author.open);
    const error = useSelector(state => state.app.error);

    const post = {
        title: postTitle,
        description: postDescription,
        author: {},
        comments: [],
        postStatuses: [],
    }

    const dispatch = useDispatch();

    const validate = () => {
        let inputErrors = {};
        inputErrors.postTitle = postTitle ? null : "This field is required!";
        inputErrors.postDescription = postDescription ? null : "This field is required!";

        dispatch(setError({...inputErrors}));

        return Object.values(inputErrors).every(x => x === null);
    }

    const handleClose = () => {
        dispatch(setOpen(false));
    };

    const handleChangeInput = ({target: {value}}) => {
        dispatch(setError(false));
        dispatch(setPostTitle(value));
    }

    const handleChangeTextArea = ({target: {value}}) => {
        dispatch(setPostDescription(value));
    }

    const handleSavePost = async () => {
        try {
            if (validate()) {
                await createPost({...post, title: postTitle, description: postDescription});
                dispatch(setPostTitle(''));
                dispatch(setPostDescription(''));
                dispatch(setUpdate(update+1));
                dispatch(setStatus({message: "Post was added!", flag: true}));
                handleClose();
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Modal fullScreen={false} open={open} onClick={handleClose} fullWidth="lg">
            <DialogTitle id="form-dialog-title">Create Post</DialogTitle>

            <DialogContent>
                <Input label='Title'
                       name='postTitle'
                       onChange={handleChangeInput}
                       type='text'
                       value={postTitle}
                       error={error}
                />

                <Textarea value={postDescription}
                          disabled={false}
                          name='description'
                          onChange={handleChangeTextArea}
                          placeholder='description'
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleSavePost} color="primary">
                    Save
                </Button>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Modal>
    )
}