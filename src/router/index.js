import React, { Component } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import connect from '../store/connnect'
import Index from '../view/container/index'
import login from '../view/login/login';
import util from '../assets/js/util';
import {mainRouteMap} from './config' 
import 'element-theme-default';
util.getAccessRouter(mainRouteMap)

@connect
class index extends Component {
    uploadRoute(route) {
        
    }
    componentWillMount(){
        this.props.getMenu('INITMENU');
        setTimeout(() =>{
            console.log(this.props.initMentList)
        })
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
                        </Switch>
                </HashRouter>
            </div>
        );
    }
}



export default index;