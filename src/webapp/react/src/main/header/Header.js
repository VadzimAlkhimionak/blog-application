import React from "react";
import classes from './Header.module.css';
import {Navigation} from "../../components/navigation/Navigation";
import {User} from "../../components/user/User";

export const Header = () => {
    return (
        <div className={classes.header}>
            <Navigation />
            <User />
        </div>
    )
}