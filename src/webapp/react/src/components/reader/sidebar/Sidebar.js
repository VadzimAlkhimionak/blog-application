import React, {useState} from "react";
import PropTypes from 'prop-types';
import classes from './Sidebar.module.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Appbar} from "../../app-bar/AppBar";
import {ListSidebar} from "./list-sidebar/ListSidebar";

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <>
        {value === index
            ? <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            : null}
        </>
    );
}

export const Sidebar = ({handleClickAuthor, authors, authorsFavorite, active}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.sidebar}>
            <Appbar>
                <Tabs value={value} onChange={handleChange} indicatorColor="primary">
                    <Tab label="All" />
                    <Tab label="Favorite" />
                </Tabs>
            </Appbar>

            {
                value === 0
                    ? <TabPanel value={value} index={0}>
                        <ListSidebar items={authors}
                                     handleClickAuthor={handleClickAuthor}
                                     active={active}
                        />
                      </TabPanel>
                    : <TabPanel value={value} index={1}>
                        <ListSidebar items={authorsFavorite}
                                     handleClickAuthor={handleClickAuthor}
                                     active={active}
                        />
                      </TabPanel>
            }
        </div>
    );
}

Sidebar.defaultProps = {
    authors: [],
    authorsFavourite: [],
}

Sidebar.propTypes = {
    handleClickAuthor: PropTypes.func.isRequired,
    authors: PropTypes.array.isRequired,
    authorsFavourite: PropTypes.array.isRequired,
    active: PropTypes.number,
}