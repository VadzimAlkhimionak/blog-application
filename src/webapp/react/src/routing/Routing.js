import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import {Login} from "../main/auth/login/Login";
import {Registration} from "../main/auth/registration/Registration";
import {PersonalData} from "../main/personal-data/PersonalData";
import {Header} from "../main/header/Header";
import {ReaderPage} from "../main/reader-page/ReaderPage";
import {useSelector} from "react-redux";
import {Home} from "../main/home/Home";
import {AuthorPage} from "../main/author-page/AuthorPage";

export const Routing = () => {
    const isLogin = useSelector(state => state.app.isLogin);
    const role = useSelector(state => state.app.role);

    if (isLogin) {
        return (
            <>
                <Header />
                <Switch>
                    <Route exact path='/home' component={Home} />
                    {
                        role === 'reader'
                            ? <Route exact path='/reader' component={ReaderPage} />
                            : <Route exact path='/author' component={AuthorPage} />
                    }
                    <Route exact path='/personal-data' component={PersonalData} />
                    <Redirect to='/home' />
                </Switch>
            </>
        );
    }

    return (
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/registration' component={Registration} />
            <Redirect to='/login' />
        </Switch>
    );
};