import React, { Component } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import Index from '../view/container/index'
import login from '../view/login/login'
import App from '../App';
import { mainRouteMap } from './config';

const renderRouteComponent = routes => routes.map((route, index) => {
    // 1.没有children时，直接返回路由 
    // 2.有children时，处理成一维数组并返回路由
    let arr = [];
    if(route.children){
        arr = getRouter(route);
        delete route.children;
        arr.push(<Route key={route.name} {...route} />)
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

class index extends Component {
    uploadRoute(route){
        alert(11)
        console.log(route)
    }
    
    componentDidMount(){
        console.log(<Route path="/index" component={Index}   />)
    }

    render() {
        return (
            <div className="main-content">
                <HashRouter >
                    <Route render={(location, history) => {
                        // onEnter={(e) => this.uploadRoute(e)}
                        return (
                            <div style={{ width: '100%', height: '100%' }}>
                                <Switch>
                                    <Route render={props => {
                                        return <App {...props} >
                                            <Route render={() => {
                                                return (
                                                    <Switch>
                                                        {mainRoute}
                                                        {/* <Route path="/index" component={Index}   /> */}
                                                        <Route path="/login" component={login} />
                                                        <Redirect from="*" to="/login1" />
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