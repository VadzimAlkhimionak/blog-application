import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import classes from './PersonalData.module.css'
import {Title} from "../../components/UI/title/TItle";
import {FormControl} from "../../components/controls/FormControl";
import {Grid} from "@material-ui/core";
import {inputsPersonalData} from "../../components/helpers/common-data/inputsPersonalData";
import {Input} from "../../components/UI/input/Input";
import {Btn} from "../../components/UI/button/Button";
import {getPersonalData, updatePersonalData} from "../../service/personalDataService";
import {setSubscribers, updateUser} from "../../redux/actions/personalDataAction";
import {changeInput, setGlobalError, setStatus} from "../../redux/actions/appAction";
import {Subscribers} from "../../components/author/Subscribers";

export const PersonalData = () => {
    const user = useSelector(state => state.personalData);
    const role = useSelector(state => state.app.role);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(setStatus({message: "", flag: false}));
        getPersonalData()
            .then(({data}) => {
                dispatch(updateUser(data));
                dispatch(setSubscribers(user.subscribes.length));
            })
            .catch(error => console.log(error))
    }, [])

    const handleChangeInput = ({target: {name, value}}) => {
        dispatch(setGlobalError({message: null, flag: false}));
        dispatch(changeInput(name, value));
    }

    const handleClickSave = async () => {
        try {
            dispatch(setStatus({message: "Personal data was updated!", flag: true}));
            await updatePersonalData(user);
        } catch (error) {
            dispatch(setGlobalError({message: "Something wrong! Check input data", flag: true}))
        }
    }

    return (
        <div className={classes.personalData}>
            <Title text='Personal Data' />
            {
                role === 'author' ? <Subscribers subscribers={user.subscribers} /> : null
            }
            <FormControl>
                <Grid container spacing={2}>
                    {
                        inputsPersonalData.map(input => (
                            <Grid item xs={input.grid} key={input.label}>
                                <Input label={input.label}
                                       name={input.name}
                                       type={input.type}
                                       onChange={handleChangeInput}
                                       value={user[input.name]}
                                />
                            </Grid>
                        ))
                    }
                    <Grid item xs={2}>
                        <Btn title='Save'
                             color='secondary'
                             onClick={handleClickSave}
                        />
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    )
}