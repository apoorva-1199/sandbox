import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./RoutesList";

const AppRoutes = (props) => (
    <div>
        <Switch>
            {routes.map(route => (
                <Route
                    key={route.path}
                    exact={route.exact}
                    path={route.path}
                    render={(routeProps) => (
                        <route.component {...props} {...routeProps} />
                    )}
                />
            ))}
        </Switch>
    </div>
);

export default AppRoutes;
