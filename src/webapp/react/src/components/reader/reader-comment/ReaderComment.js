import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import classes from './ReaderComment.module.css';
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import {Textarea} from "../../UI/textarea/Textarea";
import {Btn} from "../../UI/button/Button";
import {useDispatch} from "react-redux";
import {setGlobalError, setStatus} from "../../../redux/actions/appAction";
import {checkComment, deleteComment, updateComment} from "../../../service/commentService";

export const ReaderComment = ({id, title, text, setUpdate}) => {
    const [disabled, setDisabled] = useState(true);
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setDescription(text);
    }, [])

    const handleChangeInput = ({target: {value}}) => {
        dispatch(setStatus({message: "", flag: false}));
        setDescription(value);
    }

    const handleRemove = async () => {
        dispatch(setGlobalError({message: null, flag: false}));
        try {
            if (!await checkAuthorComment()) {
                dispatch(setGlobalError({message: "Not the author of this comment", flag: true}))
                return;
            }
            await deleteComment(id);
            setUpdate(true);
            dispatch(setStatus({message: "Comment was removed!", flag: true}));
        } catch (error) {
            dispatch(setGlobalError({message: "Something wrong", flag: true}))
        }
    }

    const handleEdit = async () => {
        dispatch(setGlobalError({message: null, flag: false}));
        try {
            if (!await checkAuthorComment()) {
                dispatch(setGlobalError({message: "Not the author of this comment", flag: true}))
                return;
            }

            if (disabled) {
                setDisabled(false);
            } else {
                setDisabled(true);
                await updateComment(id, {description: description});
                dispatch(setStatus({message: "Comment was updated", flag: true}));
            }
        } catch (error) {
            dispatch(setGlobalError({message: "Something wrong", flag: true}))
        }
    }

    const checkAuthorComment = async () => {
        try {
            const response = await checkComment(id);
            return response.data;
        } catch (error) {
            dispatch(setGlobalError({message: "Something wrong", flag: true}))
        }
    }

    return (
        <div className={classes.comment}>
            <Typography variant='subtitle1'>{title}</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <Textarea name="description" value={description} disabled={disabled} onChange={handleChangeInput} />
                </Grid>

                <Grid item xs={1}>
                    <Btn title='Edit'
                         color='primary'
                         variant='text'
                         onClick={handleEdit}
                    />
                </Grid>

                <Grid item xs={1}>
                    <Btn title='Remove'
                         color='secondary'
                         variant='text'
                         onClick={handleRemove}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

ReaderComment.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    setUpdate: PropTypes.func,
};