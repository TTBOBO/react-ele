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
            defaultOpeneds:[],
            openKeys: ['sub1'],
        }
    }
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
// import { Layout , Menu} from 'antd';
    componentWillMount() {
        // this.getMenu();
        let menuOption  = util.getOpenMenu(this.props.initMentList,this.props.location.pathname);
        this.setState({
            defaultActive:menuOption.defaultActive,
            defaultOpeneds:menuOption.path
        })

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
        this.props.history.push(index);
    }

    getMenu(){
        let resMenu = null;
        resMenu = this.props.initMentList.map((item,index) => {
            if(item.children && item.children.length > 0){
                return(<Menu.SubMenu key={`'${index}'`} index={`${item.path}`} title={<span>{item.icon ? <i className={'el-icon-'+item.icon}></i> : ""}{item.title}</span>}>
                    {item.children.map((child,_index) => {
                        return (<Menu.Item  index={child.path} key={index+'-'+_index}>
                            <span>{child.icon ? <i className={'el-icon-'+child.icon}></i> : ""}{child.title}</span>
                            </Menu.Item>)
                    })}
                </Menu.SubMenu>)
            }else{
                return (<Menu.Item key={`'${index}'`} index={`${item.path}`}>{<span>{item.icon ? <i className={'el-icon-'+item.icon}></i> : ""}{item.title}</span>}</Menu.Item>)
            }
        })
        return resMenu;
    }
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      }
    render() {

        

        return (
            <div>
                <Layout className="tac">
                    <Layout span={24}>
                        <Menu mode="inline" defaultOpeneds={this.state.defaultOpeneds} defaultActive={this.state.defaultActive} theme="dark" onSelect={this.selectOption.bind(this)} className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                            {/* <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>导航一</span>}>
                                <Menu.Item index="1-1">选项1</Menu.Item>
                                <Menu.Item index="1-2">选项2</Menu.Item>
                                <Menu.Item index="1-3">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item index="2"><i className="el-icon-menu"></i>导航二</Menu.Item>
                            <Menu.Item index="3"><i className="el-icon-setting"></i>导航三</Menu.Item> */}
                            {/* {this.getMenu()} */}
                        {/* </Menu> */}
                        {/* <Menu> */}
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