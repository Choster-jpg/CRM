import React, {useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () =>
{
    const {user} = useContext(Context);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route key={LOGIN_ROUTE} path={LOGIN_ROUTE} exact/>
        </Routes>
    );
};

export default AppRouter;