import React, { Component } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import connect from '../store/connnect'
import Index from '../view/container/index'
import login from '../view/login/login';
import Page404 from '../view/test/Page404'
import util from '../assets/js/util';
import 'element-theme-default';

@connect
class index extends Component {
    uploadRoute(route) {
        
    }
    componentWillMount(){
        this.props.getMenu('INITMENU');
    }
    componentDidMount() {
       
    }

    render() {
        return (
            <div className="main-content">
                <HashRouter >
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to="/app/index" push />} />
                            <Route path="/app" component={Index} />
                            <Route exact  path="/login" component={login} />
                            <Route component={Page404} />
                        </Switch>
                </HashRouter>
            </div>
        );
    }
}



export default index;