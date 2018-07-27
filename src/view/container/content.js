import React, { Component } from 'react';
import { mainRouteMap } from '../../router/config';
import { Route,Switch } from 'react-router-dom';
import AuthRoute from './AuthRouter';
import util from '../../assets/js/util';
import Page404 from '../test/Page404'
let mainRoute = []
const renderRouteComponent = routes => routes.forEach((route, index) => {
    // 1.没有children时，直接返回路由 
    // 2.有children时，处理成一维数组并返回路由
    let arr = [];
    if(route.children){
        arr = util.getRouter(route).map((item) =>{
            return <AuthRoute exact={item.exact} key={item.name}  path={item.path} component={item.component} />
        });
        arr.push(<AuthRoute exact={route.exact} key={route.name} path={route.path}  component={route.component} />)
        mainRoute.push(...arr)
    }else{
        mainRoute.push(<AuthRoute exact={route.exact} key={route.name} path={route.path} component={route.component} />)
    }
})

renderRouteComponent(mainRouteMap);
class Content extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        
    }
    

    componentDidMount() {

    }

    render() {
        return (
            <Switch>
                {mainRoute}
                <Route page="/app/Page404" component={Page404} exact />
            </Switch>
        );
    }
}

export default Content;