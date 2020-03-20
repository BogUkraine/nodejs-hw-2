import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Auth from './components/Auth';
import Home from './components/Home';

const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
            <Route path="/home" exact>
                <Home />
            </Route>
            <Redirect to="/home" />
            </Switch>
        )
    }
  
    return (
        <Switch>
            <Route exact path="/">
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default useRoutes;