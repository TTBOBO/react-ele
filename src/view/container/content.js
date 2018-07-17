import React, { Component } from 'react';
import { mainRouteMap } from '../../router/config';
import { Route,Switch } from 'react-router-dom';

const renderRouteComponent = routes => routes.map((route, index) => {
    let arr = [];
    if(route.children){
        arr = getRouter(route);
        console.log(route)
        console.log(routes)
    }else{
        return <Route key={index} {...route} />
    }
    
    // return <Route key={index} {...route} />
})

function getRouter(routers) {
    let returnObj = null;
    let resArr = [];
    resArr = [...routers.children];
    // delete routers.children;
    // resArr.push(routers);
    console.log(resArr)
    return null;
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