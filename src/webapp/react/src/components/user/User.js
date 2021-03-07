import React from "react";
import classes from './User.module.css';
import {Link} from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {useDispatch, useSelector} from "react-redux";
import {setOpen} from "../../redux/actions/authorAction";

export const User = () => {
    const role = useSelector(state => state.app.role);
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(setOpen(true))
    }

    const handleClickLogout = async (event) => {
        event.preventDefault();
        window.location.href = "/";
    }

    return (
        <>
            { role === 'author' && <AddBoxIcon fontSize='large' className={classes.link} onClick={handleOpen} /> }

            <Link to={'/personal-data'}
                  className={classes.link}
            >
                <AccountBoxIcon fontSize='large' />
            </Link>

            <ExitToAppIcon fontSize='large'
                           className={classes.link}
                           onClick={handleClickLogout}
            />
        </>
    )
}