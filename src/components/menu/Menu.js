import React, { Component } from 'react';
import {Layout,Menu} from "element-react"
import connect from '../../store/connnect';
import { withRouter } from 'react-router-dom'
import util from '../../assets/js/util'

@connect
@withRouter
class Menucon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultActive:"",
            defaultOpeneds:[]
        }
    }

    componentWillMount() {
        // this.getMenu();
        let menuOption  = util.getOpenMenu(this.props.initMentList,this.props.location.pathname);
        console.log(menuOption)
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
        console.log(index)
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

    render() {

        

        return (
            <div>
                <Layout.Row className="tac">
                    <Layout.Col span={24}>
                        <Menu defaultOpeneds={this.state.defaultOpeneds} defaultActive={this.state.defaultActive} theme="dark" onSelect={this.selectOption.bind(this)} className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                            {/* <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>导航一</span>}>
                                <Menu.Item index="1-1">选项1</Menu.Item>
                                <Menu.Item index="1-2">选项2</Menu.Item>
                                <Menu.Item index="1-3">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item index="2"><i className="el-icon-menu"></i>导航二</Menu.Item>
                            <Menu.Item index="3"><i className="el-icon-setting"></i>导航三</Menu.Item> */}
                            {this.getMenu()}
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