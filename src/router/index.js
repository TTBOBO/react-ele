import React, { Component } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { loyoutRouterMap } from './config';
import App from '../App';

const renderRouteComponent = routes => routes.map((route, index) => {
    return <Route key={index} {...route} />
})

const loyoutRouterMap = renderRouteComponent(loyoutRouterMap);
console.log(otherRouter)
class index extends Component {
    
    render() {
        return (
            <div className="main-content">
                <HashRouter>
                    {/* <Route render={(location, history) => {
                        return (
                            <div style={{ width: '100%', height: '100%' }}>
                                <Switch>
                                    {loyoutRouterMap}
                                </Switch>
                            </div>
                        )
                    }}>
                    </Route> */}
                </HashRouter>
            </div>
        );
    }
}



export default index;