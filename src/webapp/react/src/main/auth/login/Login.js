import React from "react";
import classes from './Login.module.css';
import {Grid} from "@material-ui/core";
import {Title} from "../../../components/UI/title/TItle";
import {FormControl} from "../../../components/controls/FormControl";
import {Link} from "react-router-dom";
import {Input} from "../../../components/UI/input/Input";
import {inputsLogin} from "../../../components/helpers/common-data/inputsLogin";
import {isValidEmail} from "../../../components/helpers/validators/isValidEmail";
import {Btn} from "../../../components/UI/button/Button";
import {login} from "../../../service/authService";
import {useDispatch, useSelector} from "react-redux";
import {
    changeInput,
    setDisabled,
    setError,
    setGlobalError,
    setLogin,
    setRole,
    setStatus
} from "../../../redux/actions/appAction";

export const Login = () => {
    const credentials = useSelector(state => state.login);
    const disabled = useSelector(state => state.app.disabled);
    const error = useSelector(state => state.app.error);
    const dispatch = useDispatch();

    const validateLogin = () => {
        let inputErrors = {};
        inputErrors.email = isValidEmail(credentials.email) ? null : "Email is not valid!";
        inputErrors.password = credentials.password ? null : "This field is required!";
        dispatch(setError({...inputErrors}));
        return Object.values(inputErrors).every(x => x === null);
    }

    const handleChangeInput = ({target: {name, value}}) => {
        validateLogin();
        dispatch(setGlobalError({message: null, flag: false}));
        dispatch(changeInput(name, value));
    }

    const handleSubmit = async () => {
        const {email, password} = credentials;
        try {
            if (validateLogin()) {
                const {data} = await login(email, password);
                dispatch(setRole(data));
                dispatch(setDisabled(true));
                dispatch(setLogin(true));
                dispatch(setStatus({message: "Welcome to the system!", flag: true}));
            }
        } catch (error) {
            dispatch(setDisabled(false));
            dispatch(setGlobalError({message: "Something wrong! Check input data", flag: true}))
        }
    }

    return (
        <div className={classes.login}>
            <Title text="Login form" />
            <FormControl>
                <Grid container spacing={2}>
                    {
                        inputsLogin.map(input => (
                            <Grid item xs={12} key={input.label}>
                                <Input label={input.label}
                                       name={input.name}
                                       type={input.type}
                                       onChange={handleChangeInput}
                                       error={error}
                                       disabled={disabled}
                                />
                            </Grid>
                        ))
                    }

                    <Grid item xs={3}>
                        <Btn title='Sign in'
                             color='primary'
                             onClick={handleSubmit}
                             disabled={disabled}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Link to='/registration' className={classes.Link}>
                            <Btn title='Registration'
                                 color='secondary'
                                 disabled={disabled}
                            />
                        </Link>
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    )
}