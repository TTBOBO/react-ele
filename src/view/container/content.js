import React, { Component } from 'react';
import { mainRouteMap } from '../../router/config';
import { Route,Switch } from 'react-router-dom';
import Test from '../../view/test/test'

let resRoute = []
const renderRouteComponent = routes => routes.forEach((route, index) => {
    // 1.没有children时，直接返回路由 
    // 2.有children时，处理成一维数组并返回路由
    let arr = [];
    if(route.children){
        arr = getRouter(route);
        delete route.children;
        arr.push(<Route key={route.name} component={route.component} />)
        resRoute.push(...arr)
    }else{
        resRoute.push(<Route key={route.name} {...route} />)
    }
})

function getRouter(routers) {
    let resArr = [];
    resArr = [...routers.children];
    const router = resArr.map((item,index) => {
        return <Route key={item.name} {...item} />
    })
    return router;
}

let mainRoute = renderRouteComponent(mainRouteMap);
mainRoute = [...resRoute]
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
            <div>
                <Switch>
                    {mainRoute}
                </Switch>
            </div>
        );
    }
}



export default Content;