import React, { Component } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import Index from '../view/container/index'
import App from '../App';

const renderRouteComponent = routes => routes.map((route, index) => {
    return <Route key={index} {...route} />
})
class index extends Component {
    render() {
        return (
            <div className="main-content">
                <HashRouter>
                    <Route render={(location, history) => {
                        return (
                            <div style={{ width: '100%', height: '100%' }}>
                                <Route render={props => {
                                        return <App {...props} >
                                            <Route render={() => {
                                                return (
                                                    <Switch>
                                                        <Route path="/" component={Index} />
                                                        <Redirect from="*" to="/index" />
                                                    </Switch>
                                                )
                                            }} />
                                        </App >
                                    }} />
                            </div>
                        )
                    }}>

                    </Route>
                </HashRouter>
            </div>
        );
    }
}



export default index;