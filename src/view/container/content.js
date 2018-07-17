import React, { Component } from 'react';
import { mainRouteMap } from '../../router/config';
import { Route,Switch } from 'react-router-dom';
const renderRouteComponent = routes => routes.map((route, index) => {
    return <Route key={index} {...route} />
})
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