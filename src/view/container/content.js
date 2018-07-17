import React, { Component } from 'react';
import { mainRouteMap } from '../../router/config';
import { Route,Switch } from 'react-router-dom';

const renderRouteComponent = routes => routes.map((route, index) => {
    // 1.没有children时，直接返回路由 
    // 2.有children时，处理成一维数组并返回路由
    let arr = [];
    if(route.children){
        arr = getRouter(route);
        delete route.children;
        arr.unshift(<Route key={route.name} {...route} />)
        console.log(arr)
        return arr;
    }else{
        return <Route key={index} {...route} />
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

const mainRoute = renderRouteComponent(mainRouteMap);
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
                <Route render={() => {
                    return (
                        <Switch>
                            {mainRoute}
                        </Switch>
                    )
                }} />
            </div>
        );
    }
}



export default Content;