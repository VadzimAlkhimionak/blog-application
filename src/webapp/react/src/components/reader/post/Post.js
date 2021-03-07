import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import classes from './Post.module.css';
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import {Btn} from "../../UI/button/Button";
import {Textarea} from "../../UI/textarea/Textarea";
import {Like} from "../../UI/like/Like";
import {checkStatusPost} from "../../../service/postService";

export const Post = ({post, handleOpen, handleLike, update}) => {
    const [statusId, setStatusId] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        checkStatusPost(post.idpost)
            .then(({data}) => {
                setStatus(data.status);
                setStatusId(data.id);
            })
            .catch(error => console.log(error))
    }, [update])

    return (
        <div className={classes.article}>
            <Btn onClick={handleOpen(post.idpost)} title={post.title} color='primary' variant='text' />

            <div className={classes.content}>
                <Textarea value={post.description} disabled={true} />

                <div className={classes.likes}>
                    <Like color='primary' disabled={status === 'like'} onClick={handleLike(post.idpost, statusId, 'like')}>
                        <ThumbUpAltIcon />
                    </Like>

                    <Like color='secondary' disabled={status === 'dislike'} onClick={handleLike(post.idpost, statusId, 'dislike')}>
                        <ThumbDownIcon />
                    </Like>
                </div>
            </div>
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    handleOpen: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
    update: PropTypes.number,
};