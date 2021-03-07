import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';
import {useSelector} from "react-redux";

export const Navigation = () => {
    const role = useSelector(state => state.app.role);

    return (
        <nav className={classes.Navigation}>
            <ul className={classes.List}>
                <li className={classes.LinkItem}>
                    <NavLink to={`/home`}
                             className={classes.Link}
                             activeClassName={classes.Active}
                    >
                        Home
                    </NavLink>
                </li>

                <li className={classes.LinkItem}>
                    <NavLink to={role === 'reader' ? '/reader' : '/author'}
                             className={classes.Link}
                             activeClassName={classes.Active}
                    >
                        {role === 'reader' ? 'reader' : 'author'}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
