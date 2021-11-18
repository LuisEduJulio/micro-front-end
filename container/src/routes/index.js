import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../container/header";

import Home from "../views/home";

const Routes = () => {
    return (
        <>
            <Header />
            <Switch>
                <Route path='/' component={Home} />
            </Switch>
        </>
    );
}

export { Routes };
