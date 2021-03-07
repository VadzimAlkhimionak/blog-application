import React from "react";
import PropTypes from 'prop-types';
import classes from './Pagination.module.css';
import Pagination from '@material-ui/lab/Pagination';

export const CustomizedPagination = ({count, onChange, page, defaultPage}) => {
    return (
        <div className={classes.pagination}>
            <Pagination
                count={count}
                onChange={onChange}
                page={page}
                variant="outlined"
                color="secondary"
                defaultPage={defaultPage}
                hidePrevButton
                hideNextButton
            />
        </div>
    )
}

CustomizedPagination.propTypes = {
    count: PropTypes.number,
    onChange: PropTypes.func,
    page: PropTypes.number,
    defaultPage: PropTypes.number,
};