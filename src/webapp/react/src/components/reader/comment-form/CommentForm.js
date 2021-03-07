import React, {useState} from "react";
import PropTypes from 'prop-types';
import {FormControl} from "../../controls/FormControl";
import {Grid} from "@material-ui/core";
import {Input} from "../../UI/input/Input";
import {Btn} from "../../UI/button/Button";
import {addComment} from "../../../service/commentService";
import {setStatus} from "../../../redux/actions/appAction";
import {useDispatch} from "react-redux";

export const CommentForm = ({handleAddCommentCancel, post, setUpdate}) => {
    const dispatch = useDispatch();

    const [comment, setComment] = useState('');
    const [error, setError] = useState({});

    const validateComment = () => {
        let inputErrors = {};
        inputErrors.comment = comment === '' ? "This field is required!" : null;
        setError({...inputErrors});
        return Object.values(inputErrors).every(x => x === null);
    }

    const handleChangeInput = ({target: {value}}) => {
        dispatch(setStatus({message: "", flag: false}));
        validateComment();
        setComment(value);
    }

    const handleAddComment = async () => {
        try {
            if (validateComment()) {
                await addComment(post.idpost, {description: comment});
                setComment('');
                handleAddCommentCancel();
                setUpdate(true);
                dispatch(setStatus({message: "Comment was added", flag: true}));
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FormControl>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Input label='Comment'
                           name='comment'
                           onChange={handleChangeInput}
                           error={error}
                           value={comment}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Btn color='primary'
                         title='Add comment'
                         onClick={handleAddComment}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Btn color='secondary'
                         title='Cancel'
                         onClick={handleAddCommentCancel}
                    />
                </Grid>
            </Grid>
        </FormControl>
    )
}

CommentForm.propTypes = {
    handleAddCommentCancel: PropTypes.func.isRequired,
    post: PropTypes.object,
    setUpdate: PropTypes.func,
}