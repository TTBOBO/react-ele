import React, { Component } from 'react';
// import {Layout,Menu} from "element-react"
import { Layout , Menu,Icon} from 'antd';
import connect from '../../store/connnect';
import { withRouter } from 'react-router-dom'
import util from '../../assets/js/util'

const SubMenu = Menu.SubMenu;

@connect
@withRouter
class Menucon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultActive:"",
            defaultOpeneds:"",
            openKeys: ['sub1'],
        }
    }
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
// import { Layout , Menu} from 'antd';
    componentWillMount() {
        // this.getMenu();
        let menuOption  = util.getOpenMenu(this.props.initMentList,this.props.location.pathname);
        this.setState({
            defaultActive:menuOption.path,
            defaultOpeneds:menuOption.path[0]
        })
        console.log(this.state.defaultActive)

        // console.log(this.props)
    }

    componentDidMount() {

    }
    onOpen(e){
        console.log(e)
    }
    onClose(e){
        console.log(e)
    }

    selectOption(index){
        this.props.history.push(index.key);
    }

    getMenu(){
        let resMenu = null;
        resMenu = this.props.initMentList.map((item,index) => {
            if(item.children && item.children.length > 0){
                return(<Menu.SubMenu key={`${item.path}`} index={`${item.path}`} title={<span>{item.icon ? <i className={'el-icon-'+item.icon}></i> : ""}{item.title}</span>}>
                    {item.children.map((child,_index) => {
                        return (<Menu.Item  index={child.path} key={child.path}>
                            <span>{child.icon ? <i className={'el-icon-'+child.icon}></i> : ""}{child.title}</span>
                            </Menu.Item>)
                    })}
                </Menu.SubMenu>)
            }else{
                return (<Menu.Item key={`${item.path}`} index={`${item.path}`}>{<span>{item.icon ? <i className={'el-icon-'+item.icon}></i> : ""}{item.title}</span>}</Menu.Item>)
            }
        })
        return resMenu;
    }
    render() {

        
        // onClose={this.onClose.bind(this)}
        return (
            <div>
                <Layout className="tac">
                    <Layout span={24}>
                        <Menu mode="inline" defaultOpenKeys={this.state.defaultOpeneds} defaultSelectedKeys={this.state.defaultActive} theme="dark" onSelect={this.selectOption.bind(this)} className="el-menu-vertical-demo" onOpenChange={this.onOpen.bind(this)} >
                            {this.getMenu()}
                        </Menu>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

Menucon.propTypes = {

};

export default Menucon;