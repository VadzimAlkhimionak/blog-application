import React from "react";
import PropTypes from 'prop-types';
import classes from './Likes.module.css';
import Typography from "@material-ui/core/Typography";
import {Like} from "../../UI/like/Like";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

export const Likes = ({icon, counter}) => {
    return (
        <div className={classes.like}>
            <Like color={icon === 'like' ? 'primary' : 'secondary'}>
                { icon === 'like' ? <ThumbUpAltIcon /> : <ThumbDownIcon /> }
            </Like>
            <Typography variant='h5'>{counter}</Typography>
        </div>
    )
}

Likes.propTypes = {
    icon: PropTypes.any,
    counter: PropTypes.number,
}