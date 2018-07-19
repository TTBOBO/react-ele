import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import util from '../../assets/js/util';
import connect from '../../store/connnect';
import { withRouter } from 'react-router-dom'
import Page403 from '../test/Page403'

@connect
@withRouter
class AuthRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access:false
        }
    }

    componentWillMount() {
        let menuOption  = util.getOpenMenu(this.props.initMentList,this.props.location.pathname);
        this.setState({
            defaultActive:menuOption.defaultActive,
            defaultOpeneds:menuOption.path
        })
        this.setState({
            access:menuOption.defaultActive ? true : false
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <Route  render={props => {
                return this.state.access ?  <Route path={this.props.path} component={this.props.component} exact={this.props.exact} />  : <Page403 />
            }}/>
        );
    }
}

AuthRouter.propTypes = {

};

export default AuthRouter;