import React from 'react';
import classes from './Registration.module.css';
import {Title} from "../../../components/UI/title/TItle";
import {FormControl} from "../../../components/controls/FormControl";
import {Grid} from "@material-ui/core";
import {inputsRegistration, roles} from "../../../components/helpers/common-data/inputsRegistration";
import {Input} from "../../../components/UI/input/Input";
import {isValidEmail} from "../../../components/helpers/validators/isValidEmail";
import {isPasswordsMatch} from "../../../components/helpers/validators/isPasswordsMatch";
import {SelectForm} from "../../../components/UI/select/SelectForm";
import {Btn} from "../../../components/UI/button/Button";
import {Link} from "react-router-dom";
import {registration} from "../../../service/authService";
import {useDispatch, useSelector} from "react-redux";
import {changeSelect} from "../../../redux/actions/registrationAction";
import {changeInput, setError, setGlobalError, setStatus} from "../../../redux/actions/appAction";

export const Registration = () => {
    const credentials = useSelector(state => state.registration);
    const disabled = useSelector(state => state.app.disabled);
    const error = useSelector(state => state.app.error);
    const dispatch = useDispatch();

    const validateRegister = () => {
        const {username, email, password, repeatPassword} = credentials;
        let inputErrors = {};
        inputErrors.username = username ? null : "This field is required!";
        inputErrors.email = isValidEmail(email) ? null : "Email is not valid!";
        inputErrors.password = isPasswordsMatch(password, repeatPassword) ? null : "Passwords mismatch!";
        inputErrors.repeatPassword = repeatPassword ? null : "This field is required!";
        dispatch(setError({...inputErrors}));
        return Object.values(inputErrors).every(x => x === null);
    }

    const handleChangeInput = ({target: {name, value}}) => {
        validateRegister();
        dispatch(setGlobalError({message: null, flag: false}))
        dispatch(changeInput(name, value));
    }

    const handleChangeSelect = ({target: {value}}) => {
        dispatch(changeSelect(value));
    }

    const handleRegister = async () => {
        const {roles, firstName, lastName, username, email, password} = credentials;
        try {
            if (validateRegister()) {
                await registration(roles, firstName, lastName, username, email, password);
                dispatch(setStatus({message: "New user was register", flag: true}));
                window.location.href = "/login";
            }
        } catch (error) {
            dispatch(setGlobalError({message: "Something wrong! Check input data", flag: true}))
        }
    }

    return (
        <div className={classes.registration}>
            <Title text='Register form' />
            <FormControl>
                <Grid container spacing={2}>
                    <SelectForm label="Role"
                                value={credentials.role}
                                handleChange={handleChangeSelect}
                                items={roles}
                                disabled={disabled}
                    />
                    {
                        inputsRegistration.map(input => (
                            <Grid item xs={6} key={input.label}>
                                <Input name={input.name}
                                       label={input.label}
                                       onChange={handleChangeInput}
                                       error={error}
                                       disabled={disabled}
                                       type={input.type}
                                />
                            </Grid>
                        ))
                    }
                    <Grid item xs={2}>
                        <Btn title='Register'
                             color='secondary'
                             onClick={handleRegister}
                             disabled={disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Link to='/login'>
                            <Btn title='Back' />
                        </Link>
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    )
}