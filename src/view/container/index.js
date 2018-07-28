import React, { Component } from 'react';
import Menucon from '../../components/menu/Menucon';
import { Layout , Menu,Icon} from 'antd';
import {Dropdown} from "element-react"
import Content from './content'
import './index.css'
class index extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        // console.log(this.props)
    }

    componentDidMount() {

    }


    handleCommand(item){
        console.log(item);
    }
    render() {
        return (
            <div className="container">
                    <div style={{width:'200px',maxWidth:"200px",minWidth:'200px',background:'#324157'}}>
                        <Menucon></Menucon>
                    </div>
                    <div className="right-content">
                        <div className="ele-hearder">
                            <i className="el-icon-d-arrow-left"></i>
                            <Dropdown onCommand={this.handleCommand.bind(this)} menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item command="loginOut">退出登录</Dropdown.Item>
                            </Dropdown.Menu>
                            )}>
                            <a className="el-dropdown-link">
                                用户名<i className="el-icon-caret-bottom el-icon--right"></i>
                            </a>
                            </Dropdown>
                        </div>
                        <div className="ele-main">
                            <Content></Content>
                        </div>
                    </div>
            </div>
        );
    }
}

index.propTypes = {

};

export default index;