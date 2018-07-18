import React, { Component } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import Index from '../view/container/index'
import login from '../view/login/login';
import util from '../assets/js/util'
import 'element-theme-default';

class index extends Component {
    uploadRoute(route) {
        
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="main-content">
                <HashRouter >
                    <div style={{ width: '100%', height: '100%' }}>
                        <Switch>
                            <Route path="/" component={Index} />
                            <Route path="/login" component={login} />
                            {util.getSessionStorage('userinfo') ? <Redirect to="/login" /> : <Redirect   to="/" />}
                        </Switch>
                    </div>
                </HashRouter>
            </div>
        );
    }
}



export default index;