import React, { Component } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import Index from '../view/container/index'
import login from '../view/login/login'
import App from '../App';

class index extends Component {
    render() {
        return (
            <div className="main-content">
                <HashRouter>
                    <Route render={(location, history) => {
                        return (
                            <div style={{ width: '100%', height: '100%' }}>
                                <Switch>
                                    <Route render={props => {
                                        return <App {...props} >
                                            <Route render={() => {
                                                return (
                                                    <Switch>
                                                        <Route path="/index" component={Index} />
                                                        <Route path="/login" component={login} />
                                                        <Redirect from="*" to="/index" />
                                                    </Switch>
                                                )
                                            }} />
                                        </App >
                                    }} />
                                </Switch>
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