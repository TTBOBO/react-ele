import React, { Component } from 'react';
import { mainRouteMap } from '../../router/config';
import { Route,Switch } from 'react-router-dom';
import util from '../../assets/js/util';
let mainRoute = []
const renderRouteComponent = routes => routes.forEach((route, index) => {
    // 1.没有children时，直接返回路由 
    // 2.有children时，处理成一维数组并返回路由
    let arr = [];
    if(route.children){
        arr = util.getRouter(route).map((item) =>{
            return <Route exact={item.exact} key={item.name} component={item.component} path={item.path} />
        });
        arr.push(<Route exact={route.exact} key={route.name} path={route.path}  component={route.component} />)
        mainRoute.push(...arr)
    }else{
        mainRoute.push(<Route exact={route.exact} key={route.name} path={route.path} component={route.component} />)
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
            </Switch>
        );
    }
}

export default Content;