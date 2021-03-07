import React from "react";
import classes from './App.module.css';
import {Routing} from "./routing/Routing";
import {CustomizedSnackbar} from "./components/snackbar/Snackbar";
import {useSelector} from "react-redux";

export const App = () => {
    const status = useSelector(state => state.app.status);
    const globalError = useSelector(state => state.app.globalError);

    const routes = Routing();

    return (
        <div className={classes.container}>
            {routes}
            {status.flag ? <CustomizedSnackbar message={status.message} severity='success' /> : null}
            {globalError.flag ? <CustomizedSnackbar message={globalError.message} severity='error' /> : null}
        </div>
    )
}
