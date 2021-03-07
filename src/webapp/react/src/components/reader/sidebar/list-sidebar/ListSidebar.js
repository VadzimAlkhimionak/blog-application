import React from "react";
import PropTypes from 'prop-types';
import classes from './ListSidebar.module.css';
import Tab from "@material-ui/core/Tab";

export const ListSidebar = ({items, handleClickAuthor, active}) => {
    return (
        <>
            {
                items.map(item => {
                    return (
                        <Tab key={item.id}
                             label={item.firstName}
                             className={active === item.id ? classes.active : classes.item}
                             onClick={handleClickAuthor(item.id)}
                        />
                    )
                })
            }
        </>
    )
}

ListSidebar.propTypes = {
    items: PropTypes.array.isRequired,
    handleClickAuthor: PropTypes.func.isRequired,
    active: PropTypes.number,
}