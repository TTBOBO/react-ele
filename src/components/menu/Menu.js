import React, { Component } from 'react';
import {Layout,Menu} from "element-react"

class Menucon extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    onOpen(){

    }
    onClose(){

    }

    render() {
        return (
            <div>
                <Layout.Row className="tac">
                    <Layout.Col span={24}>
                        <Menu defaultActive="2" theme="dark" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                            <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>导航一</span>}>
                                <Menu.Item index="1-1">选项1</Menu.Item>
                                <Menu.Item index="1-2">选项2</Menu.Item>
                                <Menu.Item index="1-3">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item index="2"><i className="el-icon-menu"></i>导航二</Menu.Item>
                            <Menu.Item index="3"><i className="el-icon-setting"></i>导航三</Menu.Item>
                        </Menu>
                    </Layout.Col>
                </Layout.Row>
            </div>
        );
    }
}

Menucon.propTypes = {

};

export default Menucon;